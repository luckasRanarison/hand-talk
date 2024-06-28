import { RiRobot2Fill } from "react-icons/ri";
import { useEditor } from "../context/EditorContext";
import CreateButton from "./CreateButton";
import CameraPopup from "./CameraPopup";
import { useState } from "react";
import DataSampleEntry from "./DataSampleEntry";

const TrainPanel = () => {
  const { selectedGesture, selectedTrainData } = useEditor();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex flex-col h-1/2 border-b-[1px] border-gray-300 p-4 pb-0">
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-semibold text-green-500">
          <RiRobot2Fill />
          <span>Train ({selectedTrainData.length})</span>
        </div>
        <CreateButton
          onClick={() => setShowPopup(true)}
          disabled={!selectedGesture}
        />
      </div>
      <div className="h-full space-y-3 overflow-scroll scroll-hidden">
        {selectedTrainData.map((id) => (
          <DataSampleEntry key={id} id={id} type="train" />
        ))}
      </div>
      {showPopup && (
        <CameraPopup type="train" onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default TrainPanel;
