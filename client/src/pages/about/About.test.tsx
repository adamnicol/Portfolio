import { About } from "./About";
import { render, screen } from "@testing-library/react";

describe("About", () => {
  beforeEach(() => {
    render(<About />);
  });

  test("Heading is shown", () => {
    expect(screen.getByRole("heading")).toHaveTextContent("About");
  });

  test("Image is shown", () => {
    const image = screen.queryByRole("img");
    expect(image).toBeInTheDocument();
  });
});
