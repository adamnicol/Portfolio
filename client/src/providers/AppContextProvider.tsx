import { ReactElement } from "react";
import { ModalProvider } from "./ModalProvider";
import { AuthProvider } from "./AuthProvider";

export default function AppContextProvider(props: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <AuthProvider>
      <ModalProvider>{props.children}</ModalProvider>
    </AuthProvider>
  );
}
