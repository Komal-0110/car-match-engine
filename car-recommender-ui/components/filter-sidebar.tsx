'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FilterSidebarProps {
  filters: any
  setFilters: (filters: any) => void
  resultsCount: number
}

export default function FilterSidebar({ filters, setFilters, resultsCount }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    price: true,
    mileage: true,
    bodyType: false,
    fuelType: false,
    transmission: false,
    safety: false,
    sort: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const formatPrice = (price: number) => `$${(price / 1000).toFixed(0)}k`
  const formatMileage = (miles: number) => `${(miles / 1000).toFixed(0)}k`

  const bodyTypes = ['Sedan', 'SUV', 'Coupe', 'Truck', 'Wagon']
  const fuelTypes = ['Gasoline', 'Diesel', 'Hybrid', 'Electric']
  const transmissionTypes = ['Automatic', 'Manual']

  return (
    <aside className="w-80 border-r border-border bg-sidebar px-6 py-8 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-sidebar-foreground mb-2">Filters</h2>
        <p className="text-sm text-muted-foreground">{resultsCount} cars found</p>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex w-full items-center justify-between pb-4 text-sm font-semibold text-sidebar-foreground hover:text-accent transition-colors"
        >
          Price Range
          <ChevronDown
            className={`h-4 w-4 transition-transform ${openSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.price && (
          <div className="space-y-4 pb-4 border-b border-sidebar-border">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                Min: {formatPrice(filters.priceRange[0])}
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [parseInt(e.target.value), filters.priceRange[1]],
                  })
                }
                className="w-full h-2 bg-sidebar-accent rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                Max: {formatPrice(filters.priceRange[1])}
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                  })
                }
                className="w-full h-2 bg-sidebar-accent rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mileage Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('mileage')}
          className="flex w-full items-center justify-between pb-4 text-sm font-semibold text-sidebar-foreground hover:text-accent transition-colors"
        >
          Mileage
          <ChevronDown
            className={`h-4 w-4 transition-transform ${openSections.mileage ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.mileage && (
          <div className="space-y-4 pb-4 border-b border-sidebar-border">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                Min: {formatMileage(filters.mileageRange[0])}
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.mileageRange[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    mileageRange: [parseInt(e.target.value), filters.mileageRange[1]],
                  })
                }
                className="w-full h-2 bg-sidebar-accent rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                Max: {formatMileage(filters.mileageRange[1])}
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={filters.mileageRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    mileageRange: [filters.mileageRange[0], parseInt(e.target.value)],
                  })
                }
                className="w-full h-2 bg-sidebar-accent rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Body Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('bodyType')}
          className="flex w-full items-center justify-between pb-4 text-sm font-semibold text-sidebar-foreground hover:text-accent transition-colors"
        >
          Body Type
          <ChevronDown
            className={`h-4 w-4 transition-transform ${openSections.bodyType ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.bodyType && (
          <div className="space-y-3 pb-4 border-b border-sidebar-border">
            {bodyTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.bodyType.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        bodyType: [...filters.bodyType, type],
                      })
                    } else {
                      setFilters({
                        ...filters,
                        bodyType: filters.bodyType.filter((t: string) => t !== type),
                      })
                    }
                  }}
                  className="w-4 h-4 rounded accent-accent"
                />
                <span className="text-sm text-sidebar-foreground">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Fuel Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('fuelType')}
          className="flex w-full items-center justify-between pb-4 text-sm font-semibold text-sidebar-foreground hover:text-accent transition-colors"
        >
          Fuel Type
          <ChevronDown
            className={`h-4 w-4 transition-transform ${openSections.fuelType ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.fuelType && (
          <div className="space-y-3 pb-4 border-b border-sidebar-border">
            {fuelTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.fuelType.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        fuelType: [...filters.fuelType, type],
                      })
                    } else {
                      setFilters({
                        ...filters,
                        fuelType: filters.fuelType.filter((t: string) => t !== type),
                      })
                    }
                  }}
                  className="w-4 h-4 rounded accent-accent"
                />
                <span className="text-sm text-sidebar-foreground">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Transmission */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('transmission')}
          className="flex w-full items-center justify-between pb-4 text-sm font-semibold text-sidebar-foreground hover:text-accent transition-colors"
        >
          Transmission
          <ChevronDown
            className={`h-4 w-4 transition-transform ${openSections.transmission ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.transmission && (
          <div className="space-y-3 pb-4 border-b border-sidebar-border">
            {transmissionTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.transmission.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        transmission: [...filters.transmission, type],
                      })
                    } else {
                      setFilters({
                        ...filters,
                        transmission: filters.transmission.filter((t: string) => t !== type),
                      })
                    }
                  }}
                  className="w-4 h-4 rounded accent-accent"
                />
                <span className="text-sm text-sidebar-foreground">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Safety Rating */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('safety')}
          className="flex w-full items-center justify-between pb-4 text-sm font-semibold text-sidebar-foreground hover:text-accent transition-colors"
        >
          Safety Rating
          <ChevronDown
            className={`h-4 w-4 transition-transform ${openSections.safety ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.safety && (
          <div className="space-y-2 pb-4 border-b border-sidebar-border">
            {[0, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="safety"
                  checked={filters.minSafetyRating === rating}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      minSafetyRating: rating,
                    })
                  }
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-sidebar-foreground">
                  {rating === 0 ? 'Any' : `${rating}+ Stars`}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('sort')}
          className="flex w-full items-center justify-between pb-4 text-sm font-semibold text-sidebar-foreground hover:text-accent transition-colors"
        >
          Sort By
          <ChevronDown
            className={`h-4 w-4 transition-transform ${openSections.sort ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.sort && (
          <div className="space-y-2 pb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === 'price-asc'}
                onChange={() => setFilters({ ...filters, sortBy: 'price-asc' })}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-sidebar-foreground">Price: Low to High</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === 'price-desc'}
                onChange={() => setFilters({ ...filters, sortBy: 'price-desc' })}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-sidebar-foreground">Price: High to Low</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === 'mileage-asc'}
                onChange={() => setFilters({ ...filters, sortBy: 'mileage-asc' })}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-sidebar-foreground">Mileage: Low to High</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === 'rating-desc'}
                onChange={() => setFilters({ ...filters, sortBy: 'rating-desc' })}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-sidebar-foreground">Safety: High to Low</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === 'newest'}
                onChange={() => setFilters({ ...filters, sortBy: 'newest' })}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-sidebar-foreground">Year: Newest First</span>
            </label>
          </div>
        )}
      </div>

      {/* Reset Filters */}
      <button
        onClick={() =>
          setFilters({
            priceRange: [0, 200000],
            mileageRange: [0, 200000],
            bodyType: [],
            fuelType: [],
            transmission: [],
            minSafetyRating: 0,
            sortBy: 'price-asc',
          })
        }
        className="w-full rounded-lg border border-sidebar-border bg-sidebar hover:bg-sidebar-accent px-4 py-2 text-sm font-medium text-sidebar-foreground transition-colors"
      >
        Reset Filters
      </button>
    </aside>
  )
}
