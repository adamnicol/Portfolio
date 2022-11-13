import HamburgerMenu from "../../components/hamburger/HamburgerMenu";
import Login from "../Login";
import socials from "../content/socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";

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
        <img src={require("../../assets/logo.jpg")} alt="logo" />
      </span>
      <span className="title">Adam Nicol</span>
    </>
  );
}

function HeaderRight() {
  const auth = useAuth();
  const modal = useModal();

  return (
    <div>
      <div className="nav-icon me-4 mobile-only">
        <HamburgerMenu />
      </div>

      <div className="hstack gap-3 me-4 mobile-hidden">
        <Socials />
        <div className="vr nav-link" />
        <a className="login-link" onClick={handleLoginLinkClicked}>
          {auth.user ? "Logout" : "Login"}
        </a>
      </div>
    </div>
  );

  function handleLoginLinkClicked() {
    if (auth.user) {
      auth.logout();
    } else {
      modal.show(<Login />);
    }
  }
}

function Socials() {
  return (
    <div className="hstack gap-3">
      {socials.map((item, index) => {
        return (
          <a
            key={index}
            title={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="nav-icon"
          >
            <FontAwesomeIcon icon={item.icon as IconProp} />
          </a>
        );
      })}
    </div>
  );
}

export default Header;
