import BoardViewCol from "./components/BoardViewCol";
import { dummyData } from "./data/dummyData";
import type { Column } from "./data/types";

function App() {
  const data = dummyData;
  return (
    <div className="base-wrapper ">
      <h1 className="text-2xl">Board View</h1>
      <div className="grid grid-cols-3 gap-10 mt-10">
        {data.map((column: Column) => (
          <BoardViewCol key={column.id} column={column} />
        ))}

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
      </div>
    </div>
  );
}

export default App;
