import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useModal } from "./providers/ModalProvider";
import { useAuth } from "./providers/AuthProvider";
import axios, { AxiosError } from "axios";
import Status from "./../utils/statusCodes";

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  const modal = useModal();
  const auth = useAuth();

  function login(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setWaiting(true);

    axios
      .post("/users/login", { email, password })
      .then((response) => {
        auth.setCurrentUser(response.data);
        modal.close();
      })
      .catch((error: AxiosError) => {
        setWaiting(false);
        handleError(error);
      });
  }

  function handleError(error: AxiosError) {
    if (error.response?.status === Status.Unauthorized) {
      setError("Invalid username or password");
    } else if (error.response?.status === Status.TooManyRequests) {
      setError("Too many login attempts");
    } else if (error.response?.status) {
      setError("Server returned error " + error.response.status);
    } else {
      setError("Server is not responding");
    }
  }

  return (
    <div className="login-form">
      <h2>Login</h2>

      <Form onSubmit={login}>
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

        <Button type="submit" value="Login" className="w-100">
          {waiting && <span className="spinner-border spinner-border-sm" />}{" "}
          Login
        </Button>
      </Form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <p className="mt-4">
        Don't have an account? <a className="link-primary">Register</a>
      </p>
    </div>
  );
}

export default Login;
