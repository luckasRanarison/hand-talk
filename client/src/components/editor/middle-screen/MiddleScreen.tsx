import { RiStackFill } from "react-icons/ri";
import { useEditor } from "@/context/editor";
import SampleData from "./SampleData";

const MiddleScreen = () => {
  const { selectedSampleValue } = useEditor();

  return (
    <div className="flex w-2/4 flex-col gap-y-6 overflow-scroll p-8">
      {selectedSampleValue ? (
        <SampleData value={selectedSampleValue} />
      ) : (
        <div
          className="flex h-full flex-col items-center
          justify-center space-y-4"
        >
          <RiStackFill size={50} />
          <div className="text-xl">No sample selected</div>
        </div>
      )}
    </div>
  );
};

export default MiddleScreen;
