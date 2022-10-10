import * as api from "../api/routes/user.routes";
import { createContext, ReactElement } from "react";
import { IUser } from "../api/interfaces";
import { useContext, useEffect, useState } from "react";

interface IAuthContext {
  user: IUser | null;
  setCurrentUser: (user: IUser) => void;
  logout: () => void;
  invalidate: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider(props: { children: ReactElement }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(refresh, []);

  function setCurrentUser(user: IUser) {
    setUser(user);
    localStorage.setItem("username", user.username);
  }

  function refresh() {
    // Is there an active login?
    if (localStorage.getItem("username")) {
      api
        // Recheck access token.
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

export function useAuth() {
  return useContext(AuthContext);
}
