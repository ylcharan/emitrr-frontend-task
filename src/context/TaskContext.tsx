import { createContext, useContext, useState, useMemo } from "react";
import type { Column, Task, TaskContextType } from "../data/types";
import { arrayMove } from "@dnd-kit/sortable";
import { dummyData } from "../data/dummyData";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>(dummyData);

  const addTask = (columnId: string, task: Task) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const getTaskColumn = (columns: Column[], taskId: string): string => {
    for (const col of columns) {
      if (col.tasks.find((task) => task.id === taskId)) {
        return col.id;
      }
    }
    return "";
  };

  const getTaskPosition = (tasks: Task[], taskId: string): number => {
    return tasks.findIndex((task) => task.id === taskId);
  };

  const moveTask = (colId: string, fromId: string, toId: string) => {
    if (fromId === toId) return;

    const newCols = columns.map((col) => {
      if (col.id !== colId) return col;
      const fromPos: number = getTaskPosition(col.tasks, fromId);
      const toPos: number = getTaskPosition(col.tasks, toId);

      return {
        ...col,
        tasks: arrayMove(col.tasks, fromPos, toPos),
      };
    });
    setColumns(newCols);
  };

  const value = useMemo(
    () => ({
      columns,
      addTask,
      moveTask,
      getTaskColumn,
      getTaskPosition,
    }),
    [columns]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
