# 🚗 CarMatch Engine

An intelligent car recommendation platform built using **FastAPI (Python 3.11+)** and **Next.js + TypeScript + Tailwind CSS**.

CarMatch is a multi-criteria vehicle recommendation engine that helps users discover suitable cars based on:

- Budget
- Number of seats
- Body style preference
- Fuel type preference
- User priority weights:
  - Budget
  - Efficiency
  - Safety

The backend implements **MCDA (Multi-Criteria Decision Analysis)** based ranking to filter and score vehicles dynamically.

---

# 🌐 Live Demo

## Frontend

```
https://car-recommender-ui.vercel.app
```

## Backend API

```
https://car-match-engine.onrender.com
```

## API Documentation

```
https://car-match-engine.onrender.com/docs
```

---

# 🏗 Architecture

```
User
 |
 |
Next.js Frontend (Vercel)
 |
 |
REST API
 |
 |
FastAPI Backend (Render)
 |
 |
Recommendation Engine
 |
 |
cars.json Dataset
```

---

# 📂 Project Structure

```
car-match-engine/

├── car-recommender/                 # Backend (FastAPI)
│
│   ├── core/
│   │   └── Configuration & exceptions
│   │
│   ├── data/
│   │   └── cars.json
│   │
│   ├── schemas/
│   │   └── Pydantic models
│   │
│   ├── services/
│   │   ├── Repository layer
│   │   └── Recommendation engine
│   │
│   ├── main.py
│   └── requirements.txt
│
│
└── car-recommender-ui/              # Frontend (Next.js)

    ├── app/
    │   └── page.tsx
    │
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
- Uvicorn

## Installation

```bash
cd car-recommender

python -m venv .venv
```

Activate environment:

### Windows

```bash
.\.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# ▶️ Run Backend Locally

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

# 🎨 Frontend Setup

## Requirements

- Node.js 18+
- npm

Install:

```bash
cd car-recommender-ui

npm install
```

---

# Environment Variables

Create:

```
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=https://car-match-engine.onrender.com
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

## Recommendation API

### POST

```
/api/recommendations
```

---

## Request

```json
{
  "max_budget": 3000000,
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

```
User selects preferences

        ↓

React state management

        ↓

POST /api/recommendations

        ↓

FastAPI validation (Pydantic)

        ↓

Filter vehicles

        ↓

Calculate MCDA weighted score

        ↓

Rank recommendations

        ↓

Display matched cars
```

---

# ✨ Features

## Backend

- FastAPI REST API
- Pydantic request validation
- In-memory repository pattern
- Startup dataset validation
- MCDA recommendation algorithm
- Dynamic user weighting
- Stateless API design

## Frontend

- Interactive preference engine
- Budget slider
- Seat selection
- Body style filtering
- Fuel type filtering
- Match percentage visualization
- Responsive Tailwind UI
- Dynamic recommendation cards

---

# 🧠 Recommendation Algorithm

Each vehicle receives scores:

## Budget Score

Measures how well the car fits within user budget.

## Efficiency Score

Evaluates mileage / EV efficiency.

## Safety Score

Uses safety rating comparison.

Final calculation:

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
- Frontend only manages user interaction
- Strict frontend/backend contract
- Dataset loaded once during application startup
- Stateless recommendation endpoint
- Type-safe TypeScript models
- Production deployment using Vercel + Render

---

# 🚀 Future Improvements

- PostgreSQL persistence
- Redis caching
- User accounts
- Recommendation history
- AI-based car explanation assistant
- Real-time vehicle pricing

---

# 🧰 Tech Stack

## Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Deployment

- Vercel (Frontend)
- Render (Backend)

## Data

- JSON vehicle dataset
- In-memory processing
