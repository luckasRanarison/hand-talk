import { useModels } from "@/context/models";
import ModelMetadata from "./ModelMetadata";
import { RiInformationFill } from "react-icons/ri";

const RightSidebar = () => {
  const { selectedModelInfo } = useModels();

  return (
    <div
      className="flex min-h-full w-1/4 flex-col
      border-l-[1px] border-gray-300 dark:border-gray-800"
    >
      <div
        className="p-4 flex space-x-2 items-center
      text-blue-600 dark:text-blue-400
        border-b-[1px] border-gray-300 dark:border-gray-800"
      >
        <RiInformationFill />
        <span className="font-semibold">Metadata</span>
      </div>
      <div className="scroll-hidden h-full space-y-3 overflow-scroll p-4">
        {selectedModelInfo && <ModelMetadata data={selectedModelInfo} />}
      </div>
    </div>
  );
};

export default RightSidebar;
