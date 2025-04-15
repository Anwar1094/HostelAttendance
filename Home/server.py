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

load_dotenv()

connection = mysql.connector.connect(
    host=getenv('DbHOST'),
    user=getenv('DbUSER'),
    password=getenv('DbPASSWORD'),
    database=getenv('DB')
)

mycursor = connection.cursor()

mycursor.execute('Select Student_ID from StudentsData;')
print(mycursor.fetchall())

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
mycursor.execute('Select Image, Student_ID from StudentsData;')
for data in mycursor.fetchall():
    image_data = str(data[0])
    image_data = image_data.split(',')[1]
    img_data = base64.b64decode(image_data)
    image = np.asarray(bytearray(img_data), dtype=np.uint8)
    img = cv2.imdecode(image, cv2.IMREAD_COLOR)
    rgb_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    cropped = mtcnn(rgb_image)
    if cropped is not None:
        all_people_faces[data[1]] = encode(cropped)[0, :]

print(all_people_faces.keys())   
# Route to receive image and perform face recognition
stuId = None
@app.route('/recognize_face', methods=['POST'])
def recognize_face():
    try:
        min_key = None
        # Get image from request
        data = request.get_json()

        image_data = data['imageDataUrl']

    #     # Remove the 'data:image/jpeg;base64,' part
        image_data = image_data.split(',')[1]

    #     # Decode the image
        img_data = base64.b64decode(image_data)
        image = np.asarray(bytearray(img_data), dtype=np.uint8)
        img = cv2.imdecode(image, cv2.IMREAD_COLOR)

        batch_boxes, cropped_images = mtcnn.detect_box(img)

        if cropped_images is not None:
            for box, cropped in zip(batch_boxes, cropped_images):
                x, y, x2, y2 = [int(x) for x in box]
                img_embedding = encode(cropped.unsqueeze(0))
                detect_dict = {}
                for k, v in all_people_faces.items(): 
                    detect_dict[k] = (v - img_embedding).norm().item()
                min_key = min(detect_dict, key=detect_dict.get)

                if detect_dict[min_key] >= 0.9:
                    min_key = 'Undetected'
                
        
    #     # Send the results back
        global stuId
        stuId = min_key
        return jsonify({'stuId': min_key})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 400

@app.route('/verify')
def verify():
    print(stuId)
    if stuId:
        url = getenv('HOST')+'/verifyAttendance'
        requests.post(url, json={'Student_Id': stuId})
        return jsonify({'success': True}), 200
    return jsonify({'err': 'Unauthorized'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=getenv('PyPORT'))
