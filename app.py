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
            font-family: Arial, sans-serif;

            background: linear-gradient(135deg,#050816,#0a0f2c,#12052e);
            height:100vh;

            display:flex;
            justify-content:center;
            align-items:center;

            color:white;
        }

        .container{

            width:420px;
            padding:35px;

            border-radius:20px;

            background: rgba(255,255,255,0.05);

            backdrop-filter: blur(10px);

            box-shadow: 0 0 20px #00f7ff;

            border:1px solid rgba(255,255,255,0.2);

        }

        h1{

            text-align:center;
            margin-bottom:30px;

            color:#00f7ff;
        }

        label{

            font-size:18px;
        }

        input{

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

            background: linear-gradient(90deg,#00f7ff,#8a2be2);

            color:white;

            font-size:18px;
            cursor:pointer;
        }

        button:hover{

            opacity:0.9;
        }

        .result{

            margin-top:25px;

            background:#081b29;

            padding:15px;

            border-radius:10px;

            color:#00ff9d;

            font-size:20px;

            text-align:center;

            box-shadow:0 0 10px #00ff9d;
        }

    </style>

</head>

<body>

<div class="container">

    <h1>AI Student Schedule Analyzer</h1>

    <form method="POST">

        <label>Subject Name</label>
        <input type="text" name="subject" required>

        <label>Study Hours</label>
        <input type="number" name="hours" required>

        <button type="submit">Analyze</button>

    </form>

    {% if result %}
        <div class="result">
            {{ result }}
        </div>
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