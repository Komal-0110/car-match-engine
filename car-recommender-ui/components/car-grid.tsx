"use client";

import { Heart, Zap, Gauge, Fuel } from "lucide-react";
import { Car } from "@/lib/car-data";
import { useState } from "react";

interface CarGridProps {
  cars: Car[];
}

export default function CarGrid({ cars }: CarGridProps) {
  const [savedCars, setSavedCars] = useState<number[]>([]);

  const toggleSaveCar = (carId: number) => {
    setSavedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId],
    );
  };

  return (
    <main className="flex-1 bg-background p-8">
      {cars.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="rounded-full bg-card p-4 mb-4">
            <Gauge className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No cars found
          </h2>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your filters to find the perfect car that matches your
            criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground text-balance">
              Find Your Perfect Car
            </h2>
            <p className="text-muted-foreground mt-2">
              {cars.length} vehicle{cars.length !== 1 ? "s" : ""} matching your
              criteria
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="group overflow-hidden rounded-xl bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaveCar(car.id)}
                    className="absolute right-4 top-4 rounded-full bg-card/80 backdrop-blur p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                    aria-label="Save car"
                  >
                    <Heart
                      className={`h-5 w-5 ${savedCars.includes(car.id) ? "fill-current text-accent" : ""}`}
                    />
                  </button>

                  {/* Year Badge */}
                  <div className="absolute left-4 top-4 rounded-lg bg-card/80 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
                    {car.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground text-balance">
                      {car.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {car.bodyType} • {car.fuelType}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-accent">
                      ${(car.price / 1000).toFixed(0)}k
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {car.color}
                    </span>
                  </div>

                  {/* Specs Grid */}
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Mileage
                      </p>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-accent" />
                        <p className="text-sm font-semibold text-foreground">
                          {(car.mileage / 1000).toFixed(0)}k mi
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Fuel Economy
                      </p>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-accent" />
                        <p className="text-sm font-semibold text-foreground">
                          {car.mpg} MPG
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Power
                      </p>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <p className="text-sm font-semibold text-foreground">
                          {car.horsepower} hp
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Safety
                      </p>
                      <div className="flex items-center gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className={`h-4 w-4 rounded ${
                                i < car.safetyRating ? "bg-accent" : "bg-muted"
                              }`}
                            />
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mb-4 space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">
                        Transmission
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {car.transmission}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity">
                      View Details
                    </button>
                    <button className="flex-1 rounded-lg border border-accent px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10 transition-colors">
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
