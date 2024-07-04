import { useState } from "react";
import { useModels } from "@/context/models";
import type { ModelParams } from "@/types";

type Props = {
  initName: (name: string) => void;
  initSocket: (ws: WebSocket) => void;
  onClose: () => void;
};

const inputClass = `w-full border-b-[1px] border-b-gray-300 bg-transparent
focus:outline-none dark:border-b-gray-800`;

const Form = (props: Props) => {
  const { models } = useModels();
  const [name, setName] = useState("");
  const [batch, setBatch] = useState(1);
  const [epochs, setEpochs] = useState(5);
  const [optimizer, setOptimizer] = useState("adam");
  const [loss, setLoss] = useState("categorical_crossentropy");

  const submitModel = () => {
    const socket = new WebSocket("ws://localhost:8000/api/models/create");

    socket.onopen = () => {
      const params: ModelParams = {
        name,
        epochs,
        batch,
        optimizer,
        loss,
      };

      socket.send(JSON.stringify(params));
      props.initName(params.name);
      props.initSocket(socket);
    };
  };

  return (
    <>
      <div className="font-semibold text-center">New model</div>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            placeholder="Model"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex space-x-2">
          <label htmlFor="epochs">Epochs:</label>
          <input
            id="epochs"
            type="number"
            value={epochs}
            min={1}
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="flex space-x-2">
          <label htmlFor="batch">Batch:</label>
          <input
            id="batch"
            type="number"
            value={batch}
            min={1}
            onChange={(e) => setBatch(parseInt(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="flex space-x-2">
          <label htmlFor="optimizer">Optimizer:</label>
          <select
            id="optimizer"
            onChange={(e) => setOptimizer(e.target.value)}
            className="bg-transparent"
          >
            <option value="adam">adam</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <label htmlFor="loss">Loss:</label>
          <select
            id="loss"
            onChange={(e) => setLoss(e.target.value)}
            className="bg-transparent"
          >
            <option value="categorical_crossentropy">
              categorical crossentropy
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <button
          onClick={props.onClose}
          className="rounded-md border-[1px]
          border-red-600 p-2 text-red-600
          dark:border-red-400 dark:text-red-400"
        >
          Cancel
        </button>
        <button
          onClick={submitModel}
          disabled={!name.length || !epochs || !batch || models.includes(name)}
          className="rounded-md border-[1px]
          border-blue-600 p-2 text-blue-800
          disabled:border-gray-600 disabled:text-gray-600
          dark:border-blue-400 dark:text-blue-400"
        >
          Create
        </button>
      </div>
    </>
  );
};

export default Form;
