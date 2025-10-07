"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropertyCardProps } from "./types";
import { useMemo } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

export function PropertyCard({
  address,
  image,
  name,
  price,
  id,
}: PropertyCardProps) {
  const imageSrc = useMemo(
    () => (image && image.startsWith("http") ? image : "/placeholder.jpg"),
    [image]
  );

  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition">
      <img src={imageSrc} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{address}</p>
        <p className="text-blue-600 font-bold">${price}</p>

        <div className="flex items-center gap-2 pt-2">
          <Link href={`/properties/${id}`} className="flex-1">
            <Button className="w-full" variant="default">
              View details
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" title="Fast view">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <img
                  src={imageSrc}
                  alt={name}
                  className="w-full h-56 object-cover rounded-md"
                />
                <p className="text-gray-600 text-sm">{address}</p>
                <p className="text-2xl font-semibold text-blue-600">${price}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
