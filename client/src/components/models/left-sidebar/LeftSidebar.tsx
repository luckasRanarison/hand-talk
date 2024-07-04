import CreateButton from "@/components/common/CreateButton";
import SelectableEntry from "@/components/common/SelectableEntry";
import { useModels } from "@/context/models";
import { useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import CreatePopup from "./CreatePopup";

const LeftSidebar = () => {
  const { models, selectedModel, setSelectedModel, deleteModel } = useModels();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-1/4 border-r-[1px] border-gray-300 dark:border-gray-800">
      <div
        className="flex items-center justify-between
        border-b-[1px] border-gray-300 p-4 dark:border-gray-800"
      >
        <div className="flex items-center space-x-2 font-semibold">
          <RiRobot2Fill />
          <span className="font-semibold">Models ({models.length})</span>
        </div>
        <CreateButton onClick={() => setShowPopup(true)} />
      </div>
      <div className="scroll-hidden flex flex-col space-y-3 overflow-scroll p-4">
        {models.map((model) => (
          <SelectableEntry
            key={model}
            selected={selectedModel == model}
            onSelect={() => setSelectedModel(model)}
            onDelete={() => deleteModel(model)}
          >
            {model}
          </SelectableEntry>
        ))}
      </div>
      {showPopup && <CreatePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default LeftSidebar;
