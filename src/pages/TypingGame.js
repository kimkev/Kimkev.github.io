import React, { useState, useEffect, useRef } from "react";
import "./TypingGame.css";

const TypingGame = () => {
    const timeLimit = 30;
    const [text, setText] = useState("");
    const [userText, setUserText] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [wpm, setWpm] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const inputRef = useRef(null);

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
        setIsStarted(false);
        setText("");
        setUserText("");
        setTimeRemaining(timeLimit);
        setWpm(0);
    };

    const startGame = async () => {
        setUserText("");
        setText(await getWords());
        setIsStarted(true);
        setTimeRemaining(timeLimit);
        setWpm(0);
        inputRef.current.focus();
    };

    const getWord = async () => {
        const wordAPI = 'https://random-word-api.herokuapp.com/word?length=3';
        const response = await fetch(wordAPI);
        const data = await response.json();

        console.log(data);
        return data[0];
    }

    const getWords = async () => {
        const word = await getWord();
        const wordSetAPI = 'https://api.datamuse.com/words?ml=';
        const response = await fetch(`${wordSetAPI}${word}&max=30`);
        const data = await response.json();
        const words = data.map(words => words.word).join(" ");

        console.log(words);
        return words;
    }


    useEffect(() => {
        if (timeRemaining === 0) {
            const words = userText.split(" ").length;
            setWpm(words / (timeLimit / 60));
        }
    }, [userText, timeRemaining]);

    useEffect(() => {
        if (isStarted && timeRemaining > 0) {
            const intervalId = setInterval(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isStarted, timeRemaining]);

    return (
        <div className="typing-game">
            <h1 className="randomText" dangerouslySetInnerHTML={getHighlightedText()} />
            <textarea 
                className="input" 
                ref={inputRef} 
                rows={1} 
                value={userText} 
                onChange={handleChange} 
                disabled={timeRemaining === 0} 
            />
            <h4 className="timer">WPM: {wpm.toFixed(3)} </h4>
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
