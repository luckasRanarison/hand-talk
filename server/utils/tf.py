import re
import subprocess

from utils.regex import strip_ansi
from utils.fs import DB_PATH, MODELS_PATH


TF_EPOCH_RE = re.compile(r"Epoch (?P<epoch>\d+)")

TF_PROGRESS_RE = re.compile(
    r"(?P<batch>\d+)/\d+ ━━━━━━━━━━━━━━━━━━━━ (?P<duration>\d+[^\s]+) (?P<step>\d+(s|ms))/step - accuracy: (?P<accuracy>\d+\.\d+) - loss: (?P<loss>\d+\.\d+)"
)


def spawn_trainer(params: dict[str, str]):
    return subprocess.Popen(
        [
            "python",
            "./scripts/trainer.py",
            "--name",
            params["name"],
            "--epochs",
            params["epochs"],
            "--optimizer",
            params["optimizer"],
            "--loss",
            params["loss"],
            "--db",
            DB_PATH,
            "--outdir",
            MODELS_PATH,
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )


def parse_status(line: str):
    line = strip_ansi(line)
    match = TF_EPOCH_RE.search(line)

    if match:
        epoch = int(match.group("epoch"))

        return {
            "status": "epoch",
            "current": epoch,
        }

    match = TF_PROGRESS_RE.search(line)

    if match:
        batch = int(match.group("batch"))
        duration = match.group("duration")
        step = match.group("step")
        accuracy = float(match.group("accuracy"))
        loss = float(match.group("loss"))

        return {
            "status": "batch",
            "current": batch,
            "duration": duration,
            "step": step,
            "accuracy": accuracy,
            "loss": loss,
        }
