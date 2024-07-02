import { useState } from "react";
import "./App.css";
import HandIcon from "./HandIcon";
import "./HandIcon.css";
import reset from "./assets/ic-reset.svg";
import HandButton from "./HandButton";
import { compareHand, generateRandomHand } from "./utils";

function getResult(comparison) {
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  const [hand, setHand] = useState("rock");
  const [otherHand, setOtherHand] = useState("rock");
  const [score, setScore] = useState(0);
  const [otherScore, SetOtherScore] = useState(0);
  const [bet, setBet] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [isWin, setIsWin] = useState(0);

  const handleButtonClick = (value) => {
    setHand(value);
    const nextOtherHand = generateRandomHand();
    setOtherHand(nextOtherHand);

    const comparison = compareHand(value, nextOtherHand);
    setIsWin(comparison);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) SetOtherScore(otherScore + bet);
    const result = getResult(comparison);
    setGameHistory([...gameHistory, result]);
  };
  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };
  const handClearClick = () => {
    setHand("rock");
    setOtherHand("rock");
    setScore(0);
    SetOtherScore(0);
    setBet(1);
    setGameHistory([]);
    setIsWin(0);
  };
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img className="App-reset" src={reset} onClick={handClearClick} />
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">{score}</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">{otherScore}</div>
          <div className="Score-name">상대</div>
        </div>
      </div>
      <div className="Box App-box">
        <div className="App-hands">
          <div
            className={`Hand ${isWin == 0 ? "" : isWin == 1 ? "Winner" : ""}`}
          >
            <HandIcon value={hand} className="Hand-icon" />
          </div>
          <div className="App-versus">VS</div>
          <div
            className={`Hand ${isWin == 0 ? "" : isWin == 1 ? "" : "Winner"}`}
          >
            <HandIcon value={otherHand} className="Hand-icon" />
          </div>
        </div>
        <div className="App-bet">
          <span>배점</span>
          <input
            type="number"
            min={1}
            max={9}
            value={bet}
            onChange={handleBetChange}
          />
          <span>배</span>
        </div>
        <div className="App-history">
          <h2>승부기록</h2>
          <p>{gameHistory.join(", ")}</p>
        </div>
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
