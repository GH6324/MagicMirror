import { useState } from "react";
import { useDragDrop } from "./hooks/useDragDrop";
import { convertFileSrc } from "@tauri-apps/api/core";

export function ImagePreview() {
  const [src, setSrc] = useState("");
  const { ref } = useDragDrop((paths) => {
    setSrc(convertFileSrc(paths[0]));
  });

  return (
    <div ref={ref} className="w-200px h-200px bg-pink">
      <img src={src} className="w-full h-full object-cover" />
    </div>
  );
}
