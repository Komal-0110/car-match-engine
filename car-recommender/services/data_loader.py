import json
import logging
from typing import List
from pydantic import ValidationError

from schemas.car import Car
from core.config import DATA_FILE_PATH
from core.exceptions import DataLoadError

logger = logging.getLogger(__name__)


class CarRepository:
    """
    In-memory repository for car data.
    Loaded once on application startup; read-only thereafter.
    Thread-safe for reads since the underlying list is never mutated post-load.
    """

    def __init__(self) -> None:
        self._cars: List[Car] = []
        self._loaded: bool = False

    def load(self) -> None:
        if not DATA_FILE_PATH.exists():
            raise DataLoadError(f"Data file not found at {DATA_FILE_PATH}")

        try:
            with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
                raw_data = json.load(f)
        except json.JSONDecodeError as e:
            raise DataLoadError(f"Malformed JSON in dataset: {e}") from e

        if not isinstance(raw_data, dict) or "cars" not in raw_data:
            raise DataLoadError(
                "Dataset root must be a JSON object containing a 'cars' array.")

        validated_cars: List[Car] = []
        errors_count = 0

        for idx, entry in enumerate(raw_data["cars"]):
            try:
                validated_cars.append(Car(**entry))
            except ValidationError as e:
                errors_count += 1
                logger.warning(
                    f"Skipping invalid car record at index {idx}: {e}")

        if not validated_cars:
            raise DataLoadError(
                f"No valid car records could be loaded ({errors_count} records failed validation)."
            )

        self._cars = validated_cars
        self._loaded = True
        logger.info(
            f"Loaded {len(self._cars)} cars ({errors_count} skipped due to validation errors).")

    @property
    def cars(self) -> List[Car]:
        if not self._loaded:
            raise DataLoadError(
                "Car repository accessed before data was loaded.")
        return self._cars

    def is_loaded(self) -> bool:
        return self._loaded


# Singleton instance shared across the app
car_repository = CarRepository()
