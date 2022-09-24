import axios from "axios";
import { IUser } from "../../interfaces";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider(props: { children: ReactElement }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => refresh(), []);

  function refresh() {
    axios
      .get("/users/refresh")
      .then((response) => setUser(response.data))
      .catch(() => setUser(null));
  }

  function logout() {
    axios.get("/users/logout").then(() => setUser(null));
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
