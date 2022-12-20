import { AuthContext, ModalContext, ThemeContext } from "../context";
import { useContext } from "react";

export * from "./useMutationWithAuth";

export function useAuth() {
  return useContext(AuthContext);
}

export function useModal() {
  return useContext(ModalContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}
