import os
import cv2
import numpy as np

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from utils.fs import MODELS_PATH, get_model_path, extract_model_headers
from utils.models import load_model
from utils.regex import strip_ansi
from utils.tf import parse_status, spawn_trainer
from lib import holistic


router = APIRouter()


@router.get("/")
def get():
    if not os.path.exists(MODELS_PATH):
        os.mkdir(MODELS_PATH)

    models = map(lambda m: m.removesuffix(".keras"), os.listdir(MODELS_PATH))

    return list(models)


@router.delete("/{model}")
def delete(model: str):
    model_path = get_model_path(model)

    if os.path.exists(model_path):
        os.remove(model_path)


@router.get("/data/{model}")
def get_data(model: str):
    model_path = get_model_path(model)

    if not os.path.exists(model_path):
        raise HTTPException(404, "Model not found")

    return extract_model_headers(model_path)


@router.websocket("/create")
async def create(ws: WebSocket):
    await ws.accept()

    params = await ws.receive_json()
    process = await spawn_trainer(params)

    try:
        while True:
            line = ""

            if process.stdout:
                line_bytes = await process.stdout.readline()
                line = line_bytes.decode()
                line = strip_ansi(line)

            if line == "":
                break

            status = parse_status(line)
            await ws.send_json(status)

        await ws.close()
    except WebSocketDisconnect:
        process.terminate()


@router.websocket("/predict/{name}")
async def predict(ws: WebSocket, name: str):
    model, labels = load_model(name)

    await ws.accept()

    try:
        while True:
            image_bytes = await ws.receive_bytes()
            image_np = np.frombuffer(image_bytes, np.uint8)
            image_decoded = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
            results = holistic.process(image_decoded)
            normalized = results["pose"] + results["left_hand"] + results["right_hand"]
            input = np.array([normalized])
            predictions = model.predict(input)
            guess = np.argmax(predictions)
            label = labels[guess]

            await ws.send_text(label)
    except WebSocketDisconnect:
        pass
