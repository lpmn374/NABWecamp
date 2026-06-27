import { useMemo } from "react";

export const useTodoFilter = (
  todos,
  debouncedTerm,
  currentPage,
  itemsPerPage,
) => {
  const filteredTodos = useMemo(
    () =>
      todos.filter((t) =>
        t.title.toLowerCase().includes(debouncedTerm.toLowerCase()),
      ),
    [todos, debouncedTerm],
  );

  const paginatedTodos = useMemo(
    () =>
      filteredTodos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [filteredTodos, currentPage, itemsPerPage],
  );

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  return { paginatedTodos, totalPages };
};
