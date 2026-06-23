import { useState } from "react";
import "./todoItem.css";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  return (
    <div className="todo-item">
      {isEditing ? (
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      ) : (
        <span>{todo.title}</span>
      )}
      {isEditing ? (
        <button
          onClick={() => {
            onUpdate(todo.id, newTitle);
            setIsEditing(false);
          }}
        >
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};
export default TodoItem;
