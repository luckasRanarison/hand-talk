import os

from fastapi import APIRouter, WebSocket
from utils.fs import MODELS_PATH
from utils.tf import parse_status, spawn_trainer


router = APIRouter()


@router.get("/")
async def get():
    if not os.path.exists(MODELS_PATH):
        os.mkdir(MODELS_PATH)

    models = map(lambda m: m.removesuffix(".keras"), os.listdir(MODELS_PATH))

    return list(models)


@router.delete("/{model}")
async def delete(model: str):
    model_path = os.path.join(MODELS_PATH, model + ".keras")

    if os.path.exists(model_path):
        os.remove(model_path)


@router.websocket("/create")
async def create(ws: WebSocket):
    await ws.accept()

    params = await ws.receive_json()
    process = spawn_trainer(params)

    while True:
        line = ""

        if process.stdout:
            line = process.stdout.readline()
        if line == "" and process.poll() is not None:
            break

        status = parse_status(line)

        if status is not None:
            await ws.send_json(status)

    await ws.close()
