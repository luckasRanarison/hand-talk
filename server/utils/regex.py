import re


ANSI_ESCAPE_RE = re.compile(r"\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])")


def strip_ansi(text):
    return ANSI_ESCAPE_RE.sub("", text)
