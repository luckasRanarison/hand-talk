import os
import cv2
import uuid
import numpy as np
import aiofiles as aio

from io import BytesIO
from utils.fs import persist_data, DB_PATH
from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from lib import holistic


router = APIRouter()


@router.post("/")
async def post(
    label: str = Form(...),
    image: UploadFile = File(...),
    type: str = Form(...),
):
    print(label, image, type)
    image_bytes = await image.read()
    image_np = np.frombuffer(image_bytes, np.uint8)
    image_decoded = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
    results = holistic.process(image_decoded)
    _, image_encoded = cv2.imencode(".png", image_decoded)
    image_bytes = image_encoded.tobytes()
    sample_id = uuid.uuid4()

    await persist_data(label, type, results, image_bytes, sample_id)

    return {"id": sample_id}


@router.get("/{gesture}/{sample_type}/{id}")
async def get(gesture: str, sample_type: str, id: str):
    file_path = os.path.join(DB_PATH, gesture, sample_type, id, "source.png")

    if not os.path.exists(file_path):
        raise HTTPException(400, "Data not found")

    async with aio.open(file_path, "rb") as f:
        file_bytes = await f.read()
        file_bytes = BytesIO(file_bytes)

        return StreamingResponse(file_bytes, media_type="image/png")
