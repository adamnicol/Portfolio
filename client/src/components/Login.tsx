import { useState } from "react";
import { useModal } from "./common/ModalProvider";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const modal = useModal();

  function login() {
    axios.post("/users/login", { email, password }).then(() => modal.close());
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <div className="mb-2">
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" onClick={login}>
        Login
      </button>
      <p className="mt-4">
        Don't have an account? <a className="link-primary">Register</a>
      </p>
    </div>
  );
}

export default Login;
