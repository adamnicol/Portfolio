import Project from "../components/projects/Project";
import list from "../components/content/projects";

function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      {list.map((project) => (
        <Project project={project} />
      ))}
    </div>
  );
}

export default Projects;
