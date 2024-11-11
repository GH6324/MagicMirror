import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    ["flex-c", "flex items-center"],
    ["flex-c-c", "flex items-center justify-center "],
    ["flex-c-sb", "flex items-center justify-between "],
    ["flex-col-c", "flex flex-col items-center"],
    ["flex-col-c-c", "flex flex-col items-center justify-center"],
    ["flex-col-c-sb", "flex flex-col items-center justify-between"],
  ],
});
