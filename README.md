# 🚗 CarMatch Engine

An intelligent car recommendation platform built using **FastAPI (Python 3.11+)** and **Next.js + TypeScript + Tailwind CSS**.

CarMatch is a multi-criteria car recommendation engine that helps users find suitable vehicles based on:

- Budget
- Number of seats
- Body style preference
- Fuel type preference
- Custom importance weights (Budget, Efficiency, Safety)

The backend applies filtering and MCDA (Multi-Criteria Decision Analysis) scoring to rank vehicles dynamically.

---

# 🏗 Project Architecture

```text
car-recommender-platform/

├── car-recommender/                 # Backend (FastAPI)
│
│   ├── core/
│   │   └── Configuration, exceptions
│   │
│   ├── data/
│   │   └── cars.json
│   │
│   ├── schemas/
│   │   └── Pydantic request/response models
│   │
│   ├── services/
│   │   ├── Repository layer
│   │   └── Recommendation engine
│   │
│   └── main.py                      # FastAPI entry point
│
│
└── car-recommender-ui/              # Frontend (Next.js)

    ├── app/
    │   └── page.tsx

    ├── components/
    │   ├── preference-engine.tsx
    │   ├── smart-shortlist.tsx
    │   └── car-match-card.tsx
    │
    ├── lib/
    │   └── car-data.ts
    │
    └── public/
        └── car-placeholder.png
```

---

# ⚡ Backend Setup

## Requirements

- Python 3.11+
- FastAPI
- Pydantic V2

## Installation

```bash
cd car-recommender

python -m venv .venv
```

Activate virtual environment:

### Windows

```bash
.\.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# ▶️ Run Backend

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend URL:

```
http://localhost:8000
```

Swagger API Documentation:

```
http://localhost:8000/docs
```

---

# 🎨 Frontend Setup

## Requirements

- Node.js 18+
- npm

Install dependencies:

```bash
cd car-recommender-ui

npm install
```

---

# ▶️ Run Frontend

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

# 🔌 API Contract

## POST Recommendation API

Endpoint:

```
POST /api/recommendations
```

---

## Request Body

```json
{
  "max_budget": 1500000,
  "min_seats": 5,
  "body_styles": ["SUV"],
  "fuel_types": ["Electric"],
  "weights": {
    "budget": 4,
    "efficiency": 3,
    "safety": 5
  }
}
```

---

## Response

```json
{
  "total_matches": 2,
  "results": [
    {
      "id": "15",
      "make": "Tata",
      "model": "Nexon EV",
      "variant": "XZ+ #Dark",
      "price": 1773822,
      "mileage_kmpl": 5.9,
      "safety_rating": 3,
      "avg_review_rating": 3,
      "match_percentage": 58.33,

      "score_breakdown": {
        "budget_score": 100,
        "efficiency_score": 100,
        "safety_score": 0
      }
    }
  ]
}
```

---

# 🔄 Application Flow

```text
User selects preferences

          ↓

React State Management

          ↓

POST /api/recommendations

          ↓

FastAPI Request Validation

          ↓

Filter Cars

          ↓

Calculate Weighted Score

          ↓

Return Ranked Recommendations

          ↓

Display Car Cards
```

---

# ✨ Features

## Backend

- FastAPI REST API
- Pydantic V2 validation
- In-memory repository pattern
- Startup dataset validation
- MCDA based recommendation engine
- Dynamic scoring weights
- Fast filtering pipeline

## Frontend

- Interactive preference engine
- Budget slider
- Seat selection
- Body type filtering
- Fuel type filtering
- Match percentage display
- Responsive Tailwind UI
- Dynamic recommendation cards

---

# 🧠 Recommendation Algorithm

Each vehicle receives scores based on:

### Budget Score

How well the vehicle fits inside user's budget.

### Efficiency Score

Fuel efficiency / EV range comparison.

### Safety Score

Safety rating based comparison.

Final score:

```
Final Score =
(Budget Score × Budget Weight)
+
(Efficiency Score × Efficiency Weight)
+
(Safety Score × Safety Weight)
```

Vehicles are sorted by highest match percentage.

---

# 🛡 Engineering Decisions

- Backend owns recommendation logic
- Frontend only handles user interaction
- Strict API contract between frontend and backend
- Dataset loaded once during application startup
- Stateless recommendation API
- Type-safe frontend models

---

# 🚀 Future Improvements

- PostgreSQL integration
- Redis caching
- User authentication
- Personalized recommendation history
- AI-based car explanation assistant
- Real-time price updates

---

# 👨‍💻 Tech Stack

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Data

- JSON based vehicle dataset
- In-memory processing
