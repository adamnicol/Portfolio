import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { menuLinks } from "@data/navigation";
import { socials } from "@data/socials";

function Footer() {
  return (
    <footer className="mobile-only text-secondary">
      <div className="d-flex mb-2">
        <ul className="list-unstyled">
          {menuLinks.map((link, index) => (
            <li key={index} className="mt-2">
              <FontAwesomeIcon icon={link.icon} fixedWidth />
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  "text-secondary " + (isActive ? "nav-link-active" : "nav-link")
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="list-unstyled ms-5">
          {socials.map((link, index) => (
            <li key={index} className="mt-2">
              <FontAwesomeIcon icon={link.icon} fixedWidth />
              <a
                href={link.url}
                title={link.name}
                target="_blank"
                rel="noreferrer"
                className="nav-link text-secondary"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <span className="text-small text-secondary">
        Copyright &#169;{new Date().getFullYear()} Adam Nicol
      </span>
    </footer>
  );
}

export default Footer;
