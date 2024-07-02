import api.data
import api.images
import api.models
import api.gestures

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()


app = FastAPI()

app.include_router(api.data.router, prefix="/api/data")
app.include_router(api.images.router, prefix="/api/images")
app.include_router(api.models.router, prefix="/api/models")
app.include_router(api.gestures.router, prefix="/api/gestures")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="http://localhost:\\d+",
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
