import { SquarePen, Trash2, Flag } from "lucide-react";
import type { Task } from "../data/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTaskContext } from "../context/TaskContext";
import { useState } from "react";
import { useNavigate } from "react-router";

const TaskCards = ({ task, colId }: { task?: Task; colId: string }) => {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task?.id || colId });
  const { deleteTask, setCols } = useTaskContext();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    id: task?.id ?? "",
    title: task?.title ?? "",
    description: task?.description ?? "",
    createdBy: task?.createdBy ?? "",
    priority: task?.priority ?? "Low",
    dueDate: task?.dueDate ?? "",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999999999 : 0,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`bg-white p-4 rounded-md shadow-md cursor-pointer`}
      onClick={() => {
        if (!task) return;
        if (isEditorOpen) return;
        navigate(`/task/${task?.id}`);
      }}
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
            <div className="absolute right-0 top-0 flex items-center gap-2 z-[999999]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditorOpen(!isEditorOpen);
                }}
                className="cursor-pointer"
              >
                <SquarePen className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  deleteTask(task.id);
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
          {!isEditorOpen ? (
            <>
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
          ) : (
            <>
              <div className="flex gap-2 items-center mt-2">
                <span className="text-[12px] text-black">title:</span>
                <input
                  value={newTask?.title}
                  onChange={(e) => {
                    setNewTask({ ...newTask, title: e.target.value });
                  }}
                  className="text-[14px] border-1 px-2 rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-1 items-left mt-2">
                <span className="text-[12px] text-black mr-auto">
                  description:
                </span>
                <textarea
                  value={newTask?.description}
                  onChange={(e) => {
                    setNewTask({ ...newTask, description: e.target.value });
                  }}
                  className="text-[14px] border-1 px-2 rounded-sm"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-gray-400 text-[12px] flex items-center gap-2">
                  <span className="text-[12px] text-black">date:</span>
                  <input
                    type="date"
                    value={newTask?.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                    className="text-[14px] border-1 px-2 rounded-sm border-black text-black mr-2"
                  />
                </div>
                <select
                  id="priority"
                  name="selectPriority"
                  value={newTask.priority}
                  onChange={(e) => {
                    setNewTask({
                      ...newTask,
                      priority: e.target.value as Task["priority"],
                    });
                  }}
                  className="text-[14px] border-1 px-2 rounded-sm border-black text-black"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <button
                className="bg-blue-500 text-white w-full py-1 mt-3 rounded-sm cursor-pointer"
                onClick={() => {
                  setCols(newTask, task.id);
                  setIsEditorOpen(false);
                }}
              >
                Save
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default TaskCards;
