import { useEffect, useMemo, useState } from "react";
import { useModels } from "@/context/models";
import Spinner from "@/components/common/Spinner";
import type { BatchStatus, EpochStatus } from "@/types";
import ProgressBar from "@/components/common/ProgressBar";

type Props = {
  model: string;
  socket: WebSocket;
  onClose: () => void;
};

const TrainingProgress = ({ model, socket, onClose }: Props) => {
  const { addModel } = useModels();
  const [epochStatus, setEpochStatus] = useState<EpochStatus>();
  const [batchStatus, setBatchStatus] = useState<BatchStatus>();
  const [endTime, setEndTime] = useState<number>();
  const startTime = useMemo(() => Date.now(), []);

  const cancelTraining = () => {
    socket.close();
    onClose();
  };

  useEffect(() => {
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.epoch) setEpochStatus(data.epoch);
      if (data.batch) setBatchStatus(data.batch);
    };

    socket.onclose = (e) => {
      if (e.code == 1000) {
        addModel(model);
        setEndTime(Date.now());
      }
    };
  }, []);

  return (
    <div className="min-w-56 flex flex-col items-center space-y-6">
      {epochStatus && batchStatus ? (
        <div className="w-80 flex flex-col space-y-3">
          <div className="w-full flex justify-between">
            <div>Epochs</div>
            <div>
              {epochStatus.current}/{epochStatus.total}
            </div>
          </div>
          <ProgressBar
            current={epochStatus.current}
            total={epochStatus.total}
          />
          <div className="w-full flex justify-between">
            <div>Batch ({batchStatus.step}/step)</div>
            <div>
              {batchStatus.current}/{batchStatus.total}
            </div>
          </div>
          <ProgressBar
            current={batchStatus.current}
            total={batchStatus.total}
          />
          <div>
            Accuracy: {batchStatus.accuracy * 100}%, Loss: {batchStatus.loss}
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center space-y-4">
          <Spinner />
          <div>Initializing</div>
        </div>
      )}
      {endTime && (
        <div>
          Completed in{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {(endTime - startTime) / 1000}s
          </span>
        </div>
      )}
      <button
        onClick={cancelTraining}
        className="w-full rounded-md border-[1px]
        border-red-600 p-2 text-red-600
        dark:border-red-400 dark:text-red-400"
      >
        {endTime ? "Close" : "Cancel"}
      </button>
    </div>
  );
};

export default TrainingProgress;
