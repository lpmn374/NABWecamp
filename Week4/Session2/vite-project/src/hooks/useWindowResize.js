import { useState, useEffect } from "react";

export const useItemsPerPage = () => {
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

  return itemsPerPage;
};
