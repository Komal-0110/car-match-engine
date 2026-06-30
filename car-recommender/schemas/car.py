from pydantic import BaseModel, Field, field_validator
from typing import List, Optional


class Review(BaseModel):
    rating: float = Field(..., ge=0, le=5)
    comment: Optional[str] = None
    author: Optional[str] = None


class Specs(BaseModel):
    engine_cc: Optional[int] = None
    horsepower: Optional[float] = None
    transmission: Optional[str] = None
    seats: int = Field(..., ge=1, le=12)
    body_style: str  # e.g. "SUV", "Sedan", "Hatchback"
    fuel_type: str   # e.g. "Petrol", "Diesel", "Electric", "Hybrid"


class Car(BaseModel):
    id: str
    make: str
    model: str
    variant: str
    price: int = Field(..., gt=0, description="Price in base currency unit")
    mileage_kmpl: float = Field(..., gt=0,
                                description="Fuel efficiency in km/l or km/kWh equiv")
    safety_rating: float = Field(..., ge=0, le=5)
    specs: Specs
    reviews: List[Review] = Field(default_factory=list)

    @field_validator("reviews")
    @classmethod
    def cap_reviews_display(cls, v: List[Review]) -> List[Review]:
        return v

    @property
    def avg_review_rating(self) -> float:
        if not self.reviews:
            return 0.0
        return round(sum(r.rating for r in self.reviews) / len(self.reviews), 2)


class CarDataset(BaseModel):
    """Wrapper for validating the entire ingested JSON array."""
    cars: List[Car]
