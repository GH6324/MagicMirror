import { DragDropEvent, getCurrentWebview } from "@tauri-apps/api/webview";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOS } from "./useOS";

export function useDragDrop(onDrop: (paths: string[]) => void) {
  const ref = useRef<any>(null);
  const [isOverTarget, setIsOverTarget] = useState(false);

  const { isWindows } = useOS();

  const onDropped = useCallback(
    (paths: string[]) => {
      onDrop(paths);
    },
    [onDrop]
  );

  useEffect(() => {
    const withDPR = (p: { x: number; y: number }) => {
      const dpr = isWindows ? window.devicePixelRatio : 1;
      return {
        x: p.x / dpr,
        y: p.y / dpr,
      };
    };

    const checkIsInside = async (event: DragDropEvent) => {
      const targetRect = ref.current?.getBoundingClientRect();
      if (!targetRect || event.type === "leave") {
        return false;
      }
      const position = withDPR(event.position);
      const isInside =
        position.x >= targetRect.left &&
        position.x <= targetRect.right &&
        position.y >= targetRect.top &&
        position.y <= targetRect.bottom;
      return isInside;
    };

    const setupListener = async () => {
      const unlisten = await getCurrentWebview().onDragDropEvent(
        async (event) => {
          const isInside = await checkIsInside(event.payload);
          if (event.payload.type === "over") {
            setIsOverTarget(isInside);
            return;
          }
          if (event.payload.type === "drop" && isInside) {
            onDropped(event.payload.paths);
          }
          setIsOverTarget(false);
        }
      );

      return unlisten;
    };

    let cleanup: (() => void) | undefined;

    setupListener().then((unlisten) => {
      cleanup = unlisten;
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return { isOverTarget, ref };
}
