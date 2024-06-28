import config from "../config";
import { useEditor } from "../context/EditorContext";
import Popup from "./Popup";

const ImagePopup = (props: { onClose: () => void }) => {
  const { selectedGesture, selectedSample } = useEditor();

  return (
    <Popup onClick={props.onClose}>
      <img
        src={`${config.serverUrl}/api/images/${selectedGesture}/${
          selectedSample!.type
        }/${selectedSample!.id}`}
        alt="sample image"
        className="rounded-md"
      />
    </Popup>
  );
};

export default ImagePopup;
