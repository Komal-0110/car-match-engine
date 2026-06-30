from pydantic import BaseModel, Field, field_validator
from typing import List, Dict, Optional


class WeightConfig(BaseModel):
    budget: int = Field(..., ge=1, le=5)
    efficiency: int = Field(..., ge=1, le=5)
    safety: int = Field(..., ge=1, le=5)


class RecommendationRequest(BaseModel):
    max_budget: int = Field(..., gt=0)
    min_seats: int = Field(default=1, ge=1)
    body_styles: List[str] = Field(default_factory=list)
    fuel_types: List[str] = Field(default_factory=list)
    weights: WeightConfig

    @field_validator("body_styles", "fuel_types")
    @classmethod
    def normalize_case(cls, v: List[str]) -> List[str]:
        return [item.strip().lower() for item in v]


class CarRecommendation(BaseModel):
    id: str
    make: str
    model: str
    variant: str
    price: int
    mileage_kmpl: float
    safety_rating: float
    avg_review_rating: float
    match_percentage: float
    score_breakdown: Dict[str, float]


class RecommendationResponse(BaseModel):
    total_matches: int
    results: List[CarRecommendation]
