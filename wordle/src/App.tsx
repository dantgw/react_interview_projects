import { useState, useEffect } from "react";
import "./App.css";
import { WORDS } from "./data/words";
import LetterCard from "./components/letterCard";
import { type GAMESTATE } from "./types";

function App() {
  // Game features
  const rows = 5;
  const letters = 5;

  // Game States
  // Game ends when attempt greater than rows

  let rowsInit: number[] = [];
  let lettersInit: number[] = [];

  const [ans, setAns] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [attempt, setAttempt] = useState(1);
  const [pastInput, setPastInput] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GAMESTATE>("PROGRESS");

  useEffect(() => {
    setAns(WORDS[Math.floor(Math.random() * (WORDS.length - 1))].toUpperCase());
  }, []);

  for (let i = 0; i < letters; i++) {
    lettersInit.push(i);
  }
  for (let i = 0; i < rows; i++) {
    rowsInit.push(i);
  }

  const isLetter = (event: KeyboardEvent) => {
    const key = event.key;
    return /^[a-zA-Z]$/.test(key);
  };

  const resetGameState = () => {
    setAns(WORDS[Math.floor(Math.random() * (WORDS.length - 1))].toUpperCase());
    setPastInput([]);
    setAttempt(1);
    setCurrentInput("");
    setGameState("PROGRESS");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState != "PROGRESS") {
        return;
      }
      console.log(event.key);
      if (event.key === "Enter") {
        if (currentInput.length < 5) {
          return;
        }
        if (attempt > 5) {
          return;
        }

        if (currentInput.toUpperCase() === ans) {
          setPastInput((prev) => {
            return [...prev, currentInput];
          });
          setGameState("WIN");
          setCurrentInput("");
          setAttempt((prev) => prev + 1);

          return;
        }
        setPastInput((prev) => {
          return [...prev, currentInput];
        });

        setCurrentInput("");

        if (attempt >= 5) {
          setGameState("LOSE");
          setAttempt((prev) => prev + 1);

          return;
        }
        setAttempt((prev) => prev + 1);

        return;
      }
      if (event.key === "Backspace") {
        if (currentInput.length === 0) {
          return;
        }
        setCurrentInput((prev) => {
          return prev.substring(0, prev.length - 1);
        });
        return;
      }
      if (!isLetter(event)) {
        return;
      }
      if (currentInput.length >= 5) {
        return;
      }
      setCurrentInput((prev) => prev.concat(event.key.toUpperCase()));
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentInput, attempt, ans, gameState, pastInput]);

  const row = (word: string, rowIndex: number) => {
    return (
      <div className="row">
        {lettersInit.map((l, index) => {
          return (
            <LetterCard
              letter={word[index]}
              key={index}
              ans={ans}
              reveal={rowIndex < attempt - 1}
              index={index}
            />
          );
        })}
      </div>
    );
  };

  const board = () => {
    return (
      <div className="board">
        {gameState}
        {rowsInit.map((l, index) => {
          if (index < pastInput.length) {
            return <div key={index}>{row(pastInput[index], index)}</div>;
          } else if (index === pastInput.length) {
            return <div key={index}>{row(currentInput, index)}</div>;
          }
          return <div key={index}>{row("", index)}</div>;
        })}
      </div>
    );
  };

  return (
    <div className={"game"}>
      {board()}
      {gameState != "PROGRESS" && (
        <div>
          <button onClick={resetGameState}>reset</button>
        </div>
      )}
    </div>
  );
}

export default App;
