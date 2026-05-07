from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# =========================
# DATABASE
# =========================
def create_table():
    conn = sqlite3.connect("schedule.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student TEXT,
            subject TEXT,
            hours INTEGER,
            difficulty TEXT,
            priority TEXT,
            days TEXT,
            time TEXT,
            suggestion TEXT,
            performance TEXT
        )
    """)

    conn.commit()
    conn.close()

create_table()

# =========================
# HOME
# =========================
@app.route("/")
def home():
    return "Backend Running Successfully"

# =========================
# ANALYZE
# =========================
@app.route("/api/analyze", methods=["POST"])
def analyze():

    data = request.json

    student = data.get("student")
    subject = data.get("subject")
    hours = int(data.get("hours"))
    difficulty = data.get("difficulty")
    priority = data.get("priority")
    days = data.get("days")
    time = data.get("time")

    # Smart Suggestion
    if difficulty == "Hard" and priority == "High":
        suggestion = "Focus more on mock tests and coding practice."
    elif difficulty == "Medium":
        suggestion = "Revise concepts daily with short notes."
    else:
        suggestion = "Quick revision and practice is enough."

    # Performance
    if hours >= 5:
        performance = "Excellent preparation level."
    elif hours >= 3:
        performance = "Good preparation level."
    else:
        performance = "You need more study hours."

    # Save to DB
    conn = sqlite3.connect("schedule.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO schedules
        (student, subject, hours, difficulty, priority, days, time, suggestion, performance)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        student,
        subject,
        hours,
        difficulty,
        priority,
        days,
        time,
        suggestion,
        performance
    ))

    conn.commit()
    conn.close()

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

# =========================
# HISTORY
# =========================
@app.route("/api/history", methods=["GET"])
def history():

    conn = sqlite3.connect("schedule.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM schedules ORDER BY id DESC")

    rows = cursor.fetchall()

    conn.close()

    data = []

    for row in rows:

        data.append({
            "id": row[0],
            "student": row[1],
            "subject": row[2],
            "hours": row[3],
            "difficulty": row[4],
            "priority": row[5],
            "days": row[6],
            "time": row[7],
            "suggestion": row[8],
            "performance": row[9]
        })

    return jsonify(data)

# =========================
# DELETE HISTORY
# =========================
@app.route("/api/history/<int:id>", methods=["DELETE"])
def delete_history(id):

    conn = sqlite3.connect("schedule.db")
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM schedules WHERE id = ?",
        (id,)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Deleted successfully"
    })

# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)