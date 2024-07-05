import os
import shutil

from fastapi.routing import APIRouter
from utils.fs import DB_PATH, get_data_dirs


router = APIRouter()


@router.get("/")
def get():
    return os.listdir(DB_PATH)


@router.post("/{name}")
def post(name: str):
    train_dir, test_dir = get_data_dirs(name)
    os.makedirs(train_dir, exist_ok=True)
    os.makedirs(test_dir, exist_ok=True)


@router.delete("/{name}")
def delete(name: str):
    dir_path = os.path.join(DB_PATH, name)

    if os.path.exists(dir_path):
        shutil.rmtree(dir_path)


@router.patch("/{name}")
def patch(name: str):
    pass  # TODO
