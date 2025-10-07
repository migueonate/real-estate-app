"use client";

import { usePropertyById } from "@/services/properties";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PropertyDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: property, isLoading, error } = usePropertyById(id);

  if (isLoading) return <p>Loading property...</p>;
  if (error)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;
  if (!property) return <p>No property found</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-4 pt-5">
      <Button
        onClick={() => router.push("/")}
        variant="ghost"
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-80 object-cover rounded-xl"
      />
      <h1 className="text-3xl font-bold">{property.name}</h1>
      <p className="text-gray-600">{property.address}</p>
      <p className="text-2xl text-blue-600 font-semibold">${property.price}</p>
      <p className="text-sm text-gray-500">Owner ID: {property.idOwner}</p>
    </div>
  );
}
