"use client";

import { useState } from "react";
import { useProperties } from "@/services/properties";
import { PropertyFilter } from "@/components/properties/filters";
import { PropertyList } from "@/components/properties/list";
import { PropertyFilters } from "@/services/properties/types";

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const { data, isLoading, isError } = useProperties(filters);

  return (
    <main className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-zinc-800">Property Listings</h1>
      <PropertyFilter onFilter={setFilters} />

      {isLoading && (
        <p className="text-center text-zinc-500">Loading properties...</p>
      )}

      {isError && (
        <p className="text-center text-red-500">
          Error loading properties. Try again later.
        </p>
      )}

      {data && <PropertyList properties={data} />}
    </main>
  );
}
