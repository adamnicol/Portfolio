import Project from "./Project";
import { IProject } from "../../api/interfaces";
import { projects as data } from "../content/projects";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState<IProject[]>(data);
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => filterProjects(), [search]);

  function filterProjects() {
    let filtered = data;

    if (search) {
      const value = decodeURIComponent(search.toLowerCase()).trim();
      filtered = data.filter(
        (project) =>
          project.name.toLowerCase().includes(value) ||
          project.tags.some((tag) => tag.name.toLowerCase().includes(value))
      );
    }

    setProjects(filtered);
  }

  if (projects.length === 0) {
    return (
      <>
        <h1>Projects</h1>
        <p>Your search for "{search}" returned no results.</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Projects</h1>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </>
    );
  }
}

export default ProjectList;
