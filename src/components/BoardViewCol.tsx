// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Ellipsis, Plus } from "lucide-react";
import TaskCards from "./TaskCards";
import type { Column } from "../data/types";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const BoardViewCol = ({ column }: { column: Column }) => {
  return (
    <div className="flex flex-col gap-4 bg-[#F6F8FA] p-4 rounded-md">
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
        <SortableContext
          items={column.tasks}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <TaskCards key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
export default BoardViewCol;
