import { useState } from "react";
import { useEditor } from "../context/EditorContext";
import Popup from "./Popup";

const InputPopup = (props: { onClose: () => void }) => {
  const { createGesture, gestures } = useEditor();
  const [input, setInput] = useState("");

  const submitGesture = async () => {
    await createGesture(input);
    props.onClose();
  };

  return (
    <Popup>
      <div
        className="flex flex-col justify-center
        space-y-5 rounded-md bg-white p-4"
      >
        <div className="text-center font-semibold text-gray-700">
          <span>New Gesture</span>
        </div>
        <input
          type="text"
          placeholder="Gesture name..."
          className="rounded-md border-[1px] border-gray-300 px-4 py-2
          focus:outline-none"
          value={input}
          maxLength={40}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-x-4">
          <button
            onClick={props.onClose}
            className="rounded-md border-[1px]
            bg-red-300 p-2 text-red-500 font-semibold
            hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={submitGesture}
            className="rounded-md border-[1px]
            bg-blue-300 p-2 text-blue-800 font-semibold
            hover:bg-blue-600 hover:text-white
            disabled:bg-gray-300 disabled:text-gray-600"
            disabled={!input.length || gestures.includes(input)}
          >
            Add
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default InputPopup;
