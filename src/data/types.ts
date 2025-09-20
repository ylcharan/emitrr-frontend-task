// src/lib/data/types.ts
export type Priority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  priority: Priority;
  dueDate: string; // ISO format: YYYY-MM-DD
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export type TaskContextType = {
  columns: Column[];
  addTask: (columnId: string, task: Task) => void;
  moveTask: (
    fromColId: string,
    toColId: string,
    fromId: string,
    toId: string
  ) => void;
  getTaskColumn: (columns: Column[], taskId: string) => string;
  getCols: () => Column[];
  setCols: (task: Task, taskId: string) => void;
  deleteTask: (taskId: string) => void;
};
