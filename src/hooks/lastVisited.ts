import { useState, useEffect } from "react";

const useLastVisited = () => {
  const [isNewDay, setIsNewDay] = useState(false);

  useEffect(() => {
    // Function to get the local date in 'YYYY-MM-DD' format
    const getLocalDate = () => {
      const date = new Date();
      return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0")
      );
    };

    const today = getLocalDate();

    const lastVisited = localStorage.getItem("lastVisited");

    if (lastVisited !== today) {
      setIsNewDay(true);
      localStorage.setItem("lastVisited", today);
    }
  }, []);

  return isNewDay;
};

export default useLastVisited;
