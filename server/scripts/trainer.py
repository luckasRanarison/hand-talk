import os
import json
import zipfile
import argparse
import numpy as np

from keras.api import layers, models
from keras.api.utils import to_categorical


def load_samples(dir: str):
    results = []

    for sample in os.listdir(dir):
        data_path = os.path.join(dir, sample, "data.json")

        with open(data_path, "rb") as f:
            json_data = json.load(f)

            # Transform the sample objects into a 1D array of 225 items (99 + 63 + 63)
            value = json_data["pose"] + json_data["left_hand"] + json_data["right_hand"]

            results.append(value)

    return results


def read_data(db_path: str):
    results = {}
    labels = os.listdir(db_path)

    for label in labels:
        train_dir = os.path.join(db_path, label, "train")
        results[label] = load_samples(train_dir)

    return results


def train_model(data, name, epochs, optimizer, loss, dst_path, batch=None):
    label_to_index = {label: i for i, label in enumerate(data)}
    num_classes = len(label_to_index)

    x_train = []
    y_train = []

    for label, value in data.items():
        y = label_to_index[label]

        for x in value:
            x_train.append(x)
            y_train.append(y)

    x_train = np.array(x_train)
    y_train = to_categorical(y_train, num_classes=num_classes)

    model = models.Sequential()

    model.add(layers.Input(shape=(225,)))
    model.add(layers.Dense(128, activation="relu"))
    model.add(layers.Dense(128, activation="relu"))
    model.add(layers.Dense(num_classes, activation="softmax"))

    model.compile(optimizer=optimizer, loss=loss, metrics=["accuracy"])
    model.fit(x_train, y_train, batch_size=batch, epochs=epochs)

    file_path = os.path.join(dst_path, f"{name}.keras")

    model.save(file_path)

    labels = list(data.keys())

    with zipfile.ZipFile(file_path, "a") as zip_ref:
        zip_ref.writestr("labels.json", json.dumps(labels))


parser = argparse.ArgumentParser(
    "trainer", description="Sign language detection model trainer CLI"
)

parser.add_argument("--name", help="The name of the model", required=True)
parser.add_argument("--epochs", help="The number of epochs", required=True, type=int)
parser.add_argument("--batch", help="The batch size", type=int)
parser.add_argument("--optimizer", help="The optimizer type", required=True)
parser.add_argument("--loss", help="The loss function", required=True)
parser.add_argument("--db", help="The database path", required=True)
parser.add_argument("--outdir", help="The destination directory", required=True)

args = parser.parse_args()
data = read_data(args.db)

train_model(
    data=data,
    name=args.name,
    epochs=args.epochs,
    optimizer=args.optimizer,
    loss=args.loss,
    batch=args.batch,
    dst_path=args.outdir,
)
