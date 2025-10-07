"use client";
import { usePropertyFilters } from "@/components/hooks/usePropertyFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyFilterProps } from "./types";

export function PropertyFilter({ onFilter }: PropertyFilterProps) {
  const { filters, updateField, submitFilters, resetFilters } =
    usePropertyFilters(onFilter);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitFilters();
      }}
      className="bg-white border rounded-xl p-4 shadow-sm grid gap-4 md:grid-cols-4 lg:grid-cols-6 items-end"
    >
      {/* Name */}
      <div className="flex flex-col col-span-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="e.g. Green Villa"
          value={filters.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col col-span-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="e.g. Sunset Blvd"
          value={filters.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Min Price */}
      <div className="flex flex-col">
        <Label htmlFor="minPrice">Min</Label>
        <Input
          id="minPrice"
          type="number"
          placeholder="0"
          value={filters.minPrice}
          onChange={(e) => updateField("minPrice", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Max Price */}
      <div className="flex flex-col">
        <Label htmlFor="maxPrice">Max</Label>
        <Input
          id="maxPrice"
          type="number"
          placeholder="100000"
          value={filters.maxPrice}
          onChange={(e) => updateField("maxPrice", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 col-span-full md:col-span-2 lg:col-span-1">
        <Button type="submit" className="flex-1">
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={resetFilters}
          className="flex-1"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
