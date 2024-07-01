import { useState } from "react";
import { RiImageFill } from "react-icons/ri";
import type { SampleValue } from "@/types";
import SampleLabel from "./SampleLabel";
import CoordinateList from "./CoordinateList";
import ImagePopup from "./ImagePopup";
import { IoHandLeft, IoHandRight, IoPerson } from "react-icons/io5";

const SampleData = (props: { value: SampleValue }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="flex items-center space-x-2 self-center
        rounded-md border-[1px] border-blue-600 px-4 py-2
        dark:border-blue-400 dark:text-blue-400
        text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        <RiImageFill />
        <span>Source</span>
      </button>
      {showPopup && <ImagePopup onClose={() => setShowPopup(false)} />}
      <SampleLabel icon={IoPerson} text="Pose" />
      <CoordinateList value={props.value.pose} />
      <SampleLabel icon={IoHandRight} text="Left hand" />
      <CoordinateList value={props.value.leftHand} />
      <SampleLabel icon={IoHandLeft} text="Right hand" />
      <CoordinateList value={props.value.rightHand} />
    </>
  );
};

export default SampleData;
