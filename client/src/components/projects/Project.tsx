import { IProject } from "../../api/interfaces";
import { Link } from "react-router-dom";

function Project(props: { project: IProject }) {
  const { project } = props;

  return (
    <article className="callout">
      <div className="d-flex">
        <div className="d-flex flex-column text-center text-small">
          <img
            src={require("../../assets/thumbnail.jpg")}
            className="project-image"
            alt="image"
          />
          <a href={project.website} title="Website" target="_blank">
            Website
          </a>
          <a href={project.github} title="GitHub" target="_blank">
            GitHub
          </a>
        </div>
        <div className="vr ms-3 me-3" />
        <div className="d-flex flex-column">
          <h4>
            <Link to="/projects">{project.name}</Link>
          </h4>
          <p>{project.description}</p>
          <div className="d-flex flex-wrap mt-3">
            {project.tags.map((tag) => (
              <a key={tag.id} className="tag">
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Project;
