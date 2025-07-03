import TaskCard from "./TaskCard";

function App() {
  return (
    <div style={{ padding: "2rem"}}>
      <h1>My Tasks</h1>
      
      <TaskCard
        title="Complete React Challenge"
        dueDate="July 3, 2025"
        status="Completed"
      />

      <TaskCard
        title="Watch Next.js Fundamentals"
        dueDate="July 3, 2025"
        status="Pending"
      />  
    </div>
  );
}

export default App;
