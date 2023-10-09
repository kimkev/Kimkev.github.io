import React, { useState, useEffect, useCallback } from "react";
import './AnagramGame.css';

function AnagramGame() {
    const [word, setWord] = useState("");
    const [scrambledWord, setScrambledWord] = useState("");
    const [guess, setGuess] = useState("");
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
        console.log(data[0])
        let scrambledWord = data[0];
        while (scrambledWord === data[0]) {
            scrambledWord = scrambleWord(data[0])
        }
        setScrambledWord(scrambledWord);
        setMessage("");
        setGuess("");
    }, [difficulty]);

    const scrambleWord = word => {
        // Scramble the word
        return word
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
    };

    const handleInputChange = (event) => {
        setGuess(event.target.value);
    };

    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const handleDifficulty = (event) => {
        setDifficulty(event.target.value);
    }

    const handleHint = () => {
        let newGuess = guess;
        if (newGuess.length < word.length) {
            newGuess += word[newGuess.length];
            setGuess(newGuess);
        }
    };

    useEffect(() => {
        fetchWord();
    }, [fetchWord]);

    useEffect(() => {
        if (guess.length === scrambledWord.length) {
            if (guess.toLowerCase() === word.toLowerCase()) {
                showMessage("Correct");
            } else {
                showMessage("Incorrect. Try again.");
            }
        }
    }, [guess, scrambledWord.length, word]);

    return (
        <div className="container container-anagram">
            <h1>Guess the Word!</h1>
            <div className="difficulty-buttons">
                <button type="button" value="easy" onClick={handleDifficulty}>Easy</button>
                <button type="button" value="medium" onClick={handleDifficulty}>Medium</button>
                <button type="button" value="hard" onClick={handleDifficulty}>Hard</button>
            </div>
            <p>Unscramble the word below:</p>
            <p className="scrambled-word">{scrambledWord}</p>
            <div className="container-input">
                <input
                    className="input"
                    type="text"
                    value={guess}
                    onChange={handleInputChange}
                    placeholder="Guess Here"
                />
                <button className="hint-button" onClick={handleHint}>Hint</button>
                <button className="playAgain-button" onClick={fetchWord}>Play again</button>
            </div>
            <h2>{message}</h2>
        </div>
    );
}

export default AnagramGame;