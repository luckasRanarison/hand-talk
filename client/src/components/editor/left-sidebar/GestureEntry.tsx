import { useEditor } from "@/context/editor";
import DeleteButton from "../../common/DeleteButton";

const GestureEntry = (props: { name: string }) => {
  const { selectedGesture, deleteGesture, setSelectedGesture } = useEditor();

  return (
    <div
      className={`flex cursor-pointer items-center justify-between
      space-x-2 rounded-md border-[1px] px-4 py-3
      hover:border-blue-600 hover:bg-gray-200 hover:text-blue-600
      dark:hover:border-blue-400 dark:hover:bg-gray-900 dark:hover:text-blue-400
      ${
        selectedGesture == props.name
          ? "border-blue-600 dark:border-blue-400"
          : "border-gray-300 dark:border-gray-800"
      }`}
      onClick={() => setSelectedGesture(props.name)}
    >
      <span
        className={`overflow-x-hidden overflow-ellipsis 
        ${selectedGesture == props.name && "text-blue-600 dark:text-blue-400"}`}
      >
        {props.name}
      </span>
      <DeleteButton onClick={() => deleteGesture(props.name)} />
    </div>
  );
};

export default GestureEntry;
