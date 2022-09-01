import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faSteam,
} from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const socials = [
  { name: "GitHub", url: "https://github.com/adamnicol", icon: faGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com", icon: faLinkedin },
  {
    name: "Steam",
    url: "https://steamcommunity.com/id/Kobrakai85",
    icon: faSteam,
  },
];

function Header() {
  return (
    <header className="d-flex align-items-center">
      <HeaderLeft />
      <span className="me-auto" />
      <HeaderRight />
    </header>
  );
}

function HeaderLeft() {
  return (
    <>
      <span className="logo">
        <img src={require("../../images/logo.jpg")} alt="logo" />
      </span>
      <span className="title">Adam Nicol</span>
    </>
  );
}

function HeaderRight() {
  return (
    <div className="hstack gap-3 me-4">
      {socials.map((item, index) => {
        return (
          <a
            key={index}
            title={item.name}
            href={item.url}
            target="_blank"
            className="nav-icon"
          >
            <FontAwesomeIcon icon={item.icon as IconProp} />
          </a>
        );
      })}

      <div className="vr nav-link" />
      <Link to="#" className="login-link">
        Login
      </Link>
    </div>
  );
}

export default Header;
