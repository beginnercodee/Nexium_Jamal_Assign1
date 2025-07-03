import TaskCard from "./TaskCard";

function App() {
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>Task List</h1>

      <TaskCard
        title = "Learn React Props"
        description = "Understand how to pass props to components"
        status = "Completed"
      />
      <TaskCard
        title = "Master UseState Hook"
        description = "Build a counter to learn state"
        status = "Completed"
      />
      <TaskCard
        title = "Build TaskCard Component"
        description = "Reinforce your understanding of components and props"
        status = "pending"
      />
    </div>
  );
}

export default App;
