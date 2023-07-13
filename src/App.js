import React, { useState, useEffect } from "react";
import "./App.css";
import Square from "./Component/Square";
import { Patterns } from "./Patterns";
import WinnerScreen from "./WinnerScreen";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("🔵");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkWin();
    checkIfTie();
    setPlayer((prevPlayer) => (prevPlayer === "✖️" ? "🔵" : "✖️"));
  }, [board]);


  // useEffect(() => {
  //   if (result.state !== "none") {
  //     // Game finished, perform any necessary actions

  //     // Example: Change screen background color based on the winner
  //     const rootElement = document.documentElement;
  //     if (result.winner === "✖️") {
  //       rootElement.style.backgroundColor = "red";
  //     } else if (result.winner === "🔵") {
  //       rootElement.style.backgroundColor = "yellow";
  //     }
  //   }
  // }, [result]);

  const handleClick = (square) => {
    setBoard((prevBoard) => {
      return prevBoard.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }
        return val;
      });
    });
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("🔵");
    setResult({ winner: "none", state: "none" });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });
    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };


  return (
    <div className="App">
      <div className="board">
        <h1 className="title">
          Let's Play <br /> Noughts And Crosses Duel
        </h1>
        <div className="row">
          <Square chooseSquare={() => handleClick(0)} val={board[0]} />
          <Square chooseSquare={() => handleClick(1)} val={board[1]} />
          <Square chooseSquare={() => handleClick(2)} val={board[2]} />
        </div>
        <div className="row">
          <Square chooseSquare={() => handleClick(3)} val={board[3]} />
          <Square chooseSquare={() => handleClick(4)} val={board[4]} />
          <Square chooseSquare={() => handleClick(5)} val={board[5]} />
        </div>
        <div className="row">
          <Square chooseSquare={() => handleClick(6)} val={board[6]} />
          <Square chooseSquare={() => handleClick(7)} val={board[7]} />
          <Square chooseSquare={() => handleClick(8)} val={board[8]} />
        </div>
      </div>
      {result.state !== "none" && (
        <WinnerScreen restartGame={restartGame} playerWon={result.winner} />
      )}
    </div>
  );
}

export default App;
