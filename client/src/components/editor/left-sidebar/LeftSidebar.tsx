import { useState } from "react";
import { RiDatabase2Fill } from "react-icons/ri";
import { useEditor } from "@/context/editor";
import CreateButton from "@/components/common/CreateButton";
import InputPopup from "./InputPopup";
import SelectableEntry from "@/components/common/SelectableEntry";

const LeftSidebar = () => {
  const { gestures, selectedGesture, setSelectedGesture, deleteGesture } =
    useEditor();

  const [showInput, setShowInput] = useState(false);

  return (
    <div className="flex w-1/4 flex-col border-r-[1px] border-r-gray-300 dark:border-gray-800">
      <div
        className="flex items-center justify-between
        border-b-[1px] border-gray-300 p-4 dark:border-gray-800"
      >
        <div className="flex items-center space-x-2 font-semibold">
          <RiDatabase2Fill />
          <span>Gestures ({gestures.length})</span>
        </div>
        <CreateButton onClick={() => setShowInput(true)} />
      </div>
      <div className="scroll-hidden flex flex-col space-y-3 overflow-scroll p-4">
        {gestures.map((name) => (
          <SelectableEntry
            key={name}
            selected={selectedGesture == name}
            onSelect={() => setSelectedGesture(name)}
            onDelete={() => deleteGesture(name)}
          >
            {name}
          </SelectableEntry>
        ))}
      </div>
      {showInput && <InputPopup onClose={() => setShowInput(false)} />}
    </div>
  );
};

export default LeftSidebar;
