from flask import Flask, render_template_string, request

app = Flask(__name__)

html = """

<!DOCTYPE html>
<html>

<head>

<title>AI Student Schedule Analyzer</title>

<style>

body{

    margin:0;
    padding:0;

    font-family:Arial;

    background:linear-gradient(135deg,#050816,#0a0f2c,#12052e);

    height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;

    color:white;
}

.container{

    width:500px;

    background:rgba(255,255,255,0.05);

    padding:30px;

    border-radius:20px;

    backdrop-filter:blur(10px);

    box-shadow:0 0 20px #00f7ff;
}

h1{

    text-align:center;
    color:#00f7ff;
}

input,select{

    width:100%;
    padding:12px;

    margin-top:10px;
    margin-bottom:20px;

    border:none;

    border-radius:10px;

    background:#111c44;

    color:white;

    font-size:16px;
}

button{

    width:100%;

    padding:14px;

    border:none;

    border-radius:10px;

    background:linear-gradient(90deg,#00f7ff,#8a2be2);

    color:white;

    font-size:18px;

    cursor:pointer;
}

.chat{

    margin-top:25px;

    background:#081b29;

    padding:20px;

    border-radius:15px;

    box-shadow:0 0 10px #00ff9d;

    line-height:1.8;
}

.ai{

    color:#00ff9d;
}

</style>

</head>

<body>

<div class="container">

<h1>AI Student Schedule Analyzer</h1>

<form method="POST">

<label>Student Name</label>
<input type="text" name="student" required>

<label>Subject Name</label>
<input type="text" name="subject" required>

<label>Study Hours Per Day</label>
<input type="number" name="hours" required>

<label>Difficulty Level</label>

<select name="difficulty">

<option>Easy</option>
<option>Medium</option>
<option>Hard</option>

</select>

<label>Exam Priority</label>

<select name="priority">

<option>Low</option>
<option>Medium</option>
<option>High</option>

</select>

<label>Available Study Days</label>

<select name="days">

<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
<option>7</option>

</select>

<label>Preferred Study Time</label>

<select name="time">

<option>Morning</option>
<option>Afternoon</option>
<option>Evening</option>
<option>Night</option>

</select>

<button type="submit">Generate AI Study Plan</button>

</form>

{% if result %}

<div class="chat">

{{ result|safe }}

</div>

{% endif %}

</div>

</body>
</html>

"""

@app.route("/", methods=["GET","POST"])

def home():

    result = None

    if request.method == "POST":

        student = request.form["student"]
        subject = request.form["subject"]
        hours = int(request.form["hours"])
        difficulty = request.form["difficulty"]
        priority = request.form["priority"]
        days = request.form["days"]
        time = request.form["time"]

        suggestion = ""

        if difficulty == "Hard" and priority == "High":

            suggestion = "Focus more on practice tests and coding exercises."

        elif difficulty == "Medium":

            suggestion = "Maintain regular revision and short notes."

        else:

            suggestion = "Quick revision is enough for this subject."

        performance = ""

        if hours >= 4:

            performance = "Excellent preparation level."

        elif hours >= 2:

            performance = "Average preparation level."

        else:

            performance = "You need more study hours."

        result = f"""

        <p class='ai'>🤖 AI Assistant: Hello {student} 👋</p>

        <p class='ai'>🤖 AI Assistant: Your schedule has been analyzed successfully.</p>

        <hr>

        <p>📘 Subject: <b>{subject}</b></p>

        <p>⏰ Study Hours: <b>{hours} hours/day</b></p>

        <p>📚 Difficulty Level: <b>{difficulty}</b></p>

        <p>🔥 Exam Priority: <b>{priority}</b></p>

        <p>📅 Available Days: <b>{days} days</b></p>

        <p>🌙 Preferred Study Time: <b>{time}</b></p>

        <hr>

        <p class='ai'>✅ AI Suggestion:</p>

        <p>{suggestion}</p>

        <p class='ai'>📈 Performance Analysis:</p>

        <p>{performance}</p>

        <hr>

        <p class='ai'>📝 Recommended Study Plan:</p>

        <p>Day 1 → Basics Revision</p>

        <p>Day 2 → Practice Problems</p>

        <p>Day 3 → Mock Test</p>

        <p>Day 4 → Weak Area Improvement</p>

        """

    return render_template_string(html,result=result)

if __name__ == "__main__":

    app.run(host="0.0.0.0",port=5000)