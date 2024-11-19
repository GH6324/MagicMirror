import { DragDropEvent, getCurrentWebview } from "@tauri-apps/api/webview";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useCallback, useEffect, useRef, useState } from "react";

export function useDragDrop(onDrop: (paths: string[]) => void) {
  const ref = useRef<any>(null);
  const [isOverTarget, setIsOverTarget] = useState(false);

  const onDropped = useCallback(
    (paths: string[]) => {
      onDrop(paths);
    },
    [onDrop]
  );

  useEffect(() => {
    const checkIsInside = async (event: DragDropEvent) => {
      const targetRect = ref.current?.getBoundingClientRect();
      if (!targetRect || event.type === "leave") {
        return false;
      }
      const factor = await getCurrentWindow().scaleFactor();
      const position = event.position.toLogical(factor);
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
