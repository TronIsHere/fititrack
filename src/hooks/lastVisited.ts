import { useState, useEffect } from "react";

const useLastVisited = () => {
  const [isNewDay, setIsNewDay] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastVisited = localStorage.getItem("lastVisited");

    if (lastVisited !== today) {
      setIsNewDay(true);
      localStorage.setItem("lastVisited", today);
    }
  }, []);

  return isNewDay;
};

export default useLastVisited;
