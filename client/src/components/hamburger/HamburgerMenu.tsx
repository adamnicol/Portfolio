import Login from "../../pages/Login";
import Portal from "../Portal";
import socials from "../../pages/content/socials";
import { faBars, faClose, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../api/queries/user.queries";
import { useModal } from "../../context/ModalContext";
import { useState } from "react";

import "./HamburgerMenu.css";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const auth = useAuth();
  const modal = useModal();
  const logout = useLogout();

  function handleLoginClicked() {
    setIsOpen(false);

    if (auth.user) {
      logout.mutate();
    } else {
      modal.show(<Login />);
    }
  }

  return (
    <div>
      <FontAwesomeIcon
        className="menu-toggle"
        icon={faBars}
        onClick={() => setIsOpen(true)}
      />

      <Portal target="portal-root">
        <div className={isOpen ? "menu mobile-only" : "menu-collapsed"}>
          <FontAwesomeIcon
            className="menu-toggle"
            icon={faClose}
            onClick={() => setIsOpen(false)}
          />

          <div className="d-flex flex-column menu-links">
            <span>
              <FontAwesomeIcon icon={faLock} className="me-3" />
              <a onClick={handleLoginClicked}>
                {auth.user ? "Logout" : "Login"}
              </a>
            </span>

            <hr />
            {socials.map((item, index) => {
              return (
                <span key={index} className="mb-2">
                  <FontAwesomeIcon
                    icon={item.icon as IconProp}
                    className="me-3"
                  />
                  <a
                    key={index}
                    title={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="nav-icon"
                  >
                    {item.name}
                  </a>
                </span>
              );
            })}
          </div>
        </div>
      </Portal>
    </div>
  );
}

export default HamburgerMenu;
