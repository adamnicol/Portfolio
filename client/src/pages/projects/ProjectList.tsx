import { IProject } from "@interfaces";
import { Project } from "./Project";
import { projects } from "./ProjectList.data";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function ProjectList() {
  const [filtered, setFiltered] = useState<IProject[]>(projects);
  const [searchParams] = useSearchParams();

  const search = decodeURIComponent(searchParams.get("search") ?? "").trim();
  const stage = decodeURIComponent(searchParams.get("stage") ?? "").trim();

  useEffect(() => {
    setFiltered(filterProjects(search, stage));
  }, [searchParams]);

  return (
    <>
      <h1>Projects</h1>
      {filtered.length === 0 && <p>Your search returned no results.</p>}
      {filtered?.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </>
  );
}

function filterProjects(search: string, stage: string) {
  let filtered = projects;

  if (search) {
    const value = search.toLowerCase();
    filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(value) ||
        project.tags.some((tag) => tag.name.toLowerCase().includes(value))
    );
  }

  if (stage) {
    switch (stage.toLowerCase()) {
      case "complete":
        filtered = filtered.filter((project) => project.complete);
        break;
      case "development":
        filtered = filtered.filter((project) => !project.complete);
        break;
    }
  }

  return filtered;
}
