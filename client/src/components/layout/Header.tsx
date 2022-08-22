import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const menuLinks = [
  { text: "Home", to: "/" },
  { text: "About", to: "/about" },
  { text: "Projects", to: "/projects" },
  { text: "Something", to: "/something" },
  { text: "Contact", to: "/contact" },
];

const menuLinkActiveStyle = {
  borderBottom: "2px solid",
  paddingBottom: "3px",
};

function Header() {
  return (
    <div className="header">
      <div className="login d-flex justify-content-end">
        <div className="p-1">
          <FontAwesomeIcon className="fa-icon" icon={faLock} />
        </div>
        <div className="p-1">
          <NavLink to="/login" className="login-link">
            Login
          </NavLink>
        </div>
      </div>

      <div className="main-menu d-flex justify-content-center">
        {menuLinks.map((link, index) => {
          return (
            <div className="p-3" key={index}>
              <NavLink
                to={link.to}
                className="nav-link"
                style={({ isActive }) => (isActive ? menuLinkActiveStyle : {})}
              >
                {link.text}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
