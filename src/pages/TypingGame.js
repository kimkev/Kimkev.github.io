import React, { useState, useEffect } from "react";
import "./TypingGame.css";

const TypingGame = () => {
  const [text, setText] = useState("");
  const [userText, setUserText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(5);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=10")
      .then((res) => res.json())
      .then((data) => setText(data.join(" ")));
  }, []);

  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  const resetGame = () => {
    setText("");
    setUserText("");
    setTimeRemaining(5);
  };

  const startGame = () => {
    setTimeRemaining(5);
    fetch("https://random-word-api.herokuapp.com/word?number=10")
      .then((res) => res.json())
      .then((data) => setText(data.join(" ")));
  };

  const finishGame = () => {
    setTimeRemaining(0);
  };

  const tick = () => {
    setTimeRemaining((time) => {
      if (time === 1) {
        finishGame();
        return 0;
      } else {
        return time - 1;
      }
    });
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      setTimeout(() => tick(), 1000);
    }
  }, [timeRemaining]);

  return (
    <div className="typing-game">
      <h1 className="text">{text}</h1>
      <textarea className="input" value={userText} onChange={handleChange} />
      <h4 className="timer">Time remaining: {timeRemaining}</h4>
      <div className="buttons">
        <button className="start-button" onClick={startGame}>
          Start
        </button>
        <button className="reset-button" onClick={resetGame}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TypingGame;
