import { useState, useEffect } from "react";
import TodoItem from "./components/todoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 300) setItemsPerPage(1);
      else if (window.innerWidth < 768) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add/Update/Delete todos
  const handleAdd = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([newTodo, ...todos]);
  };
  const handleUpdate = (id, newTitle) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);
  const filteredTodos = todos.filter((t) =>
    t.title.toLowerCase().includes(debouncedTerm.toLowerCase()),
  );

  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  return (
    <div className="app-container">
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
        <button
          className="add-task-btn"
          onClick={() => {
            if (inputVal) {
              handleAdd(inputVal);
              setInputVal("");
            }
          }}
        >
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
          <p>No todos found</p>
        )}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default App;
