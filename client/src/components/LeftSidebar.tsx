import { useEffect, useState } from "react";
import { useEditor } from "../context/EditorContext";
import { RiMenu2Fill } from "react-icons/ri";
import GestureEntry from "./GestureEntry";
import InputPopup from "./InputPopup";
import CreateButton from "./CreateButton";

const LeftSidebar = () => {
  const { gestures, fetchGestures } = useEditor();
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fetchGestures();
  }, []);

  return (
    <div className="flex w-1/4 flex-col border-r-[1px] border-r-gray-300 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-semibold text-gray-800">
          <RiMenu2Fill />
          <span>Gestures ({gestures.length})</span>
        </div>
        <CreateButton onClick={() => setShowInput(true)} />
      </div>
      {showInput && <InputPopup onClose={() => setShowInput(false)} />}
      <div className="scroll-hidden flex flex-col space-y-3 overflow-scroll">
        {gestures.map((name) => (
          <GestureEntry key={name} name={name} />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
