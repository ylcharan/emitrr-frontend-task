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
