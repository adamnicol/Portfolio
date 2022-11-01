import Login from "./Login";
import SpinButton from "../components/button/SpinButton";
import Status from "../utils/statusCodes";
import { AxiosError } from "axios";
import { Form } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import { IRegistration, IUser } from "../api/interfaces";
import { useModal } from "../context/ModalContext";
import { useRegister } from "../api/queries/user.queries";

const Defaults: IRegistration = {
  email: "",
  username: "",
  password: "",
  passwordRetype: "",
};

export function Register() {
  const [state, setState] = useState<IRegistration>(Defaults);
  const [error, setError] = useState<string | null>(null);

  const register = useRegister();
  const modal = useModal();

  useEffect(() => handleSuccess(register.data), [register.isSuccess]);
  useEffect(() => handleError(register.error), [register.isError]);

  function handleFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError(null);
    register.mutate(state);
  }

  function handleSuccess(user?: IUser) {
    if (user) {
      modal.close();
    }
  }

  function handleError(error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (status === Status.Conflict) {
        setError("Email address already exists");
      } else if (status === Status.TooManyRequests) {
        setError("You are creating too many accounts");
      } else if (status) {
        setError("Server returned error " + status);
      } else {
        setError("Server is not responding");
      }
    }
  }

  return (
    <div className="login-form">
      <h2>Register</h2>

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Control
            name="email"
            type="email"
            required
            placeholder="Email address"
            value={state.email}
            onChange={handleFieldChange}
            disabled={register.isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="username"
            type="text"
            required
            placeholder="Username"
            value={state.username}
            onChange={handleFieldChange}
            disabled={register.isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="password"
            type="password"
            required
            placeholder="Password"
            value={state.password}
            onChange={handleFieldChange}
            disabled={register.isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="passwordRetype"
            type="password"
            required
            placeholder="Retype password"
            value={state.passwordRetype}
            onChange={handleFieldChange}
            disabled={register.isLoading}
          />
        </Form.Group>

        <SpinButton
          text="Register"
          className="w-100"
          loading={register.isLoading}
        />
      </Form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <p className="mt-4">
        <span className="me-2">Already have an account?</span>
        <a className="link-primary" onClick={() => modal.show(<Login />)}>
          Login
        </a>
      </p>
    </div>
  );
}
