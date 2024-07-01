import { useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { useEditor } from "@/context/editor";
import CreateButton from "../../common/CreateButton";
import CameraPopup from "../camera/CameraPopup";
import DataSampleEntry from "./DataSampleEntry";

const TrainPanel = () => {
  const { selectedGesture, selectedTrainData } = useEditor();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex h-1/2 flex-col border-b-[1px] border-gray-300">
      <div
        className="flex items-center justify-between
        border-b-[1px] border-gray-300 p-4"
      >
        <div className="flex items-center space-x-2 font-semibold text-green-500">
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
