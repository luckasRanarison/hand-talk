import config from "@/config";
import { useEditor } from "@/context/editor";
import PopupWrapper from "../../common/PopupWrapper";

const ImagePopup = (props: { onClose: () => void }) => {
  const { selectedGesture, selectedSample } = useEditor();

  return (
    <PopupWrapper onClick={props.onClose}>
      <img
        src={`${config.serverUrl}/api/images/${selectedGesture}/${
          selectedSample!.type
        }/${selectedSample!.id}`}
        alt="sample image"
        className="rounded-md"
      />
    </PopupWrapper>
  );
};

export default ImagePopup;
