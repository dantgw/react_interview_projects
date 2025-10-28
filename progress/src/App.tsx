import "./App.css";
import ProgressBar from "./components/progressbar";
import { useState, useEffect } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const maxTime = 10000;
  const progress = time > maxTime ? 100 : (time / maxTime) * 100;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((t) => t + 1);
    }, 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onResetBtnClicked = () => {
    setTime(0);
  };

  return (
    <div className="main">
      <div
        style={{
          height: "32px",
          width: "800px",
          display: "flex",
        }}
      >
        <ProgressBar progress={progress} />
      </div>
      <button onClick={onResetBtnClicked}>reset</button>
    </div>
  );
};
export default App;
