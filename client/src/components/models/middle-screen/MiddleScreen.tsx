import { useModels } from "@/context/models";
import { RiRobot3Fill } from "react-icons/ri";
import Menu from "./Menu";

const MiddleScreen = () => {
  const { selectedModel } = useModels();

  return (
    <div className="flex flex-col w-2/4">
      {selectedModel ? (
        <Menu model={selectedModel} />
      ) : (
        <div
          className="flex h-full flex-col items-center
          justify-center space-y-4"
        >
          <RiRobot3Fill size={50} />
          <div className="text-xl">No model selected</div>
        </div>
      )}
    </div>
  );
};

export default MiddleScreen;
