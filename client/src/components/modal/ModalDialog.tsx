import { ReactElement } from "react";

import styles from "./ModalDialog.module.css";

export type ModalProps = {
  visible: boolean;
  children: ReactElement | undefined;
  onRequestClose: () => void;
};

export function ModalDialog(props: ModalProps) {
  if (!props.visible) return null;
  return (
    <>
      <div className={styles.modalOverlay} onClick={props.onRequestClose} />
      <div className={styles.modal}>
        <a className={styles.modalClose} onClick={props.onRequestClose}>
          &times;
        </a>
        {props.children}
      </div>
    </>
  );
}
