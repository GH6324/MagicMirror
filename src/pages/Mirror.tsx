import { useDragDrop } from "@/hooks/useDragDrop";
import { convertFileSrc } from "@tauri-apps/api/core";
import { useState } from "react";

import styles from "@/styles/mirror.module.css";

import bg from "@/assets/images/bg.svg";
import mirror from "@/assets/images/mirror.webp";

export function MirrorPage() {
  const [src, setSrc] = useState(bg);
  const { ref } = useDragDrop((paths) => {
    setSrc(convertFileSrc(paths[0]));
  });

  return (
    <div ref={ref} data-tauri-drag-region className="relative w-100vw h-100vh">
      <img
        data-tauri-drag-region
        src={mirror}
        className="absolute w-full h-full object-cover z-3"
        style={
          src
            ? {
                maskImage:
                  "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 40%)",
                WebkitMaskImage:
                  "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 40%)",
              }
            : undefined
        }
      />
      <div className="w-full h-full flex-c-c p-[140px]">
        {src && (
          <div className={styles["mirror-preview"]}>
            <div className={styles["preview-container"]}>
              <img
                data-tauri-drag-region
                src={src}
                className="rd-50% w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
