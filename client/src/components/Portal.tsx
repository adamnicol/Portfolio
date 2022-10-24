import { createPortal } from "react-dom";
import { ReactElement } from "react";

function Portal(props: {
  target: string;
  children: ReactElement | ReactElement[];
}) {
  const element = document.getElementById(props.target);
  return element ? createPortal(props.children, element) : null;
}

export default Portal;
