export function MirrorPage() {
  return (
    <div
      data-tauri-drag-region
      className="w-full h-100vh flex-c-c bg-[#151515]"
    >
      <Mirror />
    </div>
  );
}

const Mirror = () => {
  return (
    <div className="relative w-480px h-480px">
      <img
        src="/images/test-mirror1.png"
        className="absolute w-full h-full object-cover"
        style={{
          maskImage:
            "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 40%)",
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 40%)",
        }}
      />
      <img
        src="/images/test-input.jpg"
        className="rd-50% w-full h-full p-[100px] object-cover"
      />
    </div>
  );
};
