import { useMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleInfo,
  faFolderOpen,
  faStar,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const menuLinks = [
  { text: "Home", path: "/", icon: faHouse },
  { text: "About", path: "/about", icon: faCircleInfo },
  { text: "Projects", path: "/projects", icon: faFolderOpen },
  { text: "Something", path: "/something", icon: faStar },
  { text: "Contact", path: "/contact", icon: faEnvelope },
];

function SidePanel() {
  const isNewsPage = useMatch("/news/*");

  return (
    <nav className="side-panel">
      <div className="side-panel-left">
        <ul className="list-unstyled">
          {menuLinks.map((link, index) => {
            return (
              <li key={index}>
                <NavLink to={link.path} title={link.text}>
                  <FontAwesomeIcon className="nav-icon" icon={link.icon} />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="side-panel-right">
        <ul className="list-unstyled">
          {menuLinks.map((link, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive || (link.path === "/" && isNewsPage)
                      ? "nav-link-active"
                      : "nav-link"
                  }
                >
                  {link.text.toUpperCase()}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default SidePanel;
