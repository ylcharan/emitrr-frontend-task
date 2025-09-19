import { CheckCircle, CircleFadingArrowUp, Circle } from "lucide-react";
import TaskCards from "./components/TaskCards";

function App() {
  return (
    <div className="base-wrapper ">
      <h1 className="text-2xl">Board View</h1>
      <div className="grid grid-cols-3 gap-4 mt-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Circle className="w-6 h-6" />
            To Do
          </div>
          <div className="flex flex-col gap-2">
            <TaskCards />
            <TaskCards />
            <TaskCards />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-yellow-500">
            <CircleFadingArrowUp className="w-6 h-6" />
            In Progress
          </div>
          <div className="flex flex-col gap-2">
            <TaskCards />
            <TaskCards />
            <TaskCards />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle className="w-6 h-6" />
            Done
          </div>
          <div className="flex flex-col gap-2">
            <TaskCards />
            <TaskCards />
            <TaskCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
