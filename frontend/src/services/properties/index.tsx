import { useQuery } from "@tanstack/react-query";
import { PROPERTIES_API_URL, PROPERTIES_QUERY_KEY } from "./constants";

export async function fetchProperties(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${PROPERTIES_API_URL}?${query}`);
  if (!res.ok) throw new Error("Error fetching properties");
  return res.json();
}

export function useProperties(filters: Record<string, string>) {
  return useQuery({
    queryKey: [PROPERTIES_QUERY_KEY, filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes without unnecessary refetch
    refetchOnWindowFocus: false, // avoid refetch when coming back from another tab
  });
}
