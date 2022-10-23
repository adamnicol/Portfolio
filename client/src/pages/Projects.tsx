import Project from "../components/projects/Project";
import list from "./content/projects";

function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      {list.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </div>
  );
}

export default Projects;
