import { createContext, useContext, useState, useMemo } from "react";
import type { Column, Task, TaskContextType } from "../data/types";
import { dummyData } from "../data/dummyData";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>(dummyData);

  const newId = () => {
    const existingIds = columns.flatMap((col) => col.tasks.map((t) => t.id));
    let maxId = 0;
    for (const id of existingIds) {
      const num = parseInt(id.replace("task-", ""), 10);
      if (!isNaN(num) && num > maxId) {
        maxId = num;
      }
    }
    return `task-${maxId + 1}`;
  };

  const getCols = () => columns;

  const setCols = (task: Task, taskId: string) => {
    setColumns((prevCols) =>
      prevCols.map((col) => {
        return {
          ...col,
          tasks: col.tasks.map((t) => {
            if (t.id === taskId) {
              return { ...task };
            }
            return t;
          }),
        };
      })
    );
  };

  const addTask = (columnId: string, task: Task) => {
    setColumns((prev) =>
      prev.map((c) =>
        c.id === columnId
          ? { ...c, tasks: [{ ...task, id: newId() }, ...c.tasks] }
          : c
      )
    );
  };

  const getTaskColumn = (
    columnsArr: Column[],
    taskOrColumnId: string
  ): string => {
    // if the id looks like a column id, return it (convention: 'col-')
    if (taskOrColumnId.startsWith("col-")) return taskOrColumnId;

    for (const col of columnsArr) {
      if (col.tasks.find((t) => t.id === taskOrColumnId)) return col.id;
    }
    return "";
  };

  const moveTask = (
    fromColId: string,
    toColId: string,
    activeId: string,
    overId?: string
  ) => {
    if (!fromColId) return;

    setColumns((prevCols) => {
      // clone so we don't mutate React state directly
      const newCols = prevCols.map((c) => ({ ...c, tasks: [...c.tasks] }));

      const fromCol = newCols.find((c) => c.id === fromColId);
      const toCol = newCols.find((c) => c.id === toColId);
      if (!fromCol || !toCol) return prevCols;

      const fromIndex = fromCol.tasks.findIndex((t) => t.id === activeId);
      if (fromIndex === -1) return prevCols;

      // remove the moved task from source
      const [movedTask] = fromCol.tasks.splice(fromIndex, 1);

      // SAME COLUMN REORDER
      if (fromColId === toColId) {
        // if overId is a column id or absent -> append to end
        if (!overId || overId.startsWith("col-")) {
          toCol.tasks.push(movedTask);
        } else {
          const overIndex = toCol.tasks.findIndex((t) => t.id === overId);

          // if not found -> append
          if (overIndex === -1) {
            toCol.tasks.push(movedTask);
          } else {
            // adjustment for downward moves (because we already removed the item)
            // place after the 'over' item to match expected UX
            if (overIndex >= fromIndex) {
              toCol.tasks.splice(overIndex + 1, 0, movedTask);
            } else {
              toCol.tasks.splice(overIndex, 0, movedTask);
            }
            // arrayMove(toCol.tasks, fromIndex, overIndex);
          }
        }
      } else {
        // CROSS-COLUMN MOVE
        // if dropped onto the column itself (empty area), append
        if (!overId || overId.startsWith("col-")) {
          toCol.tasks.push(movedTask);
        } else {
          const overIndex = toCol.tasks.findIndex((t) => t.id === overId);
          if (overIndex === -1) {
            toCol.tasks.push(movedTask);
          } else {
            // insert *before* the over item for cross-column (you can tweak to insert after)
            if (overIndex >= fromIndex) {
              toCol.tasks.splice(overIndex + 1, 0, movedTask);
            } else {
              toCol.tasks.splice(overIndex, 0, movedTask);
            }
          }
        }
      }

      return newCols;
    });
  };

  const deleteTask = (taskId: string) => {
    setColumns((prevCols) =>
      prevCols.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  const value = useMemo(
    () => ({
      columns,
      addTask,
      moveTask,
      getTaskColumn,
      getCols,
      setCols,
      deleteTask,
    }),
    [columns]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
