import {
  RiCamera2Line,
  RiCloseLine,
  RiNumber3,
  RiNumber5,
  RiNumber8,
  RiTimerLine,
} from "react-icons/ri";

type Props = {
  delay: number;
  onClickDelay: () => void;
  onClickCapture: () => void;
  onClickExit: () => void;
};

const CameraControls = (props: Props) => (
  <div className="absolute bottom-6 space-x-8 text-white text-xl">
    <button
      className="rounded-full bg-gray-600 p-3"
      onClick={props.onClickDelay}
    >
      <RiTimerLine />
    </button>
    <button
      className="rounded-full bg-blue-600 p-3"
      onClick={props.onClickCapture}
    >
      {props.delay == 0 && <RiCamera2Line />}
      {props.delay == 3 && <RiNumber3 />}
      {props.delay == 5 && <RiNumber5 />}
      {props.delay == 8 && <RiNumber8 />}
    </button>
    <button className="rounded-full bg-red-600 p-3" onClick={props.onClickExit}>
      <RiCloseLine />
    </button>
  </div>
);

export default CameraControls;
