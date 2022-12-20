import Login from "./Login";
import SpinButton from "../components/button/SpinButton";
import Status from "../utils/statusCodes";
import { AxiosError } from "axios";
import { Form } from "react-bootstrap";
import { IRegistration } from "../api/interfaces";
import { RegisterSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { useModal } from "../hooks";
import { useRegister } from "../api/queries/user.queries";
import { zodResolver } from "@hookform/resolvers/zod";

export function Register() {
  const modal = useModal();
  const signUp = useRegister(() => modal.close());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({
    resolver: zodResolver(RegisterSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    signUp.mutate(data);
  });

  function getErrorMessage(error: unknown): string {
    let message = null;

    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (status === Status.Conflict) {
        message = "Email address already exists";
      } else if (status === Status.TooManyRequests) {
        message = "You are creating too many accounts";
      } else if (status) {
        message = `Server returned error ${status}`;
      } else {
        message = "Server is not responding";
      }
    }

    return message ?? "An unknown error occurred";
  }

  return (
    <div className="login-form">
      <h2>Register</h2>

      <Form className="mt-2" onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Email address"
            disabled={signUp.isLoading}
            {...register("email")}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            disabled={signUp.isLoading}
            {...register("username")}
          />
          {errors.username && (
            <Form.Text className="text-danger">
              {errors.username.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            disabled={signUp.isLoading}
            {...register("password")}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Retype password"
            disabled={signUp.isLoading}
            {...register("passwordRetype")}
          />
          {errors.passwordRetype && (
            <Form.Text className="text-danger">
              {errors.passwordRetype.message}
            </Form.Text>
          )}
        </Form.Group>

        <SpinButton
          text="Register"
          className="w-100"
          loading={signUp.isLoading}
        />
      </Form>

      {signUp.isError && (
        <div className="alert alert-danger mt-3">
          {getErrorMessage(signUp.error)}
        </div>
      )}

      <p className="mt-4">
        <span className="me-2">Already have an account?</span>
        <a className="link-primary" onClick={() => modal.show(<Login />)}>
          Login
        </a>
      </p>
    </div>
  );
}
