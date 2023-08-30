import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const LoadingPage = () => {
  const { choice } = useParams();
  const [time, setTime] = useState(choice === "delivery" ? 30 : 15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {time} minutes remaining for {choice}
    </div>
  );
};

export default LoadingPage;
