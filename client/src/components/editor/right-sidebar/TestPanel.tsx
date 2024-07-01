import { useState } from "react";
import { RiTestTubeFill } from "react-icons/ri";
import { useEditor } from "@/context/editor";
import CreateButton from "../../common/CreateButton";
import CameraPopup from "../camera/CameraPopup";
import DataSampleEntry from "./DataSampleEntry";

const TestPanel = () => {
  const { selectedGesture, selectedTestData } = useEditor();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex h-1/2 flex-col">
      <div
        className="flex items-center justify-between
        border-b-[1px] border-gray-300 dark:border-gray-800 p-4"
      >
        <div
          className="flex items-center space-x-2
          font-semibold text-blue-600 dark:text-blue-400"
        >
          <RiTestTubeFill />
          <span>Test ({selectedTestData.length})</span>
        </div>
        <CreateButton
          onClick={() => setShowPopup(true)}
          disabled={!selectedGesture}
        />
      </div>
      <div className="scroll-hidden flex flex-col space-y-3 overflow-scroll p-4">
        {selectedTestData.map((id) => (
          <DataSampleEntry key={id} id={id} type="test" />
        ))}
      </div>
      {showPopup && (
        <CameraPopup type="test" onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default TestPanel;
