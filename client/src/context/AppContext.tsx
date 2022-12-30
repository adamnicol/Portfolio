import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { queryClient, QueryClientProvider } from "../lib/react-query";
import { ReactElement } from "react";
import { ThemeProvider } from "./ThemeContext";

export default function AppContextProvider(props: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ModalProvider>{props.children}</ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
