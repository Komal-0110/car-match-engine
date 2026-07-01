import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from services.data_loader import car_repository
from core.exceptions import DataLoadError
from routes.recommendations import router as recommendations_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: load dataset into memory once
    try:
        car_repository.load()
    except DataLoadError as e:
        logger.error(f"FATAL: Could not load car dataset on startup: {e}")
        # We let the app start so health checks can report status,
        # but recommendation endpoints will 503 until data is fixed.
    yield
    # Shutdown: nothing to clean up (in-memory, no open connections)


app = FastAPI(
    title="Car Research & Recommendation API",
    description="MCDA-based car recommendation engine",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://car-recommender-ui.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(recommendations_router)


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "data_loaded": car_repository.is_loaded(),
        "cars_in_memory": len(car_repository.cars) if car_repository.is_loaded() else 0,
    }


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.exception(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred. Please try again later."},
    )
