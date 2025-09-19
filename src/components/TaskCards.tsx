// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Ellipsis, Flag } from "lucide-react";
import type { Task } from "../data/types";

const TaskCards = ({ task }: { task: Task }) => {
  return (
    <div className="border p-4 rounded-md w-full bg-[#fff] gap-1 border-gray-200">
      <div className="flex items-center justify-between">
        <span className="bg-slate-100 text-slate-950 text-[12px] px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          {task.createdBy}
        </span>
        <Ellipsis />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] text-black mt-2">{task.title}</h1>
      </div>
      <p className="text-gray-400 text-[14px]">{task.description}</p>
      <div className="flex items-center justify-between mt-1">
        <div className="text-gray-400 text-[12px] flex items-center">
          <Flag className="mr-1 w-3 h-3" />
          {task.dueDate}
        </div>
        <span
          className={`${
            task.priority === "High"
              ? "bg-red-50 text-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-50 text-yellow-500"
              : "bg-green-50 text-green-500"
          } text-[12px] px-2 py-0.5 rounded-full`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
};
export default TaskCards;
