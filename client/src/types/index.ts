export type SampleType = "train" | "test";

export type SampleMetadata = { id: string; type: SampleType };

export type SampleValue = {
  pose: number[];
  leftHand: number[];
  rightHand: number[];
};

export type ModelParams = {
  name: string;
  epochs: number;
  optimizer: string;
  loss: string;
  batch: number;
};

export type EpochStatus = {
  current: number;
  total: number;
};

export type BatchStatus = {
  current: number;
  total: number;
  duration: string;
  step: string;
  accuracy: number;
  loss: number;
};
