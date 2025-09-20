import { Ellipsis, Plus } from "lucide-react";
import TaskCards from "./TaskCards";
import type { Column } from "../data/types";
import { useDroppable } from "@dnd-kit/core";

const BoardViewCol = ({ column }: { column: Column }) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-[#F6F8FA] p-4 rounded-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`${
              column.title === "To Do"
                ? "bg-gray-400"
                : column.title === "In Progress"
                ? "bg-yellow-500"
                : "bg-green-500"
            } w-3 h-3 rounded-full`}
          ></div>
          {column.title}{" "}
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[12px]">
            {column.tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Ellipsis />
          <Plus />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {column.tasks.length === 0 && <TaskCards colId={column.id} />}
        {/* <SortableContext items={column.tasks}> */}
        {column.tasks.map((task) => (
          <TaskCards key={task.id} task={task} colId={column.id} />
        ))}
        {/* </SortableContext> */}
        {/* <SortableContext
        items={column.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3 min-h-[80px]">
          {column.tasks.length > 0 ? (
            column.tasks.map((task) => <TaskCards key={task.id} task={task} />)
          ) : (
            <div className="p-4 border-2 border-dashed border-gray-300 text-gray-400 rounded-lg text-center">
              Drop task here
            </div>
          )}
        </div>
      </SortableContext> */}
      </div>
    </div>
  );
};
export default BoardViewCol;
