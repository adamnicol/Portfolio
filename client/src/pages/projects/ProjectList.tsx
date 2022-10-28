import Project from "./Project";
import projects from "../content/projects";

function ProjectList() {
  return (
    <div>
      <h1>Projects</h1>
      {projects.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;
