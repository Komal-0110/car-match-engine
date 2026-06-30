import json
import random

# Pre-defined realistic car data structures matching your Pydantic options
CAR_CLASSES = {
    "Toyota": {
        "models": ["Camry", "RAV4", "Prius", "Corolla", "Fortuner"],
        "variants": ["G", "V", "VX", "ZX", "Hybrid"],
    },
    "Honda": {
        "models": ["City", "Civic", "CR-V", "Amaze", "Elevate"],
        "variants": ["S", "V", "VX", "ZX", "eHEV"],
    },
    "Hyundai": {
        "models": ["i20", "Creta", "Verna", "Tucson", "Alcazar"],
        "variants": ["Magna", "Sportz", "Asta", "SX", "SX(O)"],
    },
    "Tata": {
        "models": ["Nexon", "Harrier", "Safari", "Altroz", "Nexon EV"],
        "variants": ["XE", "XM", "XT", "XZ", "XZ+ #Dark"],
    },
    "BMW": {
        "models": ["3 Series", "5 Series", "X1", "X3", "i4"],
        "variants": ["sDrive20d", "xDrive20i", "M Sport", "Luxury Line"],
    }
}

BODY_STYLES = ["Sedan", "SUV", "Hatchback", "Compact SUV"]
TRANSMISSIONS = ["Automatic", "Manual", "CVT", "DCT"]
FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"]
AUTHORS = ["John Doe", "Amit Sharma", "Sarah Jenkins", "Rahul V.", "Elena R."]

REVIEW_COMMENTS = [
    "Amazing handling and very smooth ride on highways.",
    "Fuel efficiency is incredible, saving a ton on my daily commute.",
    "The infotainment system is a bit laggy sometimes.",
    "Great family car, plenty of legroom and boot space.",
    "The cabin is exceptionally quiet even at triple-digit speeds.",
    "Performance is top notch, accelerates smoothly.",
    "Suspension is a little stiffer than I expected on bumpy roads."
]


def generate_perfect_dataset(num_rows=50):
    dataset = []
    makes = list(CAR_CLASSES.keys())

    for idx in range(1, num_rows + 1):
        make = random.choice(makes)
        model = random.choice(CAR_CLASSES[make]["models"])
        variant = random.choice(CAR_CLASSES[make]["variants"])

        # Match fuel and body profiles logically
        if "EV" in model or model == "i4":
            fuel_type = "Electric"
            transmission = "Automatic"
            mileage = round(random.uniform(5.5, 7.2), 1)  # km/kWh equiv
            engine_cc = None
            hp = random.choice([140.0, 170.0, 200.0, 335.0])
        else:
            fuel_type = "Hybrid" if "Hybrid" in variant or "eHEV" in variant else random.choice([
                                                                                                "Petrol", "Diesel"])
            transmission = "CVT" if fuel_type == "Hybrid" else random.choice(
                TRANSMISSIONS)
            mileage = round(random.uniform(22.0, 28.0), 1) if fuel_type == "Hybrid" else round(
                random.uniform(11.5, 18.5), 1)
            engine_cc = random.choice([1197, 1498, 1998, 2998])
            hp = round(random.uniform(85.0, 250.0), 1)

        body_style = "SUV" if model in ["RAV4", "Fortuner", "CR-V", "Elevate", "Creta", "Tucson",
                                        "Alcazar", "Nexon", "Harrier", "Safari", "X1", "X3"] else random.choice(["Sedan", "Hatchback"])
        seats = random.choice([7, 8]) if model in [
            "Fortuner", "Safari", "Alcazar"] else 5

        # Structural validation alignment: 'id' must be a String
        car_id = str(idx)
        # Base currency units (e.g. INR / Cents)
        price = random.randint(800000, 7500000)
        safety_rating = float(random.choice([3.0, 4.0, 4.5, 5.0]))

        # Match Reviews array structure
        reviews = []
        for _ in range(random.randint(1, 3)):
            reviews.append({
                "rating": float(random.randint(3, 5)),
                "comment": random.choice(REVIEW_COMMENTS),
                "author": random.choice(AUTHORS)
            })

        car_record = {
            "id": car_id,
            "make": make,
            "model": model,
            "variant": variant,
            "price": price,
            "mileage_kmpl": mileage,
            "safety_rating": safety_rating,
            "specs": {
                "engine_cc": engine_cc,
                "horsepower": hp,
                "transmission": transmission,
                "seats": seats,
                "body_style": body_style,
                "fuel_type": fuel_type
            },
            "reviews": reviews
        }
        dataset.append(car_record)

    return {"cars": dataset}


if __name__ == "__main__":
    output_data = generate_perfect_dataset(50)

    # Write directly into your car-recommender folder layout
    with open("cars.json", "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=4)

    print("Success! Created data/cars.json matching your Pydantic schema perfectly.")
