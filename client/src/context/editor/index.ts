import { SampleValue, SampleMetadata, SampleType } from "@/types";
import { createContext, useContext } from "react";

type Context = {
  gestures: string[];
  selectedGesture?: string;
  selectedSample?: SampleMetadata;
  selectedSampleValue?: SampleValue;
  selectedTestData: string[];
  selectedTrainData: string[];
  setSelectedGesture: (name: string) => void;
  setSelectedSample: (data: SampleMetadata) => void;
  fetchGestures: () => Promise<void>;
  createGesture: (name: string) => Promise<void>;
  deleteGesture: (name: string) => Promise<void>;
  submitImage: (blob: Blob, type: SampleType) => Promise<void>;
  deleteData: (type: SampleType, id: string) => Promise<void>;
};

const EditorContext = createContext({} as Context);

const useEditor = () => useContext(EditorContext);

export { useEditor, EditorContext };
