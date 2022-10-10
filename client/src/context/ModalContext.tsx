import { createContext, ReactElement, useContext, useState } from "react";
import { ModalDialog } from "../components/common/ModalDialog";

interface IModalContext {
  show: (content: ReactElement) => void;
  close: () => void;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider(props: {
  children: ReactElement | ReactElement[];
}) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactElement>();

  function show(component: ReactElement) {
    setContent(component);
    setVisible(true);

    // Hide scrollbars.
    document.body.style.overflow = "hidden";
  }

  function close() {
    setContent(undefined);
    setVisible(false);

    // Restore scrollbars.
    document.body.style.overflow = "unset";
  }

  return (
    <ModalContext.Provider value={{ show, close }}>
      <ModalDialog visible={visible} onRequestClose={close}>
        {content}
      </ModalDialog>
      {props.children}
    </ModalContext.Provider>
  );
}
