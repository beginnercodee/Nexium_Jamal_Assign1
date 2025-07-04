import { useState, useEffect } from "react";
import TodoItem from "./TodoItem.jsx"; // ✅ correct

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {

  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
});


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false,
    }

    setTodos([...todos, newTask]);
    setTask("");
};

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // const handleEdit = (index, newTask) => {
  //   const updated = [...todos];
  //   updated[index] = newTask;
  //   setTodos(updated);
  // };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div style={{ padding: "2rem"}}>
      <h1>📝 Jamal's Todo App</h1>

      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <button
      onClick={() => setTodos([])}
      style={{ marginLeft: "10px"}}>
        Clear All
      </button>

      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            onToggle={toggleComplete}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

// Renamed for Vercel deployment
