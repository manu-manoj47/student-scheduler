from flask import Flask, render_template_string, request

app = Flask(__name__)

html = """
<!DOCTYPE html>
<html>
<head>
    <title>Student Schedule Analyzer</title>
    <style>
        body {
            font-family: Arial;
            background: #f2f2f2;
            padding: 40px;
        }

        .container {
            width: 400px;
            background: white;
            padding: 25px;
            margin: auto;
            border-radius: 10px;
        }

        input, button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
        }

        button {
            background: blue;
            color: white;
            border: none;
        }
    </style>
</head>

<body>

<div class="container">
    <h2>Student Schedule Analyzer</h2>

    <form method="POST">

        <label>Subject Name</label>
        <input type="text" name="subject" required>

        <label>Study Hours</label>
        <input type="number" name="hours" required>

        <button type="submit">Analyze</button>

    </form>

    {% if result %}
        <h3>{{ result }}</h3>
    {% endif %}

</div>

</body>
</html>
"""

@app.route("/", methods=["GET", "POST"])
def home():

    result = None

    if request.method == "POST":

        subject = request.form["subject"]
        hours = int(request.form["hours"])

        if hours >= 4:
            result = f"Excellent study schedule for {subject}"

        elif hours >= 2:
            result = f"Average schedule for {subject}"

        else:
            result = f"Need improvement in {subject}"

    return render_template_string(html, result=result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
