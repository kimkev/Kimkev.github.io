import React, { useState } from "react";

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

  const renderSquare = (index) => {
    return (
      <div
        style={{
          width: "100px",
          height: "100px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          fontWeight: "bold",
        }}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "300px",
        height: "300px",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      {board.map((square, index) => renderSquare(index))}
    </div>
  );
};

export default TicTacToe;
