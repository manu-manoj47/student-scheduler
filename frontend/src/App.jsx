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

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/history");
      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHistory = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/history/${id}`);
      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      <div className="campus-bubbles"></div>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 Student Schedule Analyzer</h1>
        <p style={styles.subtitle}>College Study Planner Dashboard</p>

        <div style={styles.grid}>
          <form onSubmit={handleSubmit} style={styles.formBox}>
            <input name="student" placeholder="Student Name" onChange={handleChange} style={styles.input} required />
            <input name="subject" placeholder="Subject Name" onChange={handleChange} style={styles.input} required />
            <input name="hours" type="number" placeholder="Study Hours" onChange={handleChange} style={styles.input} required />

            <select name="difficulty" onChange={handleChange} style={styles.input}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <select name="priority" onChange={handleChange} style={styles.input}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select name="days" onChange={handleChange} style={styles.input}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>

            <select name="time" onChange={handleChange} style={styles.input}>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Night</option>
            </select>

            <button style={styles.button}>Analyze Schedule</button>
          </form>

          <div style={styles.resultBox}>
            {result ? (
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
            )}
          </div>
        </div>

        <div style={styles.dashboard}>
          <h2>📊 Dashboard</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="student" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#ffd166" />
            </BarChart>
          </ResponsiveContainer>

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
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.student}</td>
                  <td>{item.subject}</td>
                  <td>{item.hours}</td>
                  <td>{item.performance}</td>
                  <td>
                    <button onClick={() => deleteHistory(item.id)} style={styles.deleteButton}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
    color: "white",
    background:
      "linear-gradient(-45deg,#1e3c72,#2a5298,#6dd5ed,#2193b0,#f7971e,#ffd200)",
    backgroundSize: "500% 500%",
    animation: "collegeVibes 10s ease infinite",
    position: "relative",
    overflow: "hidden",
  },

  card: {
    width: "95%",
    maxWidth: "1200px",
    padding: "30px",
    borderRadius: "22px",
    background: "rgba(0,0,0,0.65)",
    boxShadow: "0 0 35px rgba(255,255,255,0.8)",
    position: "relative",
    zIndex: 2,
  },

  title: {
    textAlign: "center",
    color: "#ffd166",
    fontSize: "42px",
    marginBottom: "5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#e0f7ff",
    marginBottom: "30px",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
  },

  formBox: {
    background: "rgba(6,17,31,0.9)",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  resultBox: {
    background: "rgba(8,27,41,0.9)",
    padding: "20px",
    borderRadius: "20px",
    lineHeight: "1.7",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
    background: "#10213d",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#ffd166,#06d6a0,#118ab2)",
    color: "#07111f",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  dashboard: {
    marginTop: "30px",
    background: "rgba(6,17,31,0.9)",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.2)",
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
    background: "#ef476f",
    color: "white",
    cursor: "pointer",
  },
};

export default App;