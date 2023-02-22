import React, { useState, useEffect, useCallback } from "react";
import './AnagramGame.css';

function AnagramGame() {
    const [word, setWord] = useState("");
    const [scrambledWord, setScrambledWord] = useState("");
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("");
    const [difficulty, setDifficulty] = useState('easy');

    const fetchWord = useCallback(async () => {
        const wordLength = {
            easy: 4,
            medium: 6,
            hard: 8
        }[difficulty];

        const response = await fetch(
            `https://random-word-api.herokuapp.com/word?length=${wordLength}`);
        const data = await response.json();
        setWord(data[0]);
        setScrambledWord(scrambleWord(data[0]));
        setInput("");
        setMessage("");
    }, [difficulty]);

    useEffect(() => {
        fetchWord();
    }, [fetchWord]);

    const scrambleWord = word => {
        // Scramble the word
        return word
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const handleFormSubmit = (event) => {
        console.log('button pressed');
        event.preventDefault();
        if (input.toLowerCase() === word.toLowerCase()) {
            showMessage("You won!");
        } else {
            showMessage("Try again.");
        }
    };

    const handlePlayAgain = () => {
        setMessage("");
        setInput("");
        fetchWord();
    };

    const handleDifficulty = (event) => {
        setDifficulty(event.target.value);
    }

    return (
        <div className="container">
            <h1>Guess the Word!</h1>
            <div className="difficulty-buttons">
                <button type="button" value="easy" onClick={handleDifficulty}>Easy</button>
                <button type="button" value="medium" onClick={handleDifficulty}>Medium</button>
                <button type="button" value="hard" onClick={handleDifficulty}>Hard</button>
            </div>
            <p>Unscramble the word below:</p>
            <h2>{scrambledWord}</h2>
            <form className="form-anagram" onSubmit={handleFormSubmit}>
                <input
                    className="input"
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Guess Here"
                />
                <div className="form-button-container">
                    <button type="submit">Guess</button>
                    <button onClick={handlePlayAgain}>Play again</button>
                </div>

            </form>
            <h2>{message}</h2>
        </div>
    );
}

export default AnagramGame;