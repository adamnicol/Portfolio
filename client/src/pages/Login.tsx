import SpinButton from "../components/button/SpinButton";
import Status from "../utils/statusCodes";
import { AxiosError } from "axios";
import { Form } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import { IUser } from "../api/interfaces";
import { useAuth } from "../context/AuthContext";
import { useLogin } from "../api/queries/user.queries";
import { useModal } from "../context/ModalContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const login = useLogin();
  const modal = useModal();
  const auth = useAuth();

  useEffect(() => handleSuccess(login.data), [login.isSuccess]);
  useEffect(() => handleError(login.error), [login.isError]);

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (email && password) {
      login.mutate({ email, password });
    }
  }

  function handleSuccess(user?: IUser) {
    if (user) {
      auth.setCurrentUser(user);
      modal.close();
    }
  }

  function handleError(error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (status === Status.Unauthorized) {
        setError("Invalid username or password");
      } else if (status === Status.TooManyRequests) {
        setError("Too many login attempts, please wait a while");
      } else if (status) {
        setError("Server returned error " + status);
      } else {
        setError("Server is not responding");
      }
    }
  }

  return (
    <div className="login-form">
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Control
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Control
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>

        <SpinButton text="Login" className="w-100" loading={login.isLoading} />
      </Form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <p className="mt-4">
        Don't have an account? <a className="link-primary">Register</a>
      </p>
    </div>
  );
}

export default Login;
