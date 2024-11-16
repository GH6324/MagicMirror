import { useServer } from "./hooks/useServer";

import { useEffect, useState } from "react";
import "./App.css";
import { ImagePreview } from "./ImagePreview";
import { useDownload } from "./hooks/useDownload";
import { useOS } from "./hooks/useOS";
import { useSwapFace } from "./hooks/useSwapFace";
import { Server } from "./services/server";

function App() {
  const { status, launch, kill } = useServer();
  const { isSwapping, output, swapFace, cancel } = useSwapFace();

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

  const { os, arch } = useOS();

  const { status: downloadStatus, progress, download, error } = useDownload();

  return (
    <main className="page">
      <h1>MagicMirror ✨</h1>

      <ImagePreview />

      {status === "idle" && <button onClick={launch}>Launch</button>}
      {status === "launching" && <button onClick={kill}>Launching...</button>}
      {status === "running" && <button onClick={startSwap}>Swap</button>}
      {isSwapping && <button onClick={cancel}>Swapping...</button>}

      {status === "launching" && <p>首次加载较慢，请耐心等待...</p>}

      <button onClick={() => download()}>下载测试</button>

      <p>isDownloaded:{`${downloadStatus === "success"}`}</p>
      <p>downloadStatus:{downloadStatus}</p>
      <p>progress:{progress.toFixed(2)}</p>
      <p>error:{`${error}`}</p>

      <p>os:{os}</p>
      <p>arch:{arch}</p>

      <p>rootDir:{rootDir}</p>

      <p>status:{status}</p>
      <p>isSwapping:{`${isSwapping}`}</p>
      <p>output:{`${output}`}</p>
    </main>
  );
}

export default App;
