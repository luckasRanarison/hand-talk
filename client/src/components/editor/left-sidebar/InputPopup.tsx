import { useState } from "react";
import { useEditor } from "@/context/editor";
import PopupWrapper from "../../common/PopupWrapper";

const InputPopup = (props: { onClose: () => void }) => {
  const { createGesture, gestures } = useEditor();
  const [input, setInput] = useState("");

  const submitGesture = async () => {
    await createGesture(input);
    props.onClose();
  };

  return (
    <PopupWrapper>
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
          value={input}
          autoFocus
          maxLength={40}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.code == "Enter" && submitGesture()}
          className="rounded-md border-[1px] border-gray-300 px-4 py-2
          focus:outline-none"
        />
        <div className="grid grid-cols-2 gap-x-4">
          <button
            onClick={props.onClose}
            className="rounded-md border-[1px]
            border-red-600 p-2 text-red-600"
          >
            Cancel
          </button>
          <button
            onClick={submitGesture}
            className="rounded-md border-[1px]
            border-blue-600 p-2 text-blue-800
            disabled:border-gray-600 disabled:text-gray-600"
            disabled={!input.length || gestures.includes(input)}
          >
            Add
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default InputPopup;
