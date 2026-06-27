import { useState } from "react";
import { validateTaskName } from "../utils/taskNameValidation";
import "./todoItem.css";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const handleSave = () => {
    const { isValid, message, data } = validateTaskName(newTitle);
    if (isValid) {
      onUpdate(todo.id, data, todo.completed);
      setIsEditing(false);
    } else alert(message);
  };
  const toggleComplete = () => {
    onUpdate(todo.id, todo.title, !todo.completed);
  };
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""} `}>
      <div className="todo-content">
        <div className="todo-text">
          {isEditing ? (
            <input
              value={newTitle}
              // maxLength={100}
              placeholder="Enter task name..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <span>{todo.title}</span>
          )}
        </div>
      </div>
      <div className="button-group">
        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>
            {" "}
            Save{" "}
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className="complete-btn" onClick={toggleComplete}>
          {todo.completed ? "Undone" : "Done"}
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default TodoItem;
