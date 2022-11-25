import React, { useState, useEffect } from "react";
import Square from "./components/Square";

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE: Array<string> = ["", "", "", "", "", "", "", "", ""];

const INITIAL_SCORES: Scores = { X: 0, O: 0 };

const WINNING_COMBOS: Array<Array<number>> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayerInput, setCurrentPlayerInput] = useState("X");
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkForWinner();
  }, [gameState]);

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const handleWin = () => {
    window.alert(`Congrats player ${currentPlayerInput}! You are the winner!`);
    const newPlayerScore = scores[currentPlayerInput] + 1;
    const newScores = { ...scores };
    newScores[currentPlayerInput] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
    resetBoard();
  };

  const handleDraw = () => {
    window.alert("The game ended in a draw");
    resetBoard();
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }
    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayerInput(currentPlayerInput === "X" ? "O" : "X");
  };

  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));
    const currentValue = gameState[cellIndex];
    if (currentValue) return;

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayerInput;
    setGameState(newValues);
  };

  const resetGame = () => {
    setGameState(INITIAL_GAME_STATE);
    setScores(INITIAL_SCORES);
    setCurrentPlayerInput("X");
    localStorage.removeItem("scores");
  };

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
        TicTacToe
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((playerInput, index) => (
            <Square
              key={index}
              onClick={handleCellClick}
              {...{ index, playerInput }}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto w-96 text-2xl text-serif">
        <p className="text-white mt-5">
          Next Player: <span>{currentPlayerInput}</span>
        </p>
        <p className="text-white mt-5">
          Player X score: <span>{scores["X"]}</span>
        </p>
        <p className="text-white mt-5">
          Player O score: <span>{scores["O"]}</span>
        </p>
      </div>
      <div>
        <button onClick={() => resetGame()}>RESET</button>
      </div>
    </div>
  );
};

export default TicTacToe;
