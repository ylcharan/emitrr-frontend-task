import { SquarePen, Trash2, Flag } from "lucide-react";
import type { Task } from "../data/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTaskContext } from "../context/TaskContext";
import { useState } from "react";

const TaskCards = ({ task, colId }: { task?: Task; colId: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task?.id || colId });
  const { deleteTask, getCols } = useTaskContext();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEditorId, setIsEditorId] = useState<string | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 0,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`bg-white p-4 rounded-md shadow-md`}
    >
      {!task ? (
        <div className="p-4 border-2 border-dashed border-gray-300 text-gray-400 rounded-lg text-center cursor-default">
          Drop task here
        </div>
      ) : (
        <>
          <div className={`relative flex items-center justify-between `}>
            <span className="bg-slate-100 text-slate-950 text-[12px] px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              {task?.createdBy}
            </span>
            <div className="absolute right-0 top-0 flex items-center gap-2">
              <button
                onClick={() => {
                  setIsEditorOpen(true);
                  setIsEditorId(task.id);
                }}
                className="cursor-pointer"
              >
                <SquarePen className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => {
                  deleteTask(task.id);
                  console.log(getCols());
                }}
                className="cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>
              <div {...listeners} className="cursor-grab text-xl">
                ⠿
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] text-black mt-2">{task?.title}</h1>
          </div>
          <p className="text-gray-400 text-[14px]">{task?.description}</p>
          <div className="flex items-center justify-between mt-1">
            <div className="text-gray-400 text-[12px] flex items-center">
              <Flag className="mr-1 w-3 h-3" />
              {task?.dueDate}
            </div>
            <span
              className={`${
                task?.priority === "High"
                  ? "bg-red-50 text-red-500"
                  : task?.priority === "Medium"
                  ? "bg-yellow-50 text-yellow-500"
                  : "bg-green-50 text-green-500"
              } text-[12px] px-2 py-0.5 rounded-full`}
            >
              {task?.priority}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
export default TaskCards;
