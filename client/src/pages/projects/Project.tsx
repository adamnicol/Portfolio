import { Image } from "@components";
import { IProject } from "@interfaces";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export function Project(props: { project: IProject }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { project } = props;

  const thumbnail = `projects/${project.slug}/${project.thumbnail}`;

  function setSearchFilter(tag: string) {
    searchParams.set("search", encodeURIComponent(tag));
    setSearchParams(searchParams);
  }

  return (
    <article className="callout">
      <div className="d-flex">
        <div className="d-flex flex-column text-center text-small">
          <Link to={`/project/${project.slug}`} title={project.name}>
            <Image id={thumbnail} className="project-image" />
          </Link>
          <a
            href={project.website}
            title="Website"
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
          <a
            href={project.github}
            title="GitHub"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className="vr ms-3 me-3" />
        <div className="d-flex flex-column">
          <h4>
            <Link to={`/project/${project.slug}`}>{project.name}</Link>
          </h4>
          <p>{project.description}</p>
          <div className="d-flex flex-wrap mt-3">
            {project.tags.map((tag) => (
              <a
                key={tag.id}
                className="tag"
                onClick={() => setSearchFilter(tag.name)}
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
