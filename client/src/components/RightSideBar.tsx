import TestPanel from "./TestPanel";
import TrainPanel from "./TrainPanel";

const RightSidebar = () => (
  <div
    className="flex min-h-full w-1/4 flex-col
    border-l-[1px] border-l-gray-300"
  >
    <TrainPanel />
    <TestPanel />
  </div>
);

export default RightSidebar;
