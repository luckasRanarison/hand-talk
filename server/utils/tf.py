import asyncio

from utils.regex import TF_EPOCH_RE, TF_PROGRESS_RE
from utils.fs import DB_PATH, MODELS_PATH


def spawn_trainer(params: dict[str, str]):
    args = [
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
    ]

    return asyncio.create_subprocess_exec(
        "python",
        *args,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )


def parse_status(line: str):
    status = {}

    epoch_match = TF_EPOCH_RE.search(line)

    if epoch_match:
        epoch = int(epoch_match.group("epoch"))
        total = int(epoch_match.group("total"))

        status["epoch"] = {
            "current": epoch,
            "total": total,
        }

    batch_match = TF_PROGRESS_RE.search(line)

    if batch_match:
        batch = int(batch_match.group("batch"))
        total = int(batch_match.group("total"))
        duration = batch_match.group("duration")
        step = batch_match.group("step")
        accuracy = float(batch_match.group("accuracy"))
        loss = batch_match.group("loss")
        loss = loss + "0" if loss.endswith("e") else loss  # Avoid parsing error
        loss = float(loss)

        status["batch"] = {
            "current": batch,
            "total": total,
            "duration": duration,
            "step": step,
            "accuracy": accuracy,
            "loss": loss,
        }

    return status
