import { useCallback, useEffect } from "react";
import { Server, ServerStatus } from "../services/server";
import { useXState, XSta } from "xsta";
import { sleep } from "../services/utils";

const kStatusKey = "serverStatus";

export function useServer() {
  const [status, setStatus] = useXState<ServerStatus>(kStatusKey, "idle");

  const kill = useCallback(async () => {
    await Server.kill();
    setStatus("idle");
  }, []);

  const launch = useCallback(async () => {
    if (status === "launching") {
      return;
    }
    const success = await Server.launch();
    if (!success) {
      setStatus("stopped");
      return false;
    }
    while (XSta.get(kStatusKey) === "launching") {
      const launched = await Server.status();
      if (launched) {
        setStatus("started");
        return true;
      }
      await sleep(100);
    }
  }, []);

  useEffect(() => {
    return () => {
      kill();
    };
  }, []);

  return { status, launch, kill };
}
