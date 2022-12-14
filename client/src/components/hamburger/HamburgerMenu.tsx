import Login from "../../pages/Login";
import Portal from "../Portal";
import socials from "../../pages/content/socials";
import { faBars, faClose, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAuth, useModal } from "../../hooks";
import { useLogout } from "../../api/queries/user.queries";
import { useState } from "react";

import styles from "./HamburgerMenu.module.css";

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
        className={styles.menuToggle}
        icon={faBars}
        onClick={() => setIsOpen(true)}
      />

      <Portal target="portal-root">
        <div className={isOpen ? styles.menu : styles.menuCollapsed}>
          <FontAwesomeIcon
            className={styles.menuToggle}
            icon={faClose}
            onClick={() => setIsOpen(false)}
          />

          <div className={`d-flex flex-column ${styles.menuLinks}`}>
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
