import { Plus } from "lucide-react";
import TaskCards from "./TaskCards";
import type { Column, Task } from "../data/types";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const BoardViewCol = ({ column }: { column: Column }) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  const [sortBy, setSortBy] = useState<"date" | "priority" | "none">("none");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { addTask } = useTaskContext();
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    createdBy: "",
    priority: "Low",
    dueDate: "",
  });
  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-[#F6F8FA] p-4 rounded-md min-h-screen"
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
          <span className="text-gray-900 text-[10px] uppercase">Sort by: </span>
          <button
            onClick={() => {
              setSortBy("date");
              column.tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
              console.log("sorted by date", column.tasks);
            }}
            className={`${
              sortBy === "date" ? "text-gray-900" : "text-gray-400"
            } text-[10px] uppercase cursor-pointer `}
          >
            Date
          </button>
          <button
            onClick={() => {
              setSortBy("priority");
              const priorityOrder = { High: 1, Medium: 2, Low: 3 };
              column.tasks.sort(
                (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
              );
            }}
            className={`${
              sortBy === "priority" ? "text-gray-900" : "text-gray-400"
            } text-[10px] uppercase cursor-pointer`}
          >
            Priority
          </button>
          <button
            onClick={() => setIsAddingTask(true)}
            className="text-gray-400 cursor-pointer"
          >
            <Plus />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {column.tasks.length === 0 && <TaskCards colId={column.id} />}
        {isAddingTask && (
          <div className="p-4 border-2 border-dashed border-gray-300 text-gray-400 rounded-lg text-center bg-white">
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
            <div className="flex flex-col gap-1 w-full items-left mt-2">
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
            <div className="flex items-center justify-between mt-3">
              <input
                type="text"
                placeholder="created by"
                className="text-[14px] border-1 px-2 rounded-sm border-black text-black"
                onChange={(e) =>
                  setNewTask({ ...newTask, createdBy: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white w-full py-1 mt-3 rounded-sm cursor-pointer"
                onClick={() => {
                  addTask(column.id, newTask);
                  setIsAddingTask(false);
                }}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white w-full py-1 mt-3 rounded-sm cursor-pointer"
                onClick={() => {
                  setNewTask({
                    id: "",
                    title: "",
                    description: "",
                    createdBy: "",
                    priority: "Low",
                    dueDate: "",
                  });
                  setIsAddingTask(false);
                }}
              >
                Discard
              </button>
            </div>
          </div>
        )}
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
