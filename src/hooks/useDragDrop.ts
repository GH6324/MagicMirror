import { DragDropEvent, getCurrentWebview } from "@tauri-apps/api/webview";
import { MutableRefObject, useCallback, useEffect, useState } from "react";

export function useDragDrop(
  ref: MutableRefObject<HTMLElement | null>,
  onDrop: (paths: string[]) => void
) {
  const [isOverTarget, setIsOverTarget] = useState(false);

  const onDropped = useCallback(
    (paths: string[]) => {
      onDrop(paths);
    },
    [onDrop]
  );

  useEffect(() => {
    const checkIsInside = async (event: DragDropEvent) => {
      const topLeft = await getCurrentWebview().position();
      const targetRect = ref.current?.getBoundingClientRect();
      if (!targetRect || event.type === "leave") {
        return false;
      }
      const isInside =
        event.position.x >= topLeft.x + targetRect.left &&
        event.position.x <= topLeft.x + targetRect.right &&
        event.position.y >= topLeft.y + targetRect.top &&
        event.position.y <= topLeft.y + targetRect.bottom;
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
            onDropped(event.payload.paths); // todo 防抖，短时间内会收到 2 次事件
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

  return { isOverTarget };
}
