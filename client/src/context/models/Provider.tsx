import { useState, useEffect } from "react";
import { ModelContext } from "./";
import api from "@/api";

const ModelContextProvider = (props: { children: React.ReactNode }) => {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>();
  const [selectedModelInfo, setSelectedModelInfo] =
    useState<Record<string, any>>();

  const fetchModels = () =>
    api.getModels().then((value) => {
      setModels(value);
      setSelectedModel(value[0]);
    });

  const deleteModel = (name: string) =>
    api.deleteModel(name).then(() => {
      setModels((prev) => prev.filter((v) => v != name));
      setSelectedModel(undefined);
    });

  const addModel = (name: string) => setModels((prev) => [...prev, name]);

  useEffect(() => {
    if (selectedModel && models.includes(selectedModel)) {
      api
        .getModelInfo(selectedModel)
        .then((value) => setSelectedModelInfo(value));
    } else {
      setSelectedModelInfo(undefined);
    }
  }, [selectedModel]);

  const value = {
    models,
    selectedModel,
    selectedModelInfo,
    setSelectedModel,
    addModel,
    fetchModels,
    deleteModel,
  };

  return (
    <ModelContext.Provider value={value}>
      {props.children}
    </ModelContext.Provider>
  );
};

export default ModelContextProvider;
