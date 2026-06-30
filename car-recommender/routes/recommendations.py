from fastapi import APIRouter, HTTPException, status
from schemas.recommendation import RecommendationRequest, RecommendationResponse
from services.data_loader import car_repository
from services.scoring_engine import scoring_engine
from core.exceptions import DataLoadError

router = APIRouter(prefix="/api", tags=["Recommendations"])


@router.post(
    "/recommendations",
    response_model=RecommendationResponse,
    status_code=status.HTTP_200_OK,
)
async def get_recommendations(request: RecommendationRequest) -> RecommendationResponse:
    try:
        cars = car_repository.cars
    except DataLoadError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Car dataset is not currently available.",
        )

    ranked_results, match_count = scoring_engine.recommend(cars, request)

    if match_count == 0:
        # Graceful empty response rather than a crash or 500
        return RecommendationResponse(total_matches=0, results=[])

    return RecommendationResponse(total_matches=match_count, results=ranked_results)
