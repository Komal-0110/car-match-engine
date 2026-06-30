````markdown
# CarMatch Engine

An intelligent, high-performance car recommendation system built using **FastAPI** (Python 3.11+) and **React** with **TypeScript & Tailwind CSS**.

The application utilizes an advanced in-memory multi-attribute scoring matrix to dynamically calculate match compatibility scores across customized user budgets, fuel efficiencies, and passenger/safety requirements.

---

## 🏗 Project Architecture

The workspace is cleanly divided into decoupled backend and frontend environments:

```text
car-recommender-platform/
├── car-recommender/         # Backend (FastAPI, Pydantic V2)
│   ├── core/                # Core configurations, logging & exceptions
│   ├── data/                # Database files (cars.json)
│   ├── schemas/             # Pydantic schemas (car.py)
│   ├── services/            # Data validation loaders & recommendation logic
│   └── main.py              # Application entrypoint & Lifespan managers
│
└── car-recommender-ui/      # Frontend (React, TypeScript, Tailwind)
    ├── src/
    │   ├── components/      # UI controls, Filter sidebars, Result Cards
    │   ├── data/            # Static data configurations (car-data.ts)
    │   └── App.tsx          # Dashboard UI manager
```
````

---

## ⚡ Backend Setup (`car-recommender`)

The backend is built with FastAPI and utilizes strict schema serialization via Pydantic V2.

### Prerequisites

- Python 3.11+
- Pipenv or Virtualenv

### 1. Installation

Navigate to the backend directory, activate your isolated environment, and install dependencies:

```bash
cd car-recommender

# Initialize and activate your virtual environment (Windows syntax)
python -m venv .venv
.\.venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

```

### 2. Dataset Setup

Ensure your schema-validated dataset exists inside `data/cars.json`. The application validates this root file at startup via an explicit in-memory repository singleton lifecycle manager.

### 3. Running the Server

Launch the FastAPI development environment with hot-reloading:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000

```

- **Interactive API Documentation:** Visit [http://localhost:8000/docs](https://www.google.com/search?q=http://localhost:8000/docs)
- **Local Server Endpoint:** [http://localhost:8000](https://www.google.com/search?q=http://localhost:8000)

---

## 🎨 Frontend Setup (`car-recommender-ui`)

The frontend is a premium interactive dashboard utilizing TypeScript types matched exactly to the underlying automotive datasets.

### Prerequisites

- Node.js (v18 or higher)
- npm / yarn

### 1. Installation

Navigate into the frontend UI root directory and install your Node modules:

```bash
cd car-recommender-ui
npm install

```

### 2. Running the Interface

Launch the local Vite or Webpack development environment:

```bash
npm run dev

```

Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) (or your local bundler port) in your web browser.

---

## 🔌 API Contract Reference

The system exchanges information based on rigid technical schemas to avoid casting issues between Python configurations and TypeScript runtimes.

### 📥 POST `/api/recommendations`

**Payload Format:**

```json
{
  "max_budget": 1500000,
  "min_seats": 5,
  "body_styles": ["suv"],
  "fuel_types": ["petrol", "diesel"],
  "weights": {
    "budget": 4,
    "efficiency": 3,
    "safety": 5
  }
}
```

### 📤 Response Format

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
      "safety_rating": 3.0,
      "avg_review_rating": 3.0,
      "match_percentage": 58.33,
      "score_breakdown": {
        "budget_score": 100.0,
        "efficiency_score": 100.0,
        "safety_score": 0.0
      }
    }
  ]
}
```

---

## 🛠 Features Developed

- **Thread-Safe Memory Management:** Data files are loaded once during application startup lifespan routines into read-only repositories to maximize parallel endpoint speeds.
- **Strict Data Validation:** Automatically rejects records that fail Pydantic model configurations, preventing runtime dictionary unpack errors (`TypeError`).
- **Dynamic Importance Multipliers:** Users can modify weights (1-5 sensitivity score scales) to prioritize cost, economy, or vehicle safety on the fly.

```

```
