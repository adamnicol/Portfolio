import { companies } from "./Experience.data";
import { Experience } from "./Experience";
import { render, screen, within } from "@testing-library/react";

describe("Experience", () => {
  beforeEach(() => {
    render(<Experience />);
  });

  test("Heading is shown", () => {
    const heading = screen.queryByRole("heading", { name: "Experience" });
    expect(heading).toBeInTheDocument();
  });

  test("Correct number of companies are shown", () => {
    const articles = screen.queryAllByRole("article");
    expect(articles).toHaveLength(companies.length);
  });

  test("Company details are shown", () => {
    const articles = screen.getAllByRole("article");
    companies.forEach((company, index) => {
      expect(articles[index]).toHaveTextContent(company.name);
      expect(articles[index]).toHaveTextContent(company.position);
      expect(articles[index]).toHaveTextContent(
        `${company.from} - ${company.to}`
      );
    });
  });

  test("Company logo is shown", () => {
    const articles = screen.getAllByRole("article");
    companies.forEach((company, index) => {
      const logo = within(articles[index]).queryByAltText("logo");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", company.logo);
    });
  });

  test("All responsibilities are shown", () => {
    const articles = screen.getAllByRole("article");
    companies.forEach((company, index) => {
      company.responsibilities.forEach((responsibility) => {
        expect(articles[index]).toHaveTextContent(responsibility);
      });
    });
  });
});
