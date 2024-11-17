import { ImagePreview } from "@/components/ImagePreview";
import { useDownload } from "@/hooks/useDownload";
import { useOS } from "@/hooks/useOS";
import { useServer } from "@/hooks/useServer";
import { useSwapFace } from "@/hooks/useSwapFace";
import { Server } from "@/services/server";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function ExamplePage() {
  const { status, launch, kill } = useServer();
  const { isSwapping, output, swapFace, cancel } = useSwapFace();

  const [rootDir, setRootDir] = useState("");

  const { t } = useTranslation();

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
    <main className="flex-col-c">
      <h1>MagicMirror ✨</h1>

      <LanguageSwitcher />

      <p>{t("welcome")}</p>
      <p>{t("greeting", { name: "Del Wang" })}</p>

      <ImagePreview />

      {status === "idle" && <button onClick={launch}>Launch</button>}
      {status === "launching" && <button onClick={kill}>Launching...</button>}
      {status === "running" && !isSwapping && (
        <button onClick={startSwap}>Swap</button>
      )}
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
