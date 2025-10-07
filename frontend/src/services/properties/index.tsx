import { useQuery } from "@tanstack/react-query";
import { PROPERTIES_API_URL, PROPERTIES_QUERY_KEY } from "./constants";
import { PropertyFilters } from "./types";

export async function fetchProperties(params?: PropertyFilters) {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const res = await fetch(`${PROPERTIES_API_URL}?${query}`);
  if (!res.ok) throw new Error("Error fetching properties");
  return res.json();
}

export function useProperties(filters: PropertyFilters) {
  return useQuery({
    queryKey: [PROPERTIES_QUERY_KEY, filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes without unnecessary refetch
    refetchOnWindowFocus: false, // avoid refetch when coming back from another tab
  });
}

export async function fetchPropertyById(id: string) {
  const res = await fetch(`${PROPERTIES_API_URL}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch property ${id}`);
  return res.json();
}

export function usePropertyById(id: string) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyById(id),
    staleTime: 1000 * 60 * 2,
    retry: 1, // reintento en caso de fallo
  });
}
