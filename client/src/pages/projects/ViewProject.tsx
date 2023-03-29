import { Carousel } from "react-responsive-carousel";
import { Image } from "@components";
import { Link } from "react-router-dom";
import { projects } from "./ProjectList.data";
import { useParams } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export function ViewProject() {
  const { slug } = useParams();
  const project = projects.find((x) => x.slug === slug);

  if (!project) {
    return <p>Project not found.</p>;
  }

  const images = project.images.map((image, index) => (
    <Image key={index} id={`projects/${project.slug}/${image}`} />
  ));

  return (
    <>
      <h1>{project?.name}</h1>
      <p>{project.description}</p>

      <dl className="row m-0 mt-4">
        <dt className="col-sm-2">Status</dt>
        <dd className="col-sm-10">
          {project.complete ? "Complete" : "Development"}
        </dd>

        <dt className="col-sm-2">Website</dt>
        <dd className="col-sm-10">
          <a href={project.website} target="_blank" rel="noreferrer">
            {project.website.replace("https://", "")}
          </a>
        </dd>
        <dt className="col-sm-2">Github</dt>
        <dd className="col-sm-10">
          <a href={project.github} target="_blank" rel="noreferrer">
            {project.github.replace("https://", "")}
          </a>
        </dd>
      </dl>

      <h2 className="mt-4">Features</h2>
      <ul>
        {project.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {project.images.length > 0 && (
        <>
          <h2 className="mt-4">Screenshots</h2>
          <Carousel className="mt-3" renderThumbs={() => images}>
            {images}
          </Carousel>
        </>
      )}

      <Link to="/projects">&lt; Return to project list</Link>
    </>
  );
}
