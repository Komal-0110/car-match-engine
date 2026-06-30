"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Filter } from "@/app/page";
import { Car } from "@/lib/car-data";

interface PreferenceEngineProps {
  filters: Filter;
  setFilters: (filters: Filter) => void;
  setCars: (cars: Car[]) => void;
}

const bodyTypeOptions = ["Sedan", "SUV", "Hatchback"];
const fuelTypeOptions = ["Petrol", "Diesel", "Hybrid", "Electric"];
const seatOptions = [4, 5, 7, 8, 10, 12];

export default function PreferenceEngine({
  filters,
  setFilters,
  setCars,
}: PreferenceEngineProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    budget: true,
    seats: true,
    bodyType: true,
    fuelType: true,
    weights: true,
  });

  const handleSubmit = async () => {
    try {
      const requestBody = {
        max_budget: filters.maxBudget,
        min_seats: filters.minSeats,
        body_styles: filters.bodyStyles,
        fuel_types: filters.fuelTypes,
        weights: filters.weights,
      };

      const response = await fetch(
        "http://localhost:8000/api/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();

      setCars(data.results);
      console.log("Filtered Cars:", data);

      // optional: update parent state with response
      // setCars(data)
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleBudgetChange = (value: number) => {
    setFilters({
      ...filters,
      maxBudget: value,
    });
  };

  const handleSeatsChange = (seats: number) => {
    setFilters({
      ...filters,
      minSeats: filters.minSeats === seats ? 0 : seats,
    });
  };

  const handleBodyTypeToggle = (type: string) => {
    setFilters({
      ...filters,
      bodyStyles: filters.bodyStyles.includes(type)
        ? filters.bodyStyles.filter((t) => t !== type)
        : [...filters.bodyStyles, type],
    });
  };

  const handleFuelTypeToggle = (type: string) => {
    setFilters({
      ...filters,
      fuelTypes: filters.fuelTypes.includes(type)
        ? filters.fuelTypes.filter((t) => t !== type)
        : [...filters.fuelTypes, type],
    });
  };

  const handleWeightChange = (
    key: "budget" | "efficiency" | "safety",
    value: number,
  ) => {
    setFilters({
      ...filters,
      weights: {
        ...filters.weights,
        [key]: value,
      },
    });
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`;
    return `₹${price}`;
  };

  return (
    <div className="w-80 bg-card border-r border-border overflow-y-auto">
      <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border p-6 z-10">
        <h1 className="text-2xl font-bold text-foreground">CarMatch</h1>
        <p className="text-sm text-muted-foreground mt-1">Preference Engine</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Max Budget */}
        <div>
          <button
            onClick={() => toggleSection("budget")}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h2 className="text-sm font-semibold text-foreground group-hover:text-accent transition">
              Max Budget
            </h2>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedSections["budget"] ? "" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections["budget"] && (
            <div className="space-y-4">
              <div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={filters.maxBudget}
                  onChange={(e) => handleBudgetChange(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-accent">
                  {formatPrice(filters.maxBudget)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Min Seats */}
        <div>
          <button
            onClick={() => toggleSection("seats")}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h2 className="text-sm font-semibold text-foreground group-hover:text-accent transition">
              Min Seats
            </h2>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedSections["seats"] ? "" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections["seats"] && (
            <div className="grid grid-cols-4 gap-2">
              {seatOptions.map((seats) => (
                <button
                  key={seats}
                  onClick={() => handleSeatsChange(seats)}
                  className={`py-2 px-3 rounded text-sm font-medium transition ${
                    filters.minSeats === seats
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {seats}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body Type */}
        <div>
          <button
            onClick={() => toggleSection("bodyType")}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h2 className="text-sm font-semibold text-foreground group-hover:text-accent transition">
              Body Type
            </h2>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedSections["bodyType"] ? "" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections["bodyType"] && (
            <div className="flex flex-wrap gap-2">
              {bodyTypeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => handleBodyTypeToggle(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    filters.bodyStyles.includes(type)
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fuel Type */}
        <div>
          <button
            onClick={() => toggleSection("fuelType")}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h2 className="text-sm font-semibold text-foreground group-hover:text-accent transition">
              Fuel Type
            </h2>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedSections["fuelType"] ? "" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections["fuelType"] && (
            <div className="flex flex-wrap gap-2">
              {fuelTypeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFuelTypeToggle(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    filters.fuelTypes.includes(type)
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Importance Weights */}
        <div>
          <button
            onClick={() => toggleSection("weights")}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h2 className="text-sm font-semibold text-foreground group-hover:text-accent transition">
              Importance Weights
            </h2>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedSections["weights"] ? "" : "-rotate-90"
              }`}
            />
          </button>
          {expandedSections["weights"] && (
            <div className="space-y-4">
              {["budget", "efficiency", "safety"].map((key) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium text-foreground capitalize">
                      {key}
                    </label>
                    <span className="text-xs font-semibold text-accent">
                      {filters.weights[key as keyof typeof filters.weights]}/5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={filters.weights[key as keyof typeof filters.weights]}
                    onChange={(e) =>
                      handleWeightChange(
                        key as "budget" | "efficiency" | "safety",
                        Number(e.target.value),
                      )
                    }
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 py-3 px-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition"
        >
          Find My Perfect Car
        </button>
      </div>
    </div>
  );
}
