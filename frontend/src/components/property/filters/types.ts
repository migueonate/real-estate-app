import { PropertyFilters } from "@/services/properties/types";

export type PropertyFilterProps = {
  onFilter: (filters: PropertyFilters) => void;
};
