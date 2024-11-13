import { Child, Command } from "@tauri-apps/plugin-shell";
import { homeDir, join } from "@tauri-apps/api/path";

export type ServerStatus = "idle" | "launching" | "started" | "stopped";

export interface Task {
  id: string;
  inputImage: string;
  targetFace: string;
}

class _Server {
  _baseURL = "http://127.0.0.1:8023";
  _childProcess?: Child;

  async rootDir() {
    const home = await homeDir();
    return join(home, "MagicMirror");
  }

  async launch(): Promise<boolean> {
    if (this._childProcess) {
      return true;
    }
    try {
      this._childProcess = await Command.create("server").spawn();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async kill(): Promise<boolean> {
    if (!this._childProcess) {
      return true;
    }
    try {
      await this._childProcess.kill();
      return true;
    } catch {
      return false;
    }
  }

  async status(): Promise<boolean> {
    try {
      const res = await fetch(`${this._baseURL}/status`, {
        method: "get",
      });
      const data = await res.json();
      return data.status === "started";
    } catch {
      return false;
    }
  }

  async prepare(): Promise<boolean> {
    try {
      const res = await fetch(`${this._baseURL}/prepare`, {
        method: "post",
      });
      const data = await res.json();
      return data.success || false;
    } catch {
      return false;
    }
  }

  async createTask(task: Task): Promise<string | null> {
    try {
      const res = await fetch(`${this._baseURL}/task`, {
        method: "post",
        body: JSON.stringify(task),
      });
      const data = await res.json();
      return data.result || null;
    } catch {
      return null;
    }
  }

  async cancelTask(taskId: string): Promise<boolean> {
    try {
      const res = await fetch(`${this._baseURL}/task/${taskId}`, {
        method: "delete",
      });
      const data = await res.json();
      return data.success || false;
    } catch {
      return false;
    }
  }
}

export const Server = new _Server();
