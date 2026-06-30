from typing import List, Dict, Tuple
from schemas.car import Car
from schemas.recommendation import RecommendationRequest, CarRecommendation, WeightConfig


class ScoringEngine:
    """
    Implements Multi-Criteria Decision Analysis (MCDA) for car recommendations.

    Pipeline:
    1. Hard-filter cars by budget, seats, body style, fuel type.
    2. Dynamically min-max normalize budget/efficiency/safety across the
       FILTERED subset only (so scores are relative to what's actually relevant).
    3. Apply weighted scoring: Score = Sum(Normalized_Value * Weight) / Sum(Weights)
    4. Convert to a 0-100 match percentage and rank descending.
    """

    EPSILON = 1e-9  # guards against div-by-zero when all values in subset are equal

    def filter_cars(self, cars: List[Car], request: RecommendationRequest) -> List[Car]:
        filtered = []
        for car in cars:
            if car.price > request.max_budget:
                continue
            if car.specs.seats < request.min_seats:
                continue
            if request.body_styles and car.specs.body_style.strip().lower() not in request.body_styles:
                continue
            if request.fuel_types and car.specs.fuel_type.strip().lower() not in request.fuel_types:
                continue
            filtered.append(car)
        return filtered

    def _min_max_normalize(self, values: List[float], invert: bool = False) -> List[float]:
        """
        Min-Max scales a list of values to [0, 1].
        invert=True is used for criteria where LOWER raw value = BETTER
        (e.g. price: cheaper is better, so we invert after scaling).
        """
        min_v, max_v = min(values), max(values)
        spread = max_v - min_v

        if spread < self.EPSILON:
            # All cars identical on this metric within the subset -> neutral score
            return [1.0 for _ in values]

        normalized = [(v - min_v) / spread for v in values]
        if invert:
            normalized = [1.0 - n for n in normalized]
        return normalized

    def score_cars(self, cars: List[Car], weights: WeightConfig) -> List[CarRecommendation]:
        if not cars:
            return []

        prices = [c.price for c in cars]
        mileages = [c.mileage_kmpl for c in cars]
        safety_ratings = [c.safety_rating for c in cars]

        # Budget: lower price is better -> invert=True
        norm_budget = self._min_max_normalize(prices, invert=True)
        norm_efficiency = self._min_max_normalize(mileages, invert=False)
        norm_safety = self._min_max_normalize(safety_ratings, invert=False)

        w_budget = weights.budget
        w_efficiency = weights.efficiency
        w_safety = weights.safety
        total_weight = w_budget + w_efficiency + w_safety

        results: List[CarRecommendation] = []

        for i, car in enumerate(cars):
            weighted_sum = (
                norm_budget[i] * w_budget
                + norm_efficiency[i] * w_efficiency
                + norm_safety[i] * w_safety
            )
            raw_score = weighted_sum / total_weight  # 0.0 - 1.0
            match_pct = round(raw_score * 100, 2)

            breakdown = {
                "budget_score": round(norm_budget[i] * 100, 2),
                "efficiency_score": round(norm_efficiency[i] * 100, 2),
                "safety_score": round(norm_safety[i] * 100, 2),
            }

            results.append(
                CarRecommendation(
                    id=car.id,
                    make=car.make,
                    model=car.model,
                    variant=car.variant,
                    price=car.price,
                    mileage_kmpl=car.mileage_kmpl,
                    safety_rating=car.safety_rating,
                    avg_review_rating=car.avg_review_rating,
                    match_percentage=match_pct,
                    score_breakdown=breakdown,
                )
            )

        results.sort(key=lambda r: r.match_percentage, reverse=True)
        return results

    def recommend(
        self, cars: List[Car], request: RecommendationRequest
    ) -> Tuple[List[CarRecommendation], int]:
        print(request)
        filtered = self.filter_cars(cars, request)
        scored = self.score_cars(filtered, request.weights)
        return scored, len(filtered)


scoring_engine = ScoringEngine()
