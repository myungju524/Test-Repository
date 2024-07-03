import { useState } from "react";
import "./App.css";
import reset from "./assets/ic-reset.svg";
import myGame from "./assets/rock.svg";
import otherGame from "./assets/rock.svg";
import gameZone from "./GameZone";
function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  const [myScore, setMyScore] = useState(1);
  const [otherScore, setOtherScore] = useState(1);

  return (
    <div className="App">
      <div>
        <h2 className="App-title">가위바위보</h2>
        <img src={reset} />
        <div className="score">
          <h1 className="myScore">0&nbsp;:</h1>
          <h1 className="otherScore">&nbsp;0</h1>
        </div>
        <div className="game-zone">
          <img className="myGame" src={myGame} /> vs
        </div>
        <div className="point">
          배점 <input type="number" />배
        </div>
        <div className="scoreHistory">승부기록</div>
        <button className="rock">주먹</button>
        <button className="sissor">가위</button>
        <button className="paper">보</button>
      </div>
    </div>
  );
}

export default App;
