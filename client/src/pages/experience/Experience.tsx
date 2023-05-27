import { Collapse } from "react-bootstrap";
import { companies, ICompany } from "./Experience.data";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useImage } from "@hooks";

export function Experience() {
  return (
    <>
      <h1>Experience</h1>
      {companies.map((company, index) => (
        <Company key={index} company={company} />
      ))}
    </>
  );
}

function Company(props: { company: ICompany }) {
  const { company } = props;
  const [expanded, setExpanded] = useState(true);

  const image = useImage(company.logo);

  return (
    <article className="callout">
      <div className="d-flex text-small text-secondary">
        <a href={company.website} target="_blank" rel="noreferrer">
          <img src={image} className="employer-logo" alt="logo" />
        </a>
        <span className="me-auto">
          <h4 className="mb-0">
            <a href={company.website} target="_blank" rel="noreferrer">
              {company.name}
            </a>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="xs"
              className="ms-1"
              role="button"
              onClick={() => setExpanded(!expanded)}
            />
          </h4>
          {company.position}
        </span>
        {company.from} - {company.to}
      </div>

      <Collapse in={expanded}>
        <div>
          <ul>
            {company.responsibilities.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      </Collapse>
    </article>
  );
}
