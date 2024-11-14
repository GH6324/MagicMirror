import fs from "fs";
import path from "path";
import archiver from "archiver";
import { exit } from "process";

async function main() {
  const folderPath = path.join("out", "server.dist");
  const zipPath = path.join("out", "server.zip");
  try {
    await zipFolder(folderPath, zipPath);
    console.log("[ZIP Server] ✅ Success");
    exit(0);
  } catch (err) {
    console.error("[ZIP Server] ❌ Failed: ", err);
    exit(1);
  }
}

main();

async function zipFolder(folderPath, zipPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", resolve);
    archive.on("error", reject);
    archive.on("progress", (progress) => {
      const { entries } = progress;
      console.log(`[ZIP Server] Processed: ${entries.processed}`);
    });
    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}
