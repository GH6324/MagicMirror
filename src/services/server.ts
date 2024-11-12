export interface Task {
  id: string;
  inputImage: string;
  targetFace: string;
}

class _Server {
  baseURL = "http://127.0.0.1:8023";

  async start(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseURL}/start`, {
        method: "post",
      });
      const data = await res.json();
      return data.success || false;
    } catch {
      return false;
    }
  }

  async prepare(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseURL}/prepare`, {
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
      const res = await fetch(`${this.baseURL}/task`, {
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
      const res = await fetch(`${this.baseURL}/task/${taskId}`, {
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
