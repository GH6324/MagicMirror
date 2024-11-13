import { useServer } from "./hooks/useServer";

import "./App.css";
import { useSwapFace } from "./hooks/useSwapFace";
import { useEffect, useState } from "react";
import { Server } from "./services/server";

function App() {
  const { status, launch, kill } = useServer();
  const { isSwapping, output, swapFace } = useSwapFace();

  const [rootDir, setRootDir] = useState("");

  useEffect(() => {
    Server.rootDir().then((e) => setRootDir(e));
  }, []);

  async function startSwap() {
    swapFace(
      "/Users/del/X/App/AI/MagicMirror/data/input.jpg",
      "/Users/del/X/App/AI/MagicMirror/data/全智贤.jpg"
    );
  }

  return (
    <main className="container">
      <h1>MagicMirror ✨</h1>

      {status === "idle" && <button onClick={launch}>Launch</button>}
      {status === "launching" && <button onClick={kill}>Launching...</button>}
      {status === "running" && <button onClick={startSwap}>Swap</button>}

      {status === "launching" && <p>首次加载比较缓慢，请耐心等待...</p>}

      <p>rootDir:{rootDir}</p>
      <p>status:{status}</p>
      <p>isSwapping:{`${isSwapping}`}</p>
      <p>output:{`${output}`}</p>
    </main>
  );
}

export default App;
