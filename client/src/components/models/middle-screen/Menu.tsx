import { useState } from "react";
import { RiVidicon2Line } from "react-icons/ri";
import Recorder from "./Recorder";
import MenuButton from "./MenuButton";

const Menu = ({ model }: { model: string }) => {
  const [isRecording, setIsrecording] = useState(false);

  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <MenuButton
          icon={RiVidicon2Line}
          onClick={() => setIsrecording(true)}
        />
      </div>

      {isRecording && (
        <Recorder model={model} onClose={() => setIsrecording(false)} />
      )}
    </div>
  );
};

export default Menu;
