import subprocess

from utils.regex import strip_ansi, TF_EPOCH_RE, TF_PROGRESS_RE
from utils.fs import DB_PATH, MODELS_PATH


def spawn_trainer(params: dict[str, str]):
    return subprocess.Popen(
        [
            "python",
            "./scripts/trainer.py",
            "--name",
            params["name"],
            "--epochs",
            str(params["epochs"]),  # args must be strings
            "--batch",
            str(params["batch"]),
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
        total = int(match.group("total"))

        return {
            "status": "epoch",
            "current": epoch,
            "total": total,
        }

    match = TF_PROGRESS_RE.search(line)

    if match:
        batch = int(match.group("batch"))
        total = int(match.group("total"))
        duration = match.group("duration")
        step = match.group("step")
        accuracy = float(match.group("accuracy"))
        loss = float(match.group("loss"))

        return {
            "status": "batch",
            "current": batch,
            "total": total,
            "duration": duration,
            "step": step,
            "accuracy": accuracy,
            "loss": loss,
        }
