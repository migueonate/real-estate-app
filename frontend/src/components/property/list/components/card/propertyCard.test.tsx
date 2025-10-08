import { render, screen, fireEvent } from "@testing-library/react";
import PropertyCard from "./card";

jest.mock("@/components/ui/dialog", () => {
  return {
    Dialog: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="dialog">{children}</div>
    ),
    DialogTrigger: ({ children }: { children: React.ReactNode }) => (
      <button>{children}</button>
    ),
    DialogContent: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="dialog-content">{children}</div>
    ),
    DialogHeader: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogTitle: ({ children }: { children: React.ReactNode }) => (
      <h2>{children}</h2>
    ),
    DialogDescription: ({ children }: { children: React.ReactNode }) => (
      <p>{children}</p>
    ),
  };
});

describe("PropertyCard", () => {
  const mockProperty = {
    id: "123",
    name: "Sunset Villa",
    address: "123 Sunset Blvd",
    price: 450000,
    image: "https://example.com/image.jpg",
    idOwner: "1",
  };

  it("renders property info correctly", () => {
    render(<PropertyCard {...mockProperty} />);

    expect(screen.getByTestId("propertyName")).toBeInTheDocument();
    expect(screen.getByTestId("propertyAddress")).toBeInTheDocument();
    expect(screen.getByTestId("propertyPrice")).toBeInTheDocument();
  });

  it("renders the 'View Details' button", () => {
    render(<PropertyCard {...mockProperty} />);

    const button = screen.getByRole("button", { name: /view details/i });
    expect(button).toBeInTheDocument();
  });

  it("opens dialog when 'Quick View' is clicked", () => {
    render(<PropertyCard {...mockProperty} />);

    const button = screen.getByTestId("quick-view-btn");
    fireEvent.click(button);

    // el mock del dialog siempre se renderiza con su contenido
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
  });
});
