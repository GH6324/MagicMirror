import banner from "@/assets/images/magic-mirror.svg";

export function SplashPage() {
  return (
    <div data-tauri-drag-region className="w-full h-full bg-black">
      <img
        src={banner}
        className="w-full h-full object-cover cursor-default pointer-events-none"
      />
    </div>
  );
}
