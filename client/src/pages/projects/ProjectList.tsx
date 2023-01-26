import Project from "./Project";
import { IProject } from "../../api/interfaces";
import { projects as data } from "../content/projects";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState<IProject[]>(data);
  const [searchParams] = useSearchParams();

  const search = decodeURIComponent(searchParams.get("search") ?? "").trim();
  const stage = decodeURIComponent(searchParams.get("stage") ?? "").trim();

  useEffect(() => {
    let filtered = data;

    if (search) {
      const value = search.toLowerCase();
      filtered = data.filter(
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

    setProjects(filtered);
  }, [searchParams]);

  if (projects.length > 0) {
    return (
      <>
        <h1>Projects</h1>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </>
    );
  } else {
    return (
      <>
        <h1>Projects</h1>
        <p>Your search returned no results.</p>
      </>
    );
  }
}

export default ProjectList;
