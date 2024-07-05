import json
import zipfile
from typing import Any, Tuple

from utils.fs import get_model_path
from keras.api.models import load_model as load_keras_model


def load_model(name: str) -> Tuple[Any, dict[int, str]]:
    model_path = get_model_path(name)

    labels = {}

    with zipfile.ZipFile(model_path, "r") as zip_ref:
        with zip_ref.open("labels.json", "r") as labels_file:
            content = labels_file.read()
            labels = json.loads(content)

    return load_keras_model(model_path), labels
