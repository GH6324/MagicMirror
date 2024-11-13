import reactLogo from "./assets/react.svg";
import { useServer } from "./hooks/useServer";

import "./App.css";
import { useSwapFace } from "./hooks/useSwapFace";

function App() {
  const { launch, status } = useServer();
  const { isSwapping, output, swapFace } = useSwapFace();

  async function startSwap() {
    swapFace(
      "/Users/del/X/App/AI/MagicMirror/data/input.jpg",
      "/Users/del/X/App/AI/MagicMirror/data/全智贤.jpg"
    );
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form className="row">
        <input
          id="greet-input"
          onChange={(e) => console.log(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        {status !== "started" && <button onClick={launch}>Launch</button>}
        {status === "started" && <button onClick={startSwap}>Swap</button>}
      </form>

      <p>status:{status}</p>
      <p>isSwapping:{isSwapping}</p>
      <p>output:{output}</p>
    </main>
  );
}

export default App;
