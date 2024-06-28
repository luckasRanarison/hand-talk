import { useState } from "react";
import { RiTestTubeFill } from "react-icons/ri";
import { useEditor } from "../context/EditorContext";
import CreateButton from "./CreateButton";
import CameraPopup from "./CameraPopup";
import DataSampleEntry from "./DataSampleEntry";

const TestPanel = () => {
  const { selectedGesture, selectedTestData } = useEditor();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex h-1/2 flex-col border-b-[1px] border-gray-300">
      <div
        className="flex items-center justify-between
        border-b-[1px] border-gray-300 p-4"
      >
        <div className="flex items-center space-x-2 font-semibold text-blue-600">
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
