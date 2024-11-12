import { useCallback, useRef, useState } from "react";
import { Server } from "../services/server";

export function useSwapFace() {
  const id = useRef(0);
  const cancelPrevious = useRef<VoidFunction | null>(null);

  const [isSwapping, setIsSwapping] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const swapFace = useCallback(
    async (inputImage: string, targetFace: string) => {
      if (cancelPrevious.current) {
        await cancelPrevious.current();
      }
      setIsSwapping(true);
      const taskId = (id.current++).toString();
      cancelPrevious.current = () => Server.cancelTask(taskId);
      const result = await Server.createTask({
        id: taskId,
        inputImage,
        targetFace,
      });
      cancelPrevious.current = null;
      setOutput(result);
      setIsSwapping(false);
      return result;
    },
    []
  );

  return { swapFace, isSwapping, output };
}
