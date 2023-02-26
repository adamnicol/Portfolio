import { projects } from "./ProjectList.data";
import { ProjectList } from "./ProjectList";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("ProjectList", () => {
  test("Heading is shown", () => {
    render(
      <MemoryRouter initialEntries={["?stage=all"]}>
        <ProjectList />
      </MemoryRouter>
    );
    const heading = screen.queryByRole("heading", { name: "Projects" });
    expect(heading).toBeInTheDocument();
  });

  test("Correct number of projects are shown", () => {
    render(
      <MemoryRouter initialEntries={["?stage=all"]}>
        <ProjectList />
      </MemoryRouter>
    );
    const articles = screen.queryAllByRole("article");
    expect(articles).toHaveLength(projects.length);
  });

  test("Filter projects on complete", () => {
    render(
      <MemoryRouter initialEntries={["?stage=complete"]}>
        <ProjectList />
      </MemoryRouter>
    );
    const articles = screen.queryAllByRole("article");
    const completedProjects = projects.filter((project) => project.complete);
    expect(articles).toHaveLength(completedProjects.length);
  });

  test("Filter projects on in-development", () => {
    render(
      <MemoryRouter initialEntries={["?stage=development"]}>
        <ProjectList />
      </MemoryRouter>
    );
    const articles = screen.queryAllByRole("article");
    const inDevelopment = projects.filter((project) => !project.complete);
    expect(articles).toHaveLength(inDevelopment.length);
  });

  test("Filters projects based on search parameters", () => {
    render(
      <MemoryRouter initialEntries={["?search=react"]}>
        <ProjectList />
      </MemoryRouter>
    );
    const articles = screen.queryAllByRole("article");
    const matches = projects.filter((project) =>
      project.tags.find((tag) => tag.name.toLowerCase() === "react")
    );
    expect(articles).toHaveLength(matches.length);
  });

  test("Notifies the user when the search returns no results", () => {
    render(
      <MemoryRouter initialEntries={["?search=nothing"]}>
        <ProjectList />
      </MemoryRouter>
    );
    const message = screen.getByText("Your search returned no results.");
    expect(message).toBeInTheDocument();
  });
});
