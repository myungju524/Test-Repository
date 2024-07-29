import "./App.css";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <header>
        <h4> 🙏 소원을 빌어주세요</h4>
        <button>로그아웃</button>
      </header>
      <section>
        <SignIn />
      </section>
    </div>
  );
}

export default App;
