from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2, os
import numpy as np
import face_recognition
from io import BytesIO
import torch
from facenet_pytorch import InceptionResnetV1, MTCNN
from tqdm import tqdm
from types import MethodType
import pymongo
import mysql.connector

connection = mysql.connector.connect(
    host="sql12.freesqldatabase.com",
    user="sql12771503",
    password="hIYpmm9bkn",
    database="sql12771503"
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
    # cv2.imwrite('img.jpg', rgb_image)
# for user in os.listdir(saved_pictures):
#     final_path = os.path.join(saved_pictures, user)
#     for file in os.listdir(final_path):
#         person_face, extension = file.split(".")
#         img = cv2.imread(f'{final_path}/{person_face}.jpg')

print(all_people_faces.keys())   

# Route to receive image and perform face recognition
@app.route('/recognize_face', methods=['POST'])
def recognize_face():
    try:
        min_key = None
        # Get image from request
        data = request.get_json()

        # print(request.data)
        # data['imageDataUrl']
        image_data = data['imageDataUrl']

    #     # Remove the 'data:image/jpeg;base64,' part
        image_data = image_data.split(',')[1]

    #     # Decode the image
        img_data = base64.b64decode(image_data)
        image = np.asarray(bytearray(img_data), dtype=np.uint8)
        img = cv2.imdecode(image, cv2.IMREAD_COLOR)

    #     # Convert to RGB for face_recognition
        # rgb_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        # cv2.imwrite('img.jpg', rgb_image)

    #     # Detect faces
        # face_locations = face_recognition.face_locations(rgb_image)

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
                    print('Attendance Marked: ', min_key)
                # print(min_key)
                
        
    #     # Send the results back
        return jsonify({'stuId': min_key})
        # return jsonify({"message": "Data received successfully!"}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 400

# @app.route('/read-cookies')
# def read_cookies():
#     cookies = request.cookies  # Access cookies
#     print(cookies)
#     return cookies

if __name__ == '__main__':
    app.run(debug=True)
