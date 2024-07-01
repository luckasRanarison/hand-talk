import { useEditor } from "@/context/editor";
import type { SampleType } from "@/types";
import DeleteButton from "../../common/DeleteButton";

type Props = {
  id: string;
  type: SampleType;
};

const DataSampleEntry = ({ id, type }: Props) => {
  const { selectedSample, setSelectedSample, deleteData } = useEditor();

  const toggleSelection = () => {
    if (selectedSample?.id == id) {
      setSelectedSample();
    } else {
      setSelectedSample({ id, type });
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center justify-between
      space-x-2 rounded-md border-[1px] px-4 py-3 text-slate-800
      hover:border-blue-600 hover:bg-gray-200 hover:text-blue-600
      ${selectedSample?.id == id ? "border-blue-600" : "border-gray-300"}`}
      onClick={toggleSelection}
    >
      <span
        className={`overflow-x-hidden overflow-ellipsis whitespace-nowrap
        ${selectedSample?.id == id && "text-blue-600"}`}
      >
        {id}
      </span>
      <DeleteButton onClick={() => deleteData(type, id)} />
    </div>
  );
};

export default DataSampleEntry;
