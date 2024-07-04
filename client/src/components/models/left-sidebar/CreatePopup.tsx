import { useState } from "react";
import PopupWrapper from "@/components/common/PopupWrapper";
import ModelForm from "./ModelForm";
import TrainingProgress from "./TrainingProgress";

const CreatePopup = ({ onClose }: { onClose: () => void }) => {
  const [socket, setSocket] = useState<WebSocket>();
  const [modelName, setModelName] = useState("");

  return (
    <PopupWrapper>
      <div
        className="flex flex-col justify-center
        space-y-5 rounded-md border-[1px] bg-white
        p-4 dark:border-gray-800 dark:bg-slate-950"
      >
        {socket ? (
          <TrainingProgress model={modelName} socket={socket} onClose={onClose} />
        ) : (
          <ModelForm onClose={onClose} initSocket={setSocket} initName={setModelName} />
        )}
      </div>
    </PopupWrapper>
  );
};

export default CreatePopup;
