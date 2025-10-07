import { useState } from "react";

export function usePropertyFilters(
  onFilter: (f: Record<string, string>) => void
) {
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    minPrice: "",
    maxPrice: "",
  });

  const updateField = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const submitFilters = () => {
    const paramsToSearch = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value != null && String(value).trim() !== ""
      )
    );
    onFilter(paramsToSearch);
  };

  const resetFilters = () => {
    setFilters({ name: "", address: "", minPrice: "", maxPrice: "" });
    onFilter({});
  };

  return { filters, updateField, submitFilters, resetFilters };
}
