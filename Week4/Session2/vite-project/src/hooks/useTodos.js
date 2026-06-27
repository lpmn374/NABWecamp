import { useState, useEffect } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch API");
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Add/Update/Delete todos
  const handleAdd = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
  };
  const handleUpdate = (id, newTitle, completed) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle, completed } : t)),
    );
  };
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    todos,
    loading,
    error,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
