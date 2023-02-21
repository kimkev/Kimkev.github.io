import React, { useState } from "react";
import './TicTacToe.css';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");


    const calculateWinner = (board) => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], line: winningCombos[i] };
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const winningSquares = winner ? [board[winner["line"][0]], board[winner["line"][1]], winner["line"][2]] : [];

    const handleClick = (index) => {

        // end if game is over
        if (winner || board[index] !== null) {
            return;
        }

        // Update the board(square) with the current player's symbol
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        // switch the current player
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

        if (winner) {
            // Animate the winning squares by adding a "winning" class to each square
            console.log('winner', winningSquares);
            winningSquares["line"].forEach((square) => {
                const squareElement = document.getElementById(`winningSquare`);
                squareElement.classList.add('winning');
            });
        }    
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        const startChar = Math.random() < 0.5 ? "X" : "O";
        setCurrentPlayer(startChar);
    };

    const renderSquare = (index) => {
        // add classname for winning squares
        const isWinningSquare = winningSquares.includes(board[index]);
        return (
            <div
                key={index}
                type="button"
                className={`${isWinningSquare ? `square winningSquare` : 'square'}`}
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </div>
        );
    };

    const won = calculateWinner(board);
    let status;
    if (won) {
        status = "Winner: " + won["winner"];
    } else if (board.every((square) => square !== null)) {
        status = "It's a tie!";
    } else {
        status = "Next player: " + (currentPlayer ? "X" : "O");
    }


    return (
        <div className="board-container">
            <div className="status">{status}</div>
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
