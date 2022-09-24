import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useModal } from "./providers/ModalProvider";
import { useAuth } from "./providers/AuthProvider";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [validated, setValidated] = useState(false);

  const modal = useModal();
  const auth = useAuth();

  function login(e: FormEvent) {
    e.preventDefault();
    axios.post("/users/login", { email, password }).then((response) => {
      auth.setUser(response.data);
      modal.close();
    });
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form noValidate validated={validated} onSubmit={login}>
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
          Login
        </Button>
      </Form>

      <p className="mt-4">
        Don't have an account? <a className="link-primary">Register</a>
      </p>
    </div>
  );
}

export default Login;
