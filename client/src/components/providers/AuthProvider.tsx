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
  setCurrentUser: (user: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider(props: { children: ReactElement }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => refresh(), []);

  function setCurrentUser(user: IUser) {
    setUser(user);
    localStorage.setItem("username", user.username);
  }

  function refresh() {
    // Has user logged in previously?
    if (localStorage.getItem("username")) {
      axios
        // Are access tokens still valid?
        .get("/users/refresh")
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("username");
        });
    }
  }

  function logout() {
    axios.post("/users/logout").finally(() => {
      setUser(null);
      localStorage.removeItem("username");
    });
  }

  return (
    <AuthContext.Provider value={{ user, setCurrentUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
