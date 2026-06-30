"use client";

import { useState, useMemo } from "react";
import PreferenceEngine from "@/components/preference-engine";
import SmartShortlist from "@/components/smart-shortlist";
import { Car, carData } from "@/lib/car-data";

export interface Filter {
  maxBudget: number;
  minSeats: number;
  bodyStyles: string[];
  fuelTypes: string[];
  weights: {
    budget: number;
    efficiency: number;
    safety: number;
  };
}

export default function Page() {
  const [filters, setFilters] = useState<Filter>({
    maxBudget: 5000000,
    minSeats: 0,
    bodyStyles: [] as string[],
    fuelTypes: [] as string[],
    weights: { budget: 3, efficiency: 3, safety: 3 },
  });

  const [cars, setCars] = useState<Car[]>([]);

  return (
    <main className="min-h-screen bg-background flex">
      <PreferenceEngine
        filters={filters}
        setFilters={setFilters}
        setCars={setCars}
      />
      <SmartShortlist cars={cars} />
    </main>
  );
}
