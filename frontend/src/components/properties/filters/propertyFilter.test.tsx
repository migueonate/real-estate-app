import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyFilter } from "./index";
import { usePropertyFilters } from "@/components/hooks/usePropertyFilters";

jest.mock("@/components/hooks/usePropertyFilters");

describe("PropertyFilter", () => {
  const mockOnFilter = jest.fn();

  const mockHookReturn = {
    filters: {
      name: "",
      address: "",
      minPrice: "",
      maxPrice: "",
    },
    updateField: jest.fn(),
    submitFilters: jest.fn(),
    resetFilters: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePropertyFilters as jest.Mock).mockReturnValue(mockHookReturn);
  });

  it("renders all form inputs and buttons", () => {
    render(<PropertyFilter onFilter={mockOnFilter} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("calls updateField when inputs change", () => {
    render(<PropertyFilter onFilter={mockOnFilter} />);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "Villa" } });

    expect(mockHookReturn.updateField).toHaveBeenCalledWith("name", "Villa");
  });

  it("calls submitFilters when form is submitted", () => {
    render(<PropertyFilter onFilter={mockOnFilter} />);

    const form = screen.getByTestId("filter-form");

    fireEvent.submit(form);

    expect(mockHookReturn.submitFilters).toHaveBeenCalled();
  });

  it("calls resetFilters when clicking Reset", () => {
    render(<PropertyFilter onFilter={mockOnFilter} />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    expect(mockHookReturn.resetFilters).toHaveBeenCalled();
  });
});
