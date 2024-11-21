import { Menu, Submenu } from "@tauri-apps/api/menu";
import { TrayIcon } from "@tauri-apps/api/tray";

import { useEffect } from "react";
import pkg from "../../package.json";
import { Image } from "@tauri-apps/api/image";

import appIcon from "@/assets/images/app-icon.png";
import trayIcon from "@/assets/images/tray-icon.png";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { t } from "i18next";
import { exit } from "@tauri-apps/plugin-process";
import { type } from "@tauri-apps/plugin-os";

export function useTrayMenu() {
  useEffect(() => {
    initMenu();
    initTrayMenu();
  }, []);
}

async function initMenu() {
  if (type() === "windows") {
    return;
  }
  const aboutMenu = await Submenu.new({
    text: "About",
    items: [
      {
        id: "about",
        text: t("About"),
        item: {
          About: {
            icon: await getAppIcon(appIcon),
            name: "MagicMirror",
            shortVersion: "",
            version: pkg.version,
            authors: [pkg.author.name],
            comments: pkg.description,
            website: pkg.homepage,
            copyright: `© ${new Date().getFullYear()} ${pkg.author.name}`,
            license: pkg.license,
          },
        },
      },
    ],
  });

  const menu = await Menu.new({
    items: [aboutMenu],
  });

  menu.setAsAppMenu();
}

async function initTrayMenu() {
  await TrayIcon.new({
    icon: await getAppIcon(type() === "macos" ? trayIcon : appIcon),
    action: (event) => {
      switch (event.type) {
        case "Click":
          getCurrentWindow().show();
          break;
      }
    },
    menu: await Menu.new({
      items: [
        {
          id: "quit",
          text: t("Quit"),
          action: () => {
            exit(0);
          },
        },
      ],
    }),
  });
}

async function getAppIcon(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  return Image.fromBytes(arrayBuffer);
}
