import BoardViewCol from "./components/BoardViewCol";
import { useTaskContext } from "./context/TaskContext";
import type { Column } from "./data/types";
import { DndContext, closestCorners } from "@dnd-kit/core";

function App() {
  const { columns, moveTask, getTaskColumn } = useTaskContext();

  return (
    <div className="base-wrapper ">
      <h1 className="text-2xl">Board View</h1>
      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event;
          console.log(event);
          if (active.id === over?.id) return;
          moveTask(
            getTaskColumn(columns, active.id as string),
            active.id as string,
            over?.id as string
          );
        }}
        collisionDetection={closestCorners}
      >
        <div className="grid grid-cols-3 gap-10 mt-10">
          {columns.map((column: Column) =>
            column ? <BoardViewCol key={column.id} column={column} /> : null
          )}
        </div>

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
