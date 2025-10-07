"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCardProps } from "./types";
import { useMemo } from "react";

export function PropertyCard({
  address,
  image,
  name,
  price,
}: PropertyCardProps) {
  const imageSrc = useMemo(
    () => (image && image.startsWith("http") ? image : "/placeholder.jpg"),
    [image]
  );

  return (
    <Card className="hover:shadow-lg transition-all cursor-pointer rounded-xl overflow-hidden">
      <CardHeader className="p-0">
        <img src={imageSrc} alt={name} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <CardTitle className="text-lg font-semibold text-zinc-800">
          {name}
        </CardTitle>
        <p className="text-sm text-zinc-500">{address}</p>
        <p className="text-base font-bold text-blue-600">
          ${price.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
