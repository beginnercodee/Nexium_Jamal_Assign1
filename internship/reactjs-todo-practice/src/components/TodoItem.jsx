function TodoItem({ todo, index, onToggle, onDelete}) {

  return (
    <li
      onClick={() => onToggle(index)}
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        cursor: "pointer",
      }}
    >
      {todo.text}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click from toggling the todo
          onDelete(index);
        }}
        style={{marginLeft: "10px"}}
      >
        ❌
      </button>
    </li>
  );
}

export default TodoItem;
