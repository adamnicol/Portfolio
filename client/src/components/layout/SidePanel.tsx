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
  { text: "Home", to: "/", icon: faHouse },
  { text: "About", to: "/about", icon: faCircleInfo },
  { text: "Projects", to: "/projects", icon: faFolderOpen },
  { text: "Something", to: "/something", icon: faStar },
  { text: "Contact", to: "/contact", icon: faEnvelope },
];

const menuLinkActiveStyle = {
  borderBottom: "3px solid",
  borderColor: "teal",
};

function SidePanel() {
  return (
    <div className="side-panel">
      <div className="side-panel-left">
        <div className="side-panel-header">
          <img className="header-image" src="images/photo.jpg" />
        </div>
        <ul>
          {menuLinks.map((link, index) => {
            return (
              <li key={index}>
                <FontAwesomeIcon className="fa-icon" icon={link.icon} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="side-panel-right">
        <div className="side-panel-header">
          <span className="header-text">Adam Nicol</span>
        </div>
        <ul>
          {menuLinks.map((link, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={link.to}
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
    </div>
  );
}

export default SidePanel;
