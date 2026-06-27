import { useState, useEffect } from "react";

export const useDebounced = (value, delay = 500) => {
  const [debouncedTerm, setDebouncedTerm] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedTerm;
};
