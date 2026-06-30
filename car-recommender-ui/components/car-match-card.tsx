"use client";

import { Heart } from "lucide-react";
import { Car } from "@/lib/car-data";
import { useState } from "react";

interface CarMatchCardProps {
  car: Car;
}

export default function CarMatchCard({ car }: CarMatchCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`;
    return `₹${price}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-emerald-400";
    if (score >= 75) return "from-emerald-500 to-emerald-400";
    if (score >= 60) return "from-emerald-600 to-emerald-500";
    return "from-emerald-700 to-emerald-600";
  };

  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-muted">
        <img
          src={car.image ?? "/car-placeholder.png"}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Year Badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-foreground">
          {car.year ?? "2025"}
        </div>

        {/* Match Badge */}
        <div className="absolute top-3 right-3 bg-accent px-3 py-1.5 rounded-full text-xs font-bold text-accent-foreground shadow-lg">
          {car.matchPercentage ?? 0}% Match
        </div>

        {/* Save Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          <Heart
            className={`w-5 h-5 ${isSaved ? "fill-accent text-accent" : "text-foreground"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Make & Model */}
        <div className="mb-3">
          <p className="text-xs text-muted-foreground font-medium">
            {car.make}
          </p>
          <h3 className="text-lg font-bold text-foreground">
            {car.model}{" "}
            <span className="text-sm text-muted-foreground font-normal">
              {car.variant}
            </span>
          </h3>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-accent">
            {formatPrice(car.price)}
          </p>
        </div>

        {/* Specs Row */}
        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Mileage</p>
            <p className="text-sm font-semibold text-foreground">
              {car.mpg ?? "N/A"} km/l
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Seats</p>
            <p className="text-sm font-semibold text-foreground">
              {car.seats ?? "N/A"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Safety</p>
            <p className="text-sm font-semibold text-foreground">
              {"⭐".repeat(car.safetyRating ?? 0)}
            </p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-2">
          {[
            {
              label: "Budget",
              value: car.scoreBreakdown?.budget ?? 0,
            },
            {
              label: "Efficiency",
              value: car.scoreBreakdown?.efficiency ?? 0,
            },
            {
              label: "Safety",
              value: car.scoreBreakdown?.safety ?? 0,
            },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-foreground">
                  {item.label}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {item.value}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreColor(item.value)} transition-all duration-300`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-border flex gap-2">
          <button className="flex-1 py-2 px-3 bg-accent text-accent-foreground rounded font-medium text-sm hover:opacity-90 transition">
            View Details
          </button>
          <button className="flex-1 py-2 px-3 bg-muted text-foreground rounded font-medium text-sm hover:bg-muted/80 transition">
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}
