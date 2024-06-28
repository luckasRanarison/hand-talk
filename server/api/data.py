import os
import shutil
import aiofiles as aio

from io import BytesIO
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from utils.fs import DB_PATH, get_data_dirs


router = APIRouter()


@router.get("/{gesture}")
async def get_data(gesture: str):
    train_dir, test_dir = get_data_dirs(gesture)

    if not os.path.exists(train_dir) or not os.path.exists(test_dir):
        raise HTTPException(400, "Gesture not found")

    train_data = os.listdir(train_dir)
    test_data = os.listdir(test_dir)

    return {"train": train_data, "test": test_data}


@router.get("/{gesture}/{sample_type}/{id}")
async def get(gesture: str, sample_type: str, id: str):
    file_path = os.path.join(DB_PATH, gesture, sample_type, id, "data.json")

    if not os.path.exists(file_path):
        raise HTTPException(400, "Data not found")

    async with aio.open(file_path, "rb") as f:
        file_bytes = await f.read()
        file_bytes = BytesIO(file_bytes)

        return StreamingResponse(file_bytes, media_type="text/json")


@router.delete("/{gesture}/{sample_type}/{id}")
async def delete(gesture: str, sample_type: str, id: str):
    dir_path = os.path.join(DB_PATH, gesture, sample_type, id)

    if os.path.exists(dir_path):
        shutil.rmtree(dir_path)
