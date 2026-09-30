from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# ---------------- HOME ----------------
@app.route("/")
def home():
    return jsonify({
        "message": "HealthCare+ Backend is Running!",
        "status": "success"
    })


# ---------------- HEALTH CHECK ----------------
@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "HealthCare+ server is working"
    })


# ---------------- MEDICINES ----------------
medicines = [
    {
        "id": 1,
        "name": "Paracetamol",
        "available": True
    },
    {
        "id": 2,
        "name": "Amoxicillin",
        "available": True
    },
    {
        "id": 3,
        "name": "Cetirizine",
        "available": False
    },
    {
        "id": 4,
        "name": "Ibuprofen",
        "available": True
    },
    {
        "id": 5,
        "name": "Azithromycin",
        "available": False
    }
]


@app.route("/api/medicines", methods=["GET"])
def get_medicines():
    search = request.args.get("search", "").lower()

    if search:
        results = [
            medicine
            for medicine in medicines
            if search in medicine["name"].lower()
        ]
    else:
        results = medicines

    return jsonify({
        "status": "success",
        "count": len(results),
        "medicines": results
    })


# ---------------- EMERGENCY ----------------
@app.route("/api/emergency", methods=["GET"])
def emergency():
    return jsonify({
        "status": "success",
        "message": "For a medical emergency, contact your local emergency service immediately.",
        "services": [
            {
                "name": "Emergency Services",
                "number": "112"
            },
            {
                "name": "Ambulance",
                "number": "108"
            }
        ]
    })


# ---------------- DOCTORS ----------------
doctors = [
    {
        "id": 1,
        "name": "Dr. Rahul Sharma",
        "specialization": "General Physician",
        "available": True,
        "video_call": True
    },
    {
        "id": 2,
        "name": "Dr. Priya Patil",
        "specialization": "Pediatrician",
        "available": True,
        "video_call": True
    },
    {
        "id": 3,
        "name": "Dr. Amit Verma",
        "specialization": "Cardiologist",
        "available": False,
        "video_call": False
    }
]


@app.route("/api/doctors", methods=["GET"])
def get_doctors():
    return jsonify({
        "status": "success",
        "doctors": doctors
    })


# ---------------- VIDEO CALL ----------------
@app.route("/api/video-call", methods=["POST"])
def video_call():
    data = request.get_json(silent=True) or {}

    doctor_id = data.get("doctor_id")

    if not doctor_id:
        return jsonify({
            "status": "error",
            "message": "Doctor ID is required"
        }), 400

    doctor = next(
        (doctor for doctor in doctors if doctor["id"] == doctor_id),
        None
    )

    if not doctor:
        return jsonify({
            "status": "error",
            "message": "Doctor not found"
        }), 404

    if not doctor["available"] or not doctor["video_call"]:
        return jsonify({
            "status": "error",
            "message": "This doctor is currently unavailable for video consultation"
        }), 400

    return jsonify({
        "status": "success",
        "message": "Video consultation request created",
        "doctor": doctor["name"]
    })


# ---------------- CONTACT SUPPORT ----------------
@app.route("/api/support", methods=["POST"])
def support():
    data = request.get_json(silent=True) or {}

    name = data.get("name")
    message = data.get("message")

    if not name or not message:
        return jsonify({
            "status": "error",
            "message": "Name and message are required"
        }), 400

    return jsonify({
        "status": "success",
        "message": "Your support request has been received",
        "user": name
    })


# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)