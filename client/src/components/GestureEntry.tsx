import { useEditor } from "../context/EditorContext";
import DeleteButton from "./DeleteButton";

const GestureEntry = (props: { name: string }) => {
  const { selectedGesture, deleteGesture, setSelectedGesture } = useEditor();

  return (
    <div
      className={`flex cursor-pointer items-center
      justify-between py-3 px-3 border-[1px] rounded-md
      hover:bg-gray-200 hover:border-blue-600 hover:text-blue-600
      ${selectedGesture == props.name ? "border-blue-600" : "border-gray-300"}`}
      onClick={() => setSelectedGesture(props.name)}
    >
      <span
        className={`overflow-x-hidden overflow-ellipsis 
        ${selectedGesture == props.name && "text-blue-600"}`}
      >
        {props.name}
      </span>
      <div>
        <DeleteButton onClick={() => deleteGesture(props.name)} />
      </div>
    </div>
  );
};

export default GestureEntry;
