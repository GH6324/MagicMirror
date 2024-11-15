import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useCallback, useEffect } from "react";
import { Server } from "../services/server";
import { createXStaManager } from "xsta";

type DownloadStatus =
  | "idle"
  | "downloading"
  | "unzipping"
  | "success"
  | "failed";

const kDownloadStates = createXStaManager({
  key: "DownloadStates",
  initialState: {
    status: "idle" as DownloadStatus,
    progress: 0,
    error: null as any,
  },
});

export function useDownload() {
  const [states, setStates] = kDownloadStates.useState();

  useEffect(() => {
    const setupListeners = async () => {
      const download = await listen("download-progress", (event) => {
        const progress = event.payload;
        const states = kDownloadStates.getState();
        if (states.status === "downloading") {
          setStates((states) => {
            states.progress = progress as number;
          });
        }
      });

      const unzip = await listen("unzip-progress", (event) => {
        const progress = event.payload;
        const states = kDownloadStates.getState();
        if (states.status === "downloading") {
          setStates((states) => {
            states.status = "unzipping";
            states.progress = progress as number;
          });
        } else if (states.status === "unzipping") {
          setStates((states) => {
            states.progress = progress as number;
          });
        }
      });

      return { download, unzip };
    };

    let cleanup: (() => void) | undefined;

    setupListeners().then((unlisten) => {
      cleanup = () => {
        unlisten.download();
        unlisten.unzip();
      };
    });

    return () => {
      cleanup?.();
    };
  }, []);

  const download = useCallback(
    async (
      url = "https://github.com/idootop/feiyu-player/releases/download/updater/feiyu_2.0.0_windows_x86_64.nsis.zip"
    ) => {
      try {
        const states = kDownloadStates.getState();
        if (["downloading", "unzipping"].includes(states.status)) {
          return false;
        }
        setStates((states) => {
          states.progress = 0;
          states.status = "downloading";
        });
        await invoke("download_and_unzip", {
          url,
          targetDir: await Server.rootDir(),
        });
        setStates((states) => {
          states.progress = 100;
          states.status = "success";
        });
        return true;
      } catch (error) {
        setStates((states) => {
          states.error = error;
          states.progress = 0;
          states.status = "failed";
        });
        return false;
      }
    },
    []
  );
  return { download, ...states };
}
