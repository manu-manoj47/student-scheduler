import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function App() {

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    hours: "",
    difficulty: "Easy",
    priority: "Low",
    days: "1",
    time: "Morning",
  });

  const [result, setResult] = useState(null);

  const [history, setHistory] = useState([]);

  // =========================
  // LOAD HISTORY
  // =========================
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/history"
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // DELETE HISTORY
  // =========================
  const deleteHistory = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:5000/api/history/${id}`
      );

      fetchHistory();

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/api/analyze",
        formData
      );

      setResult(response.data);

      fetchHistory();

    } catch (error) {

      alert("Backend not connected.");

      console.log(error);

    }

  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Student Schedule Analyzer
        </h1>

        {/* FORM + RESULT */}
        <div style={styles.grid}>

          {/* FORM */}
          <form onSubmit={handleSubmit} style={styles.formBox}>

            <input
              name="student"
              placeholder="Student Name"
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              name="subject"
              placeholder="Subject Name"
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              name="hours"
              type="number"
              placeholder="Study Hours"
              onChange={handleChange}
              style={styles.input}
              required
            />

            <select
              name="difficulty"
              onChange={handleChange}
              style={styles.input}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <select
              name="priority"
              onChange={handleChange}
              style={styles.input}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              name="days"
              onChange={handleChange}
              style={styles.input}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>

            <select
              name="time"
              onChange={handleChange}
              style={styles.input}
            >
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Night</option>
            </select>

            <button style={styles.button}>
              Analyze Schedule
            </button>

          </form>

          {/* RESULT */}
          <div style={styles.resultBox}>

            {

              result ? (

                <>

                  <h2>Analysis Result</h2>

                  <p>👋 Hello {result.student}</p>

                  <p>📘 Subject: {result.subject}</p>

                  <p>⏰ Hours: {result.hours}</p>

                  <p>📚 Difficulty: {result.difficulty}</p>

                  <p>🔥 Priority: {result.priority}</p>

                  <p>📅 Days: {result.days}</p>

                  <p>🌙 Time: {result.time}</p>

                  <hr />

                  <p>✅ {result.suggestion}</p>

                  <p>📈 {result.performance}</p>

                </>

              ) : (

                <h2>Result will appear here</h2>

              )

            }

          </div>

        </div>

        {/* DASHBOARD */}
        <div style={styles.dashboard}>

          <h2>Dashboard</h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={history}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="student" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="hours" fill="#00ffff" />

            </BarChart>

          </ResponsiveContainer>

          {/* TABLE */}
          <table style={styles.table}>

            <thead>

              <tr>

                <th>Student</th>

                <th>Subject</th>

                <th>Hours</th>

                <th>Performance</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                history.map((item, index) => (

                  <tr key={index}>

                    <td>{item.student}</td>

                    <td>{item.subject}</td>

                    <td>{item.hours}</td>

                    <td>{item.performance}</td>

                    <td>

                      <button
                        onClick={() => deleteHistory(item.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

const styles = {

  page: {

    minHeight: "100vh",

    width: "100%",

    display: "flex",

    justifyContent: "center",

    alignItems: "flex-start",

    paddingTop: "40px",

    paddingBottom: "40px",

    background:
      "linear-gradient(-45deg,#ff00cc,#3333ff,#00ffee,#ff9900)",

    backgroundSize: "400% 400%",

    color: "white",

  },

  card: {

    width: "95%",

    maxWidth: "1200px",

    padding: "30px",

    borderRadius: "20px",

    background: "rgba(0,0,0,0.60)",

    boxShadow: "0 0 30px white",

  },

  title: {

    textAlign: "center",

    color: "#00ffff",

    fontSize: "42px",

  },

  grid: {

    display: "grid",

    gridTemplateColumns: "1fr 1fr",

    gap: "25px",

  },

  formBox: {

    background: "#06111f",

    padding: "20px",

    borderRadius: "20px",

  },

  resultBox: {

    background: "#081b29",

    padding: "20px",

    borderRadius: "20px",

    lineHeight: "1.7",

  },

  input: {

    width: "100%",

    padding: "12px",

    marginBottom: "15px",

    borderRadius: "10px",

    border: "none",

    background: "#111c44",

    color: "white",

    fontSize: "16px",

    boxSizing: "border-box",

  },

  button: {

    width: "100%",

    padding: "14px",

    borderRadius: "10px",

    border: "none",

    background:
      "linear-gradient(90deg,#00f7ff,#8a2be2)",

    color: "white",

    fontSize: "18px",

    cursor: "pointer",

  },

  dashboard: {

    marginTop: "30px",

    background: "#06111f",

    padding: "20px",

    borderRadius: "20px",

  },

  table: {

    width: "100%",

    marginTop: "20px",

    borderCollapse: "collapse",

    color: "white",

  },

  deleteButton: {

    padding: "8px 12px",

    border: "none",

    borderRadius: "8px",

    background: "red",

    color: "white",

    cursor: "pointer",

  },

};

export default App;