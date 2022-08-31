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

const menuLinkActiveStyle = {
  borderBottom: "3px solid",
  borderColor: "teal",
};

function SidePanel() {
  return (
    <nav className="side-panel">
      <div className="side-panel-left">
        <ul>
          {menuLinks.map((link, index) => {
            return (
              <li key={index}>
                <NavLink to={link.path} title={link.text}>
                  <FontAwesomeIcon className="fa-icon" icon={link.icon} />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="side-panel-right">
        <ul>
          {menuLinks.map((link, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className="menu-link"
                  style={({ isActive }) =>
                    isActive ? menuLinkActiveStyle : {}
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
