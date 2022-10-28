import { ReactElement } from "react";

import "./ModalDialog.scss";

export type ModalProps = {
  visible: boolean;
  children: ReactElement | undefined;
  onRequestClose: () => void;
};

export function ModalDialog(props: ModalProps) {
  if (!props.visible) return null;
  return (
    <>
      <div className="modal-overlay" onClick={props.onRequestClose} />
      <div className="modal">
        <a className="modal-close" onClick={props.onRequestClose}>
          &times;
        </a>
        {props.children}
      </div>
    </>
  );
}
