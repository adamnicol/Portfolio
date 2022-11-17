import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactElement } from "react";

export default function AppContextProvider(props: {
  children: ReactElement | ReactElement[];
}) {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{props.children}</ModalProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
