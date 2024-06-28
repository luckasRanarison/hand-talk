import api from "../api";
import { createContext, useContext, useEffect, useState } from "react";
import type { SampleMetadata, SampleType, SampleValue } from "../types";

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

const EditorContextProvider = (props: { children: React.ReactNode }) => {
  const [gestures, setGestures] = useState<string[]>([]);
  const [selectedGesture, setSelectedGesture] = useState<string>();
  const [selectedSample, setSelectedSample] = useState<SampleMetadata>();
  const [selectedSampleValue, setSelectedSampleValue] = useState<SampleValue>();
  const [selectedTestData, setSelectedTestData] = useState<string[]>([]);
  const [selectedTrainData, setSelectedTrainData] = useState<string[]>([]);

  const fetchGestures = () =>
    api.getGestures().then((value) => {
      setGestures(value);
      setSelectedGesture(value[0]);
    });

  const createGesture = (name: string) =>
    api.createGesture(name).then(() => {
      setGestures((prev) => [...prev, name]);
      setSelectedGesture(name);
    });

  const deleteGesture = (name: string) =>
    api.deleteGesture(name).then(() => {
      setGestures((prev) => prev.filter((v) => v != name));
      setSelectedGesture(undefined);
    });

  const submitImage = (blob: Blob, type: SampleType) =>
    api.submitImage(blob, selectedGesture!, type).then(({ id }) => {
      if (type == "train") setSelectedTrainData((prev) => [...prev, id]);
      if (type == "test") setSelectedTestData((prev) => [...prev, id]);
    });

  const deleteData = (type: SampleType, id: string) =>
    api.deleteGestureData(selectedGesture!, type, id).then(() => {
      const setData =
        type == "train" ? setSelectedTrainData : setSelectedTestData;
      setData((prev) => prev.filter((value) => value != id));
      setSelectedSample(undefined);
    });

  useEffect(() => {
    if (selectedGesture) {
      api.getGestureData(selectedGesture).then((value) => {
        setSelectedTrainData(value.train);
        setSelectedTestData(value.test);
      });
    } else {
      setSelectedTrainData([]);
      setSelectedTestData([]);
    }

    setSelectedSample(undefined);
  }, [selectedGesture]);

  useEffect(() => {
    if (selectedSample) {
      api
        .getSampleData(selectedGesture!, selectedSample.type, selectedSample.id)
        .then((value) => setSelectedSampleValue(value));
    } else {
      setSelectedSampleValue(undefined);
    }
  }, [selectedSample]);

  const value = {
    gestures,
    selectedGesture,
    setSelectedGesture,
    selectedSample,
    setSelectedSample,
    selectedSampleValue,
    selectedTestData,
    selectedTrainData,
    fetchGestures,
    createGesture,
    deleteGesture,
    submitImage,
    deleteData,
  };

  return (
    <EditorContext.Provider value={value}>
      {props.children}
    </EditorContext.Provider>
  );
};

const useEditor = () => useContext(EditorContext);

export { useEditor, EditorContextProvider };
