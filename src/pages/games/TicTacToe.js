import React, { useState } from "react";
import './TicTacToe.css';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);


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

    const handleClick = async (index) => {
        // end if game is over
        if (winner || board[index]) {
            return;
        }

        // Update the board(square) with the current player's symbol
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        // update winner with newly calculated board
        setWinner(calculateWinner(newBoard));
        // switch the current player
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

        // the await is a hack to allow render square to finish 
        // before querying the dom element squares
        const winnerObject = await calculateWinner(newBoard);
        if (winnerObject) {
            // Animate the winning squares by adding a "winning" class to each square
            const winningSquares = winnerObject["line"];
            winningSquares.forEach((index) => {
                const squareElement = document.querySelector(`.square._${index}`);
                squareElement.classList.add('winning');
            });
        }    
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        const startChar = Math.random() < 0.5 ? "X" : "O";
        setCurrentPlayer(startChar);
        setWinner(null);
    };

    const renderSquare = (index) => {
        // add index for winning squares
        const winningLine = winner ? [board[winner["line"][0]], board[winner["line"][1]], board[winner["line"][2]]] : [];
        const isWinningSquare = winningLine.includes(board[index]);
        return (
            <div
                key={index}
                type="button"
                className={`${isWinningSquare ? `square _${index}` : 'square'}`}
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </div>
        );
    };


    let status;
    if (winner) {
        status = "Winner: " + winner["winner"];
    } else if (board.every((square) => square !== null)) {
        status = "It's a tie!";
    } else {
        status = "Next player: " + currentPlayer;
    }

    return (
        <div className="container container-tictactoe">
            <div className="status">{status}</div>
            <div className="board">
                {board.map((square, index) => renderSquare(index))}
            </div>

            <button onClick={resetBoard}>
                Reset
            </button>
        </div>
    );
};

export default TicTacToe;
