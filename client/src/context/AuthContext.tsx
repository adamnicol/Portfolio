import * as api from "../api/routes/user.routes";
import { IUser } from "../api/interfaces";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user: IUser | null;
  setCurrentUser: (user: IUser) => void;
  logout: () => void;
  invalidate: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props: { children: ReactElement }) {
  const [user, setUser] = useState<IUser | null>(null);

  function setCurrentUser(user: IUser) {
    setUser(user);
    localStorage.setItem("username", user.username);
  }

  useEffect(refresh, []);

  function refresh() {
    // Is there an active login?
    if (localStorage.getItem("username")) {
      api
        // Check access token.
        .refreshLogin()
        .then((user) => setCurrentUser(user))
        .catch(invalidate);
    }
  }

  function logout() {
    api.logout().finally(invalidate);
  }

  function invalidate() {
    setUser(null);
    localStorage.removeItem("username");
  }

  return (
    <AuthContext.Provider value={{ user, setCurrentUser, logout, invalidate }}>
      {props.children}
    </AuthContext.Provider>
  );
}
