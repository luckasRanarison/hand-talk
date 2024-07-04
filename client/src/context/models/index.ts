import { createContext, useContext } from "react";

type Context = {
  models: string[];
  selectedModel?: string;
  selectedModelInfo?: Record<string, any>; // FIXME
  setSelectedModel: (name: string) => void;
  addModel: (name: string) => void;
  deleteModel: (name: string) => void;
  fetchModels: () => void;
};

const ModelContext = createContext({} as Context);

const useModels = () => useContext(ModelContext);

export { ModelContext, useModels };
