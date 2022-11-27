import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Themes } from "../../context/ThemeContext";
import { useMatch } from "react-router";
import { useTheme } from "../../hooks/useTheme";
import {
  faHouse,
  faCircleInfo,
  faFolderOpen,
  faStar,
  faEnvelope,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const menuLinks = [
  { text: "Home", path: "/", icon: faHouse },
  { text: "About", path: "/about", icon: faCircleInfo },
  { text: "Projects", path: "/projects", icon: faFolderOpen },
  { text: "Experience", path: "/experience", icon: faStar },
  { text: "Contact", path: "/contact", icon: faEnvelope },
];

function SidePanel() {
  const isNewsPage = useMatch("/news/*");

  const { theme, setTheme } = useTheme();
  function handleChangeTheme() {
    setTheme(theme === Themes.Dark ? Themes.Light : Themes.Dark);
  }

  return (
    <nav className="side-panel d-flex position-fixed">
      <div className="side-panel-left d-flex flex-column">
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
        <span className="nav-icon mt-auto" title="Toggle dark mode">
          <FontAwesomeIcon
            icon={theme === Themes.Dark ? faSun : faMoon}
            role="button"
            onClick={handleChangeTheme}
          />
        </span>
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
