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
  clearCurrentUser: () => void;
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

  function clearCurrentUser() {
    setUser(null);
    localStorage.removeItem("username");
  }

  useEffect(refresh, []);

  function refresh() {
    // Is there an active login?
    if (localStorage.getItem("username")) {
      api
        // Check access token.
        .refreshLogin()
        .then((user) => setCurrentUser(user))
        .catch(clearCurrentUser);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setCurrentUser, clearCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
