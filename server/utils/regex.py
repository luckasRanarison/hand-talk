import re


ANSI_ESCAPE_RE = re.compile(r"\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])")

TF_EPOCH_RE = re.compile(r"Epoch (?P<epoch>\d+)/(?P<total>\d+)")

TF_PROGRESS_RE = re.compile(
    r"(?P<batch>\d+)/(?P<total>\d+) ━+ (?P<duration>\d+[^\s]+) (?P<step>\d+[^/]+)/step - accuracy: (?P<accuracy>\d+\.\d+) - loss: (?P<loss>\d+\.[\de-]+)"
)


def strip_ansi(text):
    return ANSI_ESCAPE_RE.sub("", text)
