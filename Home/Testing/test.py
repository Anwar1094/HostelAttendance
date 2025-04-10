from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS with credentials support
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5502"])  # Match frontend URL

@app.after_request
def apply_cors_headers(response):
    origin = request.headers.get("Origin")
    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route('/set-cookie', methods=['GET'])
def set_cookie():
    response = make_response("Cookie has been set")
    response.set_cookie('user', 'JohnDoe', httponly=True, samesite='None', secure=False)  # Secure should be True in production
    return response

@app.route('/read-cookies', methods=['GET'])
def read_cookies():
    print('Cookies received:', request.cookies)
    return jsonify(request.cookies)

if __name__ == '__main__':
    app.run(debug=True, port=3001)
