import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAuth } from "../providers/AuthProvider";
import { useModal } from "../providers/ModalProvider";
import socials from "../content/socials";
import Login from "../Login";

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
  const auth = useAuth();
  const modal = useModal();

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
      {auth.user ? (
        <a className="login-link" onClick={() => auth.logout()}>
          Logout
        </a>
      ) : (
        <a className="login-link" onClick={() => modal.show(<Login />)}>
          Login
        </a>
      )}
    </div>
  );
}

export default Header;
