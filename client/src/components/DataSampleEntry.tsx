import { useEditor } from "../context/EditorContext";
import DeleteButton from "./DeleteButton";
import type { SampleType } from "../types";

type Props = {
  id: string;
  type: SampleType;
};

const DataSampleEntry = ({ id, type }: Props) => {
  const { selectedSample, setSelectedSample, deleteData } = useEditor();

  return (
    <div
      className={`flex cursor-pointer items-center
      justify-between border-[1px] p-3 rounded-md
      hover:bg-gray-200 hover:border-blue-600 hover:text-blue-600
      ${selectedSample?.id == id ? "border-blue-600" : "border-gray-300"}`}
      onClick={() => setSelectedSample({ id, type })}
    >
      <span
        className={`overflow-x-hidden overflow-ellipsis 
        ${selectedSample?.id == id && "text-blue-600"}`}
      >
        {id}
      </span>
      <div>
        <DeleteButton onClick={() => deleteData(type, id)} />
      </div>
    </div>
  );
};

export default DataSampleEntry;
