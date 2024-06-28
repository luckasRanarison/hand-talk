import { useEditor } from "../context/EditorContext";
import DeleteButton from "./DeleteButton";

const GestureEntry = (props: { name: string }) => {
  const { selectedGesture, deleteGesture, setSelectedGesture } = useEditor();

  return (
    <div
      className={`flex cursor-pointer items-center justify-between
      space-x-2 rounded-md border-[1px] px-4 py-3 text-slate-800
      hover:border-blue-600 hover:bg-gray-200 hover:text-blue-600
      ${selectedGesture == props.name ? "border-blue-600" : "border-gray-300"}`}
      onClick={() => setSelectedGesture(props.name)}
    >
      <span
        className={`overflow-x-hidden overflow-ellipsis 
        ${selectedGesture == props.name && "text-blue-600"}`}
      >
        {props.name}
      </span>
      <DeleteButton onClick={() => deleteGesture(props.name)} />
    </div>
  );
};

export default GestureEntry;
