import { PropertyCard } from "./components/card/card";
import { PropertyListProps } from "./types";

export function PropertyList({ properties }: PropertyListProps) {
  if (!properties?.length)
    return <p className="text-center text-zinc-500">No properties found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}
