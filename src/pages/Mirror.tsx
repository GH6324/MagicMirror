import { useDragDrop } from "@/hooks/useDragDrop";
import { convertFileSrc } from "@tauri-apps/api/core";
import { useEffect, useRef, useState } from "react";

import styles from "@/styles/mirror.module.css";

import background from "@/assets/images/mirror-bg.webp";
import mirrorInput from "@/assets/images/mirror-input.webp";
import mirrorMe from "@/assets/images/mirror-me.webp";
import { useSwapFace } from "@/hooks/useSwapFace";
import { t } from "i18next";

interface Asset {
  path: string;
  src: string;
}

const kMirrorStates: {
  isMe: boolean;
  me?: Asset;
  input?: Asset;
  result?: Asset;
} = { isMe: true };

export function MirrorPage() {
  const [flag, setFlag] = useState(false);
  const rebuild = useRef<any>();
  rebuild.current = () => setFlag(!flag);

  const { isSwapping, swapFace } = useSwapFace();
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (kMirrorStates.me && !kMirrorStates.input) {
        kMirrorStates.isMe = false;
        rebuild.current();
      }
      if (kMirrorStates.me && isSwapping) {
        kMirrorStates.isMe = false;
        rebuild.current();
      }
    });
  }, [kMirrorStates.me, kMirrorStates.input, isSwapping]);

  const { ref } = useDragDrop(async (paths) => {
    const src = convertFileSrc(paths[0]);
    if (kMirrorStates.isMe) {
      kMirrorStates.me = {
        src,
        path: paths[0],
      };
      rebuild.current();
    } else {
      kMirrorStates.input = {
        src,
        path: paths[0],
      };
      rebuild.current();
    }

    if (kMirrorStates.me && kMirrorStates.input) {
      kMirrorStates.result = undefined;
      rebuild.current();
      const result = await swapFace(
        kMirrorStates.input.path,
        kMirrorStates.me.path
      );
      setSuccess(result != null);
      if (result) {
        kMirrorStates.result = {
          src: convertFileSrc(result),
          path: result,
        };
        rebuild.current();
      }
    }
  });

  const isReady = kMirrorStates.me && kMirrorStates.input;
  const tips = kMirrorStates.isMe
    ? t("First, drag your front-facing photo into the mirror.")
    : !isReady
    ? t("Then, drag the photo you want to swap faces with into the mirror.")
    : isSwapping
    ? t("Face swapping... This may take a few seconds, please wait.")
    : success
    ? t("Face swap successful! Image saved locally.")
    : t("Face swap failed. Try a different image.");

  return (
    <div className="w-100vw h-100vh p-40px">
      <div
        ref={ref}
        data-tauri-drag-region
        className="relative w-full h-full"
        onClick={() => {
          kMirrorStates.isMe = !kMirrorStates.isMe;
          rebuild.current();
        }}
      >
        <div className="absolute top-[-40px] w-full flex-c-c c-white z-10">
          <p className="bg-black p-[4px_8px]">{tips}</p>
        </div>
        <img
          data-tauri-drag-region
          src={kMirrorStates.isMe ? mirrorMe : mirrorInput}
          className="absolute w-full h-full object-cover z-3"
          style={{
            maskImage:
              "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 40%)",
            WebkitMaskImage:
              "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 40%)",
          }}
        />
        <div
          className="w-full h-full flex-c-c"
          style={{
            padding: kMirrorStates.isMe ? "120px" : "100px",
          }}
        >
          <div className={styles["mirror-preview"]}>
            <div className={styles["preview-container"]}>
              <img
                data-tauri-drag-region
                src={
                  kMirrorStates.isMe
                    ? kMirrorStates.me?.src || background
                    : kMirrorStates.result?.src ||
                      kMirrorStates.input?.src ||
                      background
                }
                className="rd-50% w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
