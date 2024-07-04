import axios from "axios";
import config from "../config";
import type { SampleType, SampleValue } from "../types";

const client = axios.create({ baseURL: config.serverUrl + "/api" });

async function getGestures(): Promise<string[]> {
  const res = await client.get("/gestures");
  return res.data;
}

function renameGesture(oldName: string, newName: string) {
  return client.patch(`/gestures/${oldName}`, { name: newName });
}

function createGesture(name: string) {
  return client.post(`/gestures/${name}`);
}

function deleteGesture(name: string) {
  return client.delete(`/gestures/${name}`);
}

async function getGestureData(
  name: string
): Promise<{ train: string[]; test: string[] }> {
  const res = await client.get(`/data/${name}`);
  return res.data;
}

async function getSampleData(
  name: string,
  type: SampleType,
  id: string
): Promise<SampleValue> {
  const { data } = await client.get(`/data/${name}/${type}/${id}`);
  const value = {
    pose: data.pose,
    leftHand: data.left_hand,
    rightHand: data.right_hand,
  };
  return value;
}

function deleteGestureData(name: string, type: SampleType, id: string) {
  return client.delete(`/data/${name}/${type}/${id}`);
}

async function getModels(): Promise<string[]> {
  const res = await client.get("/models");
  return res.data;
}

async function getModelInfo(name: string) {
  const res = await client.get(`/models/data/${name}`);
  return res.data;
}

function deleteModel(name: string) {
  return client.delete(`/models/${name}`);
}

async function submitImage(
  image: Blob,
  lablel: string,
  type: SampleType
): Promise<{ id: string }> {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("label", lablel);
  formData.append("type", type);

  const res = await client.post("/images", formData);
  return res.data;
}

export default {
  getGestures,
  getGestureData,
  getSampleData,
  getModels,
  getModelInfo,
  createGesture,
  deleteGesture,
  deleteGestureData,
  deleteModel,
  renameGesture,
  submitImage,
};
