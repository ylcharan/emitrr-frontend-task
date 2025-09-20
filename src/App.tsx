import { SortableContext } from "@dnd-kit/sortable";
import BoardViewCol from "./components/BoardViewCol";
import { useTaskContext } from "./context/TaskContext";
import type { Column } from "./data/types";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { restrictToWindowEdges } from "@dnd-kit/modifiers";

function App() {
  const { columns, moveTask, getTaskColumn } = useTaskContext();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  return (
    <div className="base-wrapper relative">
      <h1 className="text-2xl">Board View</h1>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToWindowEdges]}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (!over) return;

          const activeId = active.id as string;
          const overId = over.id as string;
          const fromColId = getTaskColumn(columns, active.id as string);
          let toColId: string;
          if (overId.startsWith("col-")) {
            toColId = overId;
          } else {
            toColId = getTaskColumn(columns, overId);
          }

          if (activeId === overId) return;
          console.log({ fromColId, toColId, activeId, overId });

          moveTask(fromColId, toColId, activeId, overId);
        }}
        onDragOver={(event) => {
          const { active, over } = event;

          const activeId = active.id as string;
          const overId = over?.id as string;
          const fromColId = getTaskColumn(columns, activeId);
          const toColId = getTaskColumn(columns, overId || "");
          console.log({ fromColId, toColId, activeId, overId });
          if (activeId === overId) return;

          moveTask(fromColId, toColId, activeId, overId);
        }}
        collisionDetection={closestCorners}
      >
        {/* <SortableContext
          items={columns.map((col) => {
            for (const task of col.tasks) {
              return task.id;
            }
            return col.id;
          })}
        > */}
        <div className="grid grid-cols-3 gap-10 mt-10">
          {columns.map((column: Column) =>
            column ? (
              <SortableContext
                key={column.id}
                items={column.tasks.map((task) => task.id)}
              >
                <BoardViewCol key={column.id} column={column} />
              </SortableContext>
            ) : null
          )}
        </div>
        {/* </SortableContext> */}

        {/* <div className="flex flex-col gap-4 bg-[#F6F8FA] p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              In Progress
            </div>
            <div className="flex items-center gap-2">
              <Ellipsis />
              <Plus />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <TaskCards />
            <TaskCards />
            <TaskCards />
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-[#F6F8FA] p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Done
            </div>
            <div className="flex items-center gap-2">
              <Ellipsis />
              <Plus />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <TaskCards />
            <TaskCards />
            <TaskCards />
          </div>
        </div> */}
      </DndContext>
    </div>
  );
}

export default App;
