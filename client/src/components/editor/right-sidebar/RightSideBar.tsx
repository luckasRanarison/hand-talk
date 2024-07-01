import TestPanel from "./TestPanel";
import TrainPanel from "./TrainPanel";

const RightSidebar = () => (
  <div
    className="flex min-h-full w-1/4 flex-col
    border-l-[1px] border-gray-300 dark:border-gray-800"
  >
    <TrainPanel />
    <TestPanel />
  </div>
);

export default RightSidebar;
