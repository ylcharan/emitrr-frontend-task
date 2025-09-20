import { useParams } from "react-router";
import { useTaskContext } from "../context/TaskContext";
import { ChevronLeft } from "lucide-react";

const TaskDetails = () => {
  const { taskId } = useParams(); // taskId comes from the URL
  const { getCols } = useTaskContext();

  const task = getCols()
    .flatMap((col) => col.tasks)
    .find((t) => t.id === taskId);

  return (
    <div className="bg-[#F6F8FA]">
      <div className="base-wrapper ">
        <div className="flex gap-5 items-center">
          <button
            className="p-2 flex items-center justify-center cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-8 h-8 text-white rounded-full bg-black" />
          </button>
          <h1 className="text-2xl">Task Details - {taskId}</h1>
        </div>
        {task ? (
          <div className="flex flex-col gap-4 mt-[100px] w-full max-w-md mx-auto p-4 shadow-lg rounded-md bg-white">
            <h2 className="text-xl">{task.title}</h2>
            <p>{task.description}</p>
            <p>
              <strong>Due Date:</strong> {task.dueDate}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Created By:</strong> {task.createdBy}
            </p>
          </div>
        ) : (
          <p>Task not found</p>
        )}
      </div>
    </div>
  );
};
export default TaskDetails;
