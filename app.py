from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/")
def home():
    return "Backend Running Successfully"

@app.route("/api/analyze", methods=["POST"])
def analyze():

    data = request.json

    student = data.get("student")
    subject = data.get("subject")
    hours = data.get("hours")
    difficulty = data.get("difficulty")
    priority = data.get("priority")
    days = data.get("days")
    time = data.get("time")

    suggestion = f"Study {subject} daily for {hours} hours."

    performance = "Good Progress Expected"

    return jsonify({
        "student": student,
        "subject": subject,
        "hours": hours,
        "difficulty": difficulty,
        "priority": priority,
        "days": days,
        "time": time,
        "suggestion": suggestion,
        "performance": performance
    })

if __name__ == "__main__":
    app.run(debug=True)