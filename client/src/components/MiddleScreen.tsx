import { RiHand, RiImageFill, RiStackFill, RiUserLine } from "react-icons/ri";
import { useEditor } from "../context/EditorContext";
import CoordinateList from "./CoordinateList";
import SampleLabel from "./SampleLabel";
import { useState } from "react";
import ImagePopup from "./ImagePopup";

const MiddleScreen = () => {
  const { selectedSampleValue } = useEditor();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex w-2/4 flex-col gap-y-6 overflow-scroll p-8">
      {selectedSampleValue ? (
        <>
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center space-x-2 self-center
            rounded-md border-[1px] border-blue-600 px-4 py-2
            text-blue-600 hover:bg-gray-200"
          >
            <RiImageFill />
            <span>Source</span>
          </button>
          {showPopup && <ImagePopup onClose={() => setShowPopup(false)} />}
          <SampleLabel icon={RiUserLine} text="Pose" />
          <CoordinateList value={selectedSampleValue.pose} />
          <SampleLabel icon={RiHand} text="Left hand" />
          <CoordinateList value={selectedSampleValue.leftHand} />
          <SampleLabel icon={RiHand} text="Right hand" />
          <CoordinateList value={selectedSampleValue.rightHand} />
        </>
      ) : (
        <div
          className="flex h-full flex-col items-center
          justify-center space-y-4"
        >
          <RiStackFill className="text-gray-600" size={50} />
          <div className="text-xl text-gray-600">No sample selected</div>
        </div>
      )}
    </div>
  );
};

export default MiddleScreen;
