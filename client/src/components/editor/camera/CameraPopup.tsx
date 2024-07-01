import { useEffect, useMemo, useRef, useState } from "react";
import { useEditor } from "@/context/editor";
import PopupWrapper from "../../common/PopupWrapper";
import CameraControls from "./CameraControls";
import type { SampleType } from "@/types";

type Props = {
  type: SampleType;
  onClose: () => void;
};

const createCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 480;
  return canvas;
};

const CameraPopup = ({ type, onClose }: Props) => {
  const { selectedGesture, submitImage } = useEditor();
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useMemo(createCanvas, []);
  const ctx = useMemo(() => canvas.getContext("2d")!, [canvas]);
  const [delay, setDelay] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState<number>();

  const startStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (video.current!.srcObject = stream));
  };

  const updateDelay = () => {
    if (delay == 0) setDelay(3);
    if (delay == 3) setDelay(5);
    if (delay == 5) setDelay(8);
    if (delay == 8) setDelay(0);
  };

  const captureFrame = () => {
    setTimeout(() => {
      ctx.drawImage(video.current!, 0, 0, 640, 480);
      canvas.toBlob(sendImage);
    }, delay * 1000);

    setCountdown(delay);
  };

  const sendImage = (blob: Blob | null) => {
    if (!blob) throw new Error("Failed to convert canvas to blob");
    else submitImage(blob, type);
  };

  useEffect(() => {
    startStream();
  }, []);

  useEffect(() => {
    if (intervalId) return;

    const id = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(id);
        setIntervalId(undefined);
      } else {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);

    setIntervalId(id);
  }, [countdown, intervalId]);

  return (
    <PopupWrapper>
      <div
        className="relative flex flex-col
        items-center justify-center
        overflow-hidden rounded-md bg-white"
      >
        <video
          ref={video}
          className="scale-x-[-1]"
          disablePictureInPicture={true}
          controls={false}
          autoPlay
        />

        <div
          className="absolute top-6 z-10
          text-2xl font-semibold text-white"
        >
          {selectedGesture}
        </div>

        {countdown > 0 ? (
          <div className="absolute z-10 text-6xl font-bold text-white">
            {countdown}
          </div>
        ) : (
          <CameraControls
            delay={delay}
            onClickDelay={updateDelay}
            onClickCapture={captureFrame}
            onClickExit={onClose}
          />
        )}
      </div>
    </PopupWrapper>
  );
};

export default CameraPopup;
