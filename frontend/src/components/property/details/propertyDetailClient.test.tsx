import { render, screen, fireEvent } from "@testing-library/react";
import { usePropertyById } from "@/services/properties";
import { useRouter } from "next/navigation";
import PropertyDetailClient from "./index";

// Mock de React Query y Router
jest.mock("@/services/properties");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("PropertyDetailClient", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (usePropertyById as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(<PropertyDetailClient id="123" />);
    expect(screen.getByText(/loading property/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (usePropertyById as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: new Error("Failed to fetch"),
    });

    render(<PropertyDetailClient id="123" />);
    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });

  it("renders no property state", () => {
    (usePropertyById as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: null,
    });

    render(<PropertyDetailClient id="123" />);
    expect(screen.getByText(/no property found/i)).toBeInTheDocument();
  });

  it("renders property data correctly", () => {
    (usePropertyById as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        id: "123",
        name: "Ocean Breeze Apartment",
        address: "45 Beachside Ave, Miami, FL",
        price: 320000,
        image: "https://example.com/image.jpg",
        idOwner: "2",
      },
    });

    render(<PropertyDetailClient id="123" />);

    expect(screen.getByText("Ocean Breeze Apartment")).toBeInTheDocument();
    expect(screen.getByText(/miami/i)).toBeInTheDocument();
    expect(screen.getByText(/\$320000/i)).toBeInTheDocument();
    expect(screen.getByText(/owner id: 2/i)).toBeInTheDocument();
  });

  it("navigates back to home when clicking Back button", () => {
    (usePropertyById as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        id: "123",
        name: "Ocean Breeze Apartment",
        address: "45 Beachside Ave, Miami, FL",
        price: 320000,
        image: "https://example.com/image.jpg",
        idOwner: "2",
      },
    });

    render(<PropertyDetailClient id="123" />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
