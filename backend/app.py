from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "HealthCare+ Backend is Running!"
    })


@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "HealthCare+ server is working"
    })


@app.route("/api/medicines")
def medicines():
    return jsonify({
        "medicines": [
            {
                "name": "Paracetamol",
                "available": True
            },
            {
                "name": "Amoxicillin",
                "available": True
            },
            {
                "name": "Cetirizine",
                "available": False
            }
        ]
    })


if __name__ == "__main__":
    app.run(debug=True)