function TaskCard({ title, dueDate, status}) {
  const statusColor = status === "Completed" ? "green" : "orange";

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "1rem 0",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    }}>
      <h3>{title}</h3>
      <p>Due: {dueDate}</p>
      <p style={{ color: statusColor, fontWeight: "bold"}}>
        Status: {status}
      </p>
    </div>
  );
}

export default TaskCard;