import { useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { useEditor } from "@/context/editor";
import CreateButton from "../../common/CreateButton";
import CameraPopup from "../camera/CameraPopup";
import SelectableEntry from "@/components/common/SelectableEntry";

const TrainPanel = () => {
  const {
    selectedGesture,
    selectedSample,
    selectedTrainData,
    setSelectedSample,
    deleteData,
  } = useEditor();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex h-1/2 flex-col border-b-[1px] border-gray-300 dark:border-gray-800">
      <div
        className="flex items-center justify-between
        border-b-[1px] border-gray-300 dark:border-gray-800 p-4"
      >
        <div
          className="flex items-center space-x-2
          font-semibold text-blue-600 dark:text-blue-400"
        >
          <RiRobot2Fill />
          <span>Train ({selectedTrainData.length})</span>
        </div>
        <CreateButton
          onClick={() => setShowPopup(true)}
          disabled={!selectedGesture}
        />
      </div>
      <div className="scroll-hidden h-full space-y-3 overflow-scroll p-4">
        {selectedTrainData.map((id) => (
          <SelectableEntry
            key={id}
            selected={selectedSample?.id == id}
            onSelect={() => setSelectedSample({ id, type: "train" })}
            onDelete={() => deleteData("train", id)}
          >
            {id}
          </SelectableEntry>
        ))}
      </div>
      {showPopup && (
        <CameraPopup type="train" onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default TrainPanel;
