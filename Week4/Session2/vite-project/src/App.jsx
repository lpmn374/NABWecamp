import { useState, useEffect } from "react";
import TodoItem from "./components/todoItem";
import { useTodos } from "./hooks/useTodos";
import { useTodoFilter } from "./hooks/useTodoFilter";
import { useDebounced } from "./hooks/useDebounced";
import { useItemsPerPage } from "./hooks/useWindowResize";
import { validateTaskName } from "./utils/taskNameValidation";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inputVal, setInputVal] = useState("");
  const itemsPerPage = useItemsPerPage();
  const debouncedTerm = useDebounced(searchTerm, 500);
  const { todos, loading, error, handleAdd, handleUpdate, handleDelete } =
    useTodos();
  const { paginatedTodos, totalPages } = useTodoFilter(
    todos,
    debouncedTerm,
    currentPage,
    itemsPerPage,
  );
  const handleSaveAdd = () => {
    const { isValid, message, data } = validateTaskName(inputVal);
    if (isValid) {
      handleAdd(data);
      setInputVal("");
    } else alert(message);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="app-container">
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Enter task name..."
          value={inputVal}
          // maxLength={100}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveAdd();
          }}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button className="add-task-btn" onClick={handleSaveAdd}>
          Add Task
        </button>
      </div>
      <div className="todo-container">
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p>No task found</p>
        )}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default App;
