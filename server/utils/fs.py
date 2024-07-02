import os
import aiofiles as aio
import json

from typing import Any
from uuid import UUID


DB_PATH = os.getenv("DB_PATH") or "db"
MODELS_PATH = os.getenv("MODELS_PATH") or "models"


def get_data_dirs(name: str):
    train_dir = os.path.join(DB_PATH, name, "train")
    test_dir = os.path.join(DB_PATH, name, "test")
    return train_dir, test_dir


async def persist_data(
    label: str, sample_type: str, results: dict[str, Any], image: bytes, uuid: UUID
):
    train_dir, test_dir = get_data_dirs(label)
    dst_dir = train_dir if sample_type == "train" else test_dir
    dst_dir = os.path.join(dst_dir, str(uuid))

    os.makedirs(dst_dir, exist_ok=True)

    img_path = os.path.join(dst_dir, "source.png")
    data_path = os.path.join(dst_dir, "data.json")

    async with aio.open(data_path, "w") as f:
        await f.write(json.dumps(results))

    async with aio.open(img_path, "wb") as f:
        await f.write(image)
