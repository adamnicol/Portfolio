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

let isCompactMode: boolean = false;

function toggleCompactMode(e: React.MouseEvent<HTMLElement>) {
  e.preventDefault();

  const menu = document.getElementById("menu");
  if (menu !== null) {
    menu.style.width = isCompactMode ? "180px" : "0";
    isCompactMode = !isCompactMode;
  }
}

function SidePanel() {
  return (
    <div className="side-panel">
      <div className="side-panel-left">
        <div className="side-panel-header">
          <a href="#" title="Toggle Compact Mode" onClick={toggleCompactMode}>
            <img className="header-image" src="images/photo.jpg" />
          </a>
        </div>
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
      <div className="side-panel-right" id="menu">
        <div className="side-panel-header">
          <span className="header-text">Adam Nicol</span>
        </div>
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
    </div>
  );
}

export default SidePanel;
