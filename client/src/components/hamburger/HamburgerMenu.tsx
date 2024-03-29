import Login from "../../pages/account/Login";
import Portal from "../Portal";
import { faBars, faClose, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { menuLinks } from "@data/navigation";
import { socials } from "@data/socials";
import { useAuth, useLostFocus, useModal } from "@hooks";
import { useLogout } from "@api/queries/user.queries";
import { useRef, useState } from "react";

import styles from "./HamburgerMenu.module.css";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const auth = useAuth();
  const modal = useModal();
  const logout = useLogout();

  const menuRef = useRef(null);
  useLostFocus(menuRef, () => {
    setIsOpen(false);
  });

  function handleLoginClicked() {
    setIsOpen(false);

    if (auth.user) {
      logout.mutate();
    } else {
      modal.show(<Login />);
    }
  }

  return (
    <>
      <FontAwesomeIcon
        className={styles.menuToggle}
        icon={faBars}
        onClick={() => setIsOpen(true)}
      />

      <Portal target="portal-root">
        <nav
          ref={menuRef}
          className={isOpen ? styles.menu : styles.menuCollapsed}
        >
          <FontAwesomeIcon
            className={styles.menuToggle}
            icon={faClose}
            onClick={() => setIsOpen(false)}
          />

          <div className={`d-flex flex-column ${styles.menuLinks}`}>
            <ul className="list-unstyled mb-0">
              <li>
                <FontAwesomeIcon icon={faLock} className="me-3" fixedWidth />
                <a onClick={handleLoginClicked}>
                  {auth.user ? "Logout" : "Login"}
                </a>
              </li>
            </ul>

            <hr />
            <ul className="list-unstyled mb-0">
              {menuLinks.map((item, index) => {
                return (
                  <li key={index} className="mb-2">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="me-3"
                      fixedWidth
                    />
                    <Link
                      key={index}
                      title={item.text}
                      to={item.path}
                      className="nav-icon"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.text}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <hr />
            <ul className="list-unstyled">
              {socials.map((item, index) => {
                return (
                  <li key={index} className="mb-2">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="me-3"
                      fixedWidth
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
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </Portal>
    </>
  );
}

export default HamburgerMenu;
