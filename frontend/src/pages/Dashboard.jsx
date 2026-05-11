function Dashboard() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🎓 Student Dashboard</h1>

        <p>Login Successful</p>

        <div style={styles.grid}>
          <div style={styles.box}>
            <h2>📚 Study Hours</h2>
            <p>42 Hours</p>
          </div>

          <div style={styles.box}>
            <h2>🔥 Performance</h2>
            <p>Excellent</p>
          </div>

          <div style={styles.box}>
            <h2>📈 Attendance</h2>
            <p>89%</p>
          </div>

          <div style={styles.box}>
            <h2>🏆 Leaderboard</h2>
            <p>Rank #3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(-45deg,#000428,#004e92,#1e3c72,#2a5298)",
    color: "white",
  },

  card: {
    maxWidth: "1200px",
    margin: "auto",
  },

  grid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  box: {
    padding: "25px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },
};

export default Dashboard;