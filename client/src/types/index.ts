export type SampleType = "train" | "test";

export type SampleMetadata = { id: string; type: SampleType };

export type SampleValue = {
  pose: number[];
  leftHand: number[];
  rightHand: number[];
};
