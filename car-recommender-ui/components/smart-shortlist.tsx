"use client";

import { Car } from "@/lib/car-data";
import CarMatchCard from "./car-match-card";

interface SmartShortlistProps {
  cars: Car[];
}

export default function SmartShortlist({ cars }: SmartShortlistProps) {
  return (
    <div className="flex-1 bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border p-6 z-10">
        <h2 className="text-2xl font-bold text-foreground">
          <span className="text-accent">{cars.length}</span> Matches Found
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Ranked by match percentage
        </p>
      </div>

      {/* Grid */}
      <div className="p-6">
        {cars.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground mb-2">
                No matches found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your preferences
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {cars
              .sort((a, b) => b.matchPercentage - a.matchPercentage)
              .map((car) => (
                <CarMatchCard key={car.id} car={car} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
