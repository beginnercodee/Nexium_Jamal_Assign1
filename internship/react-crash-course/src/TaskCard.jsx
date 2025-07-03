function TaskCard(props) {
    return (
        <div style={{border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '8px',
      backgroundColor: props.status === "Completed" ? "#d4edda" : "#f8d7da"}}>
            <h3>{props.title}!</h3>
            <p>{props.description}</p>
            <strong>Status: {props.status}</strong>
        </div>
    );
}

export default TaskCard;