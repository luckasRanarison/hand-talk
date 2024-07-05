import PopupWrapper from "@/components/common/PopupWrapper";
import Spinner from "@/components/common/Spinner";
import { createCanvas } from "@/utils";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  model: string;
  onClose: () => void;
};

const Recorder = ({ model, onClose }: Props) => {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useMemo(createCanvas, []);
  const ctx = useMemo(() => canvas.getContext("2d")!, [canvas]);
  const [socket, setSocket] = useState<WebSocket>();
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [intervalId, setIntervalId] = useState<number>();
  const [label, setLabel] = useState("");

  const startStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    video.current!.srcObject = stream;

    initSocket();
  };

  const initSocket = () => {
    const ws = new WebSocket(`ws://localhost:8000/api/models/predict/${model}`);

    ws.onopen = () => setIsSocketOpen(true);
    ws.onmessage = ({ data }) => setLabel(data);

    setSocket(ws);
  };

  const recordFrames = () => {
    if (video.current && isSocketOpen) {
      ctx.drawImage(video.current, 0, 0, 640, 480);
      canvas.toBlob(sendFrame);
    }
  };

  const sendFrame = (blob: Blob | null) => {
    if (socket && blob) socket.send(blob);
  };

  const stopRecorder = () => {
    if (socket) socket.close();
    if (intervalId) clearInterval(intervalId);
    onClose();
  };

  useEffect(() => {
    startStream();
  }, []);

  useEffect(() => {
    // TODO: Implement move sequence recording and find a better streaming strategy
    if (isSocketOpen) setIntervalId(setInterval(recordFrames, 1000));
  }, [isSocketOpen]);

  return (
    <PopupWrapper onClick={stopRecorder}>
      {!isSocketOpen && <Spinner />}

      <div className="relative flex justify-center">
        <video
          autoPlay
          ref={video}
          hidden={!isSocketOpen}
          className="scale-x-[-1] rounded-md"
          disablePictureInPicture={true}
          controls={false}
        ></video>
        <div className="px-2 absolute top-10 text-2xl text-white bg-black">
          {label}
        </div>
      </div>
    </PopupWrapper>
  );
};

export default Recorder;
