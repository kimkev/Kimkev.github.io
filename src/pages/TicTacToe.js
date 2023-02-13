import React, { useState } from "react";
import './TicTacToe.css';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");

    const handleClick = (index) => {
        const newBoard = [...board];
        if (newBoard[index] === null) {
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
    };

    const renderSquare = (index) => {
        return (
            <div
                key={index}
                className="square"
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </div>
        );
    };

    return (
        <div className="board-container">
            <div className="board">
                {board.map((square, index) => renderSquare(index))}
            </div>
            <button onClick={resetBoard} className="reset-tictactoe">
                Reset
            </button>
        </div>
    );
};

export default TicTacToe;
