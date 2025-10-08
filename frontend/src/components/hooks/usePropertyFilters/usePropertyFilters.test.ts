import { renderHook, act } from "@testing-library/react";
import { usePropertyFilters } from "@/components/hooks/usePropertyFilters";

describe("usePropertyFilters", () => {
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty filters", () => {
    const { result } = renderHook(() => usePropertyFilters(mockOnFilter));

    expect(result.current.filters).toEqual({
      name: "",
      address: "",
      minPrice: "",
      maxPrice: "",
    });
  });

  it("should update filter field correctly", () => {
    const { result } = renderHook(() => usePropertyFilters(mockOnFilter));

    act(() => {
      result.current.updateField("name", "Villa");
    });

    expect(result.current.filters.name).toBe("Villa");
  });

  it("should call onFilter with non-empty filters when submitting", () => {
    const { result } = renderHook(() => usePropertyFilters(mockOnFilter));

    act(() => {
      result.current.updateField("name", "Sunset");
    });

    act(() => {
      result.current.submitFilters();
    });

    expect(mockOnFilter).toHaveBeenCalledWith({ name: "Sunset" });
  });

  it("should call onFilter with empty object when resetting", () => {
    const { result } = renderHook(() => usePropertyFilters(mockOnFilter));

    act(() => {
      result.current.updateField("name", "Green Villa");
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual({
      name: "",
      address: "",
      minPrice: "",
      maxPrice: "",
    });
    expect(mockOnFilter).toHaveBeenCalledWith({});
  });

  it("should ignore empty or whitespace values on submit", () => {
    const { result } = renderHook(() => usePropertyFilters(mockOnFilter));

    act(() => {
      result.current.updateField("name", "   ");
    });

    act(() => {
      result.current.updateField("address", "NYC");
    });

    act(() => {
      result.current.submitFilters();
    });

    expect(mockOnFilter).toHaveBeenCalledWith({ address: "NYC" });
  });
});
