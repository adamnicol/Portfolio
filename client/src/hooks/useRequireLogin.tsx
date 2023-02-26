import { Login } from "../pages/account/Login";
import { useAuth, useModal } from ".";

export function useRequireLogin() {
  const auth = useAuth();
  const modal = useModal();

  function requireLogin<T>(action: () => T) {
    if (auth.user) {
      return action();
    } else {
      modal.show(<Login />);
    }
  }

  return { requireLogin };
}
