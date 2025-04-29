from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
import torch
from facenet_pytorch import InceptionResnetV1, MTCNN
from types import MethodType
import mysql.connector
from os import getenv
import requests
from liveness_model import LivenessNet
from functools import wraps
import jwt
from torchvision import transforms

transform = transforms.Compose([
    transforms.ToPILImage(),                 # Convert NumPy (HWC) to PIL Image
    transforms.Resize((224, 224)),          # Resize to match input shape
    transforms.ToTensor(),                  # Convert to (C, H, W), float32, normalized to [0, 1]
])

# Load model
liveness_model = LivenessNet()
liveness_model.load_state_dict(torch.load('../src/liveness_model.pth', map_location=torch.device('cpu')))
liveness_model.eval()


load_dotenv()

SECRET_KEY = getenv('SECRET_KEY')

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        print(auth_header)
        if not auth_header:
            return jsonify({'error': 'Unauthorized'}), 401

        try:
            token = auth_header
            user = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user = user  # Attach user info to request object
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 403

        return f(*args, **kwargs)
    return decorated

connection = mysql.connector.connect(
    host=getenv('DbHOST'),
    user=getenv('DbUSER'),
    password=getenv('DbPASSWORD'),
    database=getenv('DB')
)

mycursor = connection.cursor()

mycursor.execute('Select Student_ID from StudentsData;')
print(mycursor.fetchall())

app = Flask(__name__)
CORS(app)

def encode(img):
    res = resnet(torch.Tensor(img))
    return res

def detect_box(self, img, save_path=None):
    # Detect faces
    batch_boxes, batch_probs, batch_points = self.detect(img, landmarks=True)
    # Select faces
    if not self.keep_all:
        batch_boxes, batch_probs, batch_points = self.select_boxes(
            batch_boxes, batch_probs, batch_points, img, method=self.selection_method
        )
    # Extract faces
    faces = self.extract(img, batch_boxes, save_path)
    return batch_boxes, faces

### load model
resnet = InceptionResnetV1(pretrained='vggface2').eval()
mtcnn = MTCNN(
  image_size=224, keep_all=True, thresholds=[0.4, 0.5, 0.5], min_face_size=60
)
mtcnn.detect_box = MethodType(detect_box, mtcnn)

# saved_pictures = "./Face"
all_people_faces = {}

@app.route('/fetchFaces', methods=['GET'])
@auth_required
def fetchFaces():
    userId = (request.user['userId'],)
    try:
        mycursor.execute('Select Image1, Image2, Image3, Image4, Image5, Student_ID from StudentsData WHERE Student_ID=%s;', userId)
        for data in mycursor.fetchall():
            for image in data[0:5]:
                image_data = str(image)
                image_data = image_data.split(',')[1]
                img_data = base64.b64decode(image_data)
                image = np.asarray(bytearray(img_data), dtype=np.uint8)
                img = cv2.imdecode(image, cv2.IMREAD_COLOR)
                rgb_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                cropped = mtcnn(rgb_image)
                if cropped is not None:
                    if data[-1] not in all_people_faces:
                        all_people_faces[data[-1]] = []
                    else:
                        for item in all_people_faces.values():
                            if len(item) == 5:
                                all_people_faces[data[-1]] = []
                    all_people_faces[data[-1]].append(encode(cropped)[0, :])
        return jsonify({'Face Found': True})
    except:
        return jsonify({'Face Found': False})

stuId = None
count = 0
@app.route('/recognize_face', methods=['POST'])
def recognize_face():
    try:
        min_key = None
        data = request.get_json()
        image_data = data['imageDataUrl']
        image_data = image_data.split(',')[1]
        img_data = base64.b64decode(image_data)
        image = np.asarray(bytearray(img_data), dtype=np.uint8)
        img = cv2.imdecode(image, cv2.IMREAD_COLOR)

        face_tensor = transform(img)            # shape: (3, 224, 224)
        face_tensor = face_tensor.unsqueeze(0)      # shape: (1, 3, 224, 224) — batch dimension

        batch_boxes, cropped_images = mtcnn.detect_box(img)

        if cropped_images is not None:
            for box, cropped in zip(batch_boxes, cropped_images):
                x, y, x2, y2 = [int(x) for x in box]
                img_embedding = encode(cropped.unsqueeze(0))
                detect_dict = {}
                global all_people_faces
                for k, v in all_people_faces.items(): 
                    distances = [(emb - img_embedding).norm().item() for emb in v]  # v is a list
                    detect_dict[k] = min(distances)
                min_key = min(detect_dict, key=detect_dict.get)

                if detect_dict[min_key] >= 0.9:
                    min_key = 'Undetected'

        with torch.no_grad():
            output = liveness_model(face_tensor)
            prediction = torch.argmax(output, dim=1).item()

        if prediction == 0:  # spoof
            global count
            count +=1
            if (count > 15):
                count = 0
                return jsonify({'Title': 'Face not detected!', 'Msg': 'Make You Enrolled Your Face!'}), 403
            return jsonify({}), 201
        global stuId
        stuId = min_key
        return jsonify({'stuId': min_key}), 200
        # return jsonify({"message": "Data received successfully!"}), 200

    except Exception as e:
        print(e)
        return jsonify({'Title': 'Error', 'Msg': 'Server Not Responding'} ), 500

@app.route('/verify')
def verify():
    print(stuId)
    if stuId:
        url = getenv('HOST')+'/verifyAttendance'
        requests.post(url, json={'Student_Id': stuId})
        return jsonify({'success': True}), 200
    return jsonify({'err': 'Unauthorized'}), 401
# @app.route('/read-cookies')
# def read_cookies():
#     cookies = request.cookies  # Access cookies
#     print(cookies)
#     return cookies

if __name__ == '__main__':
    app.run(debug=True)
