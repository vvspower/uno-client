import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import PlayersOnline from "./components/HomePage/PlayersOnline/PlayersOnline";

function App() {
  return (
    <div className="App">
      {
        (window.BeforeUnloadEvent = function (e) {
          alert("test");
        })
      }
      {sessionStorage.getItem("token") ? (
        <HomePage />
      ) : (
        <h1 style={{ color: "#e9ecef" }}>Please login</h1>
      )}
    </div>
  );
}

export default App;
