import React from "react";
import myImg from "./assets/dice-blue-1.svg";
import yourImg from "./assets/dice-red-2.svg";
import Dice from "./Dice";

function Board({ name, color, gameHistory }) {
  //   console.log(props);
  //   const sum = gameHistory.reduce((a, b) => a + b, 0);
  const sum = gameHistory.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  return (
    <div className="App-board">
      <h2>{name}</h2>
      <Dice color={color} num={gameHistory[gameHistory.length - 1]} />
      <h2>총점</h2>
      <p>{sum}</p>
      <h2>기록</h2>
      <p>{gameHistory.join(", ")}</p>
    </div>
  );
}

export default Board;
