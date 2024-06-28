import { useEffect, useState } from "react";
import { useEditor } from "../context/EditorContext";
import { RiDatabase2Fill } from "react-icons/ri";
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
    <div className="flex w-1/4 flex-col border-r-[1px] border-r-gray-300">
      <div
        className="flex items-center justify-between
        border-b-[1px] border-gray-300 p-4"
      >
        <div className="flex items-center space-x-2 font-semibold text-slate-700">
          <RiDatabase2Fill />
          <span>Gestures ({gestures.length})</span>
        </div>
        <CreateButton onClick={() => setShowInput(true)} />
      </div>
      <div className="scroll-hidden flex flex-col space-y-3 overflow-scroll p-4">
        {gestures.map((name) => (
          <GestureEntry key={name} name={name} />
        ))}
      </div>
      {showInput && <InputPopup onClose={() => setShowInput(false)} />}
    </div>
  );
};

export default LeftSidebar;
