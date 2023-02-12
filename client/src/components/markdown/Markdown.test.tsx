import { Markdown } from "./Markdown";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

describe("Markdown", () => {
  test("Component is rendered", () => {
    render(<Markdown># H1</Markdown>);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  test("External links should open a new tab", () => {
    render(<Markdown>[Example link](www.adamnicol.dev)</Markdown>);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveProperty("target", "_blank");
  });

  test("Internal links should not open a new tab", () => {
    render(
      <MemoryRouter>
        <Markdown>[Example link](/news)</Markdown>
      </MemoryRouter>
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).not.toHaveProperty("target", "_blank");
  });
});
