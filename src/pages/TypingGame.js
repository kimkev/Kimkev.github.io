import React, { useState, useEffect } from "react";
import "./TypingGame.css";

const TypingGame = () => {
    const timeLimit = 30;
    const [text, setText] = useState("");
    const [userText, setUserText] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [wpm, setWpm] = useState(0);
    const [gameStart, setGameStart] = useState(false);

    const getHighlightedText = () => {
        let correctText = "";
        for (let i = 0; i < text.length; i++) {
            if (i < userText.length && text[i] === userText[i]) {
                correctText += `<span class="correct">${text[i]}</span>`;
            } else {
                correctText += `<span class="incorrect">${text[i]}</span>`;
            }
        }
        return { __html: correctText };
    };

    const handleChange = (event) => {
        setUserText(event.target.value);
    };

    const resetGame = () => {
        setGameStart(false);
        setText("");
        setUserText("");
        setTimeRemaining(timeLimit);
        setWpm(0);
    };

    const startGame = () => {
        setGameStart(true);
        setTimeRemaining(timeLimit);
        setWpm(0);
        fetch("https://random-word-api.herokuapp.com/word?number=20")
            .then((res) => res.json())
            .then((data) => setText(data.join(" ")));
    };


    useEffect(() => {
        if (timeRemaining === 0) {
            const words = userText.split(" ").length;
            setWpm(words / (timeLimit / 60));
        }
    }, [userText, timeRemaining]);

    useEffect(() => {
        if (gameStart && timeRemaining > 0) {
            const intervalId = setInterval(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [gameStart, timeRemaining]);

    return (
        <div className="typing-game">
            <h1 className="randomText" dangerouslySetInnerHTML={getHighlightedText()} />
            <textarea className="input" rows={1} value={userText} onChange={handleChange} disabled={timeRemaining === 0} />
            <h4 className="timer">WPM: {wpm.toFixed(2)} </h4>
            <h3>  Time remaining: {timeRemaining}</h3>
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
