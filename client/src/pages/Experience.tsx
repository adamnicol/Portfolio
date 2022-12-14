import { companies } from "./content/experience";

function Experience() {
  return (
    <article>
      <h1>Experience</h1>
      {companies.map((company, index) => (
        <div key={index} className="callout">
          <div className="d-flex text-small text-secondary">
            <a href={company.website} target="_blank" rel="noreferrer">
              <img
                src={require(`../assets/${company.logo}`)}
                className="employer-logo"
                alt="logo"
              />
            </a>
            <span className="me-auto">
              <h4 className="mb-0">
                <a href={company.website} target="_blank" rel="noreferrer">
                  {company.name}
                </a>
              </h4>
              {company.position}
            </span>
            {company.from} - {company.to}
          </div>
          <div>
            <ul>
              {company.responsibilities.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </article>
  );
}

export default Experience;
