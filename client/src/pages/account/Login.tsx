import SpinButton from "@components/button/SpinButton";
import Status from "@utils/statusCodes";
import { AxiosError } from "axios";
import { Form } from "react-bootstrap";
import { Credentials, LoginSchema } from "@schemas";
import { Register } from "./Register";
import { useForm } from "react-hook-form";
import { useLogin } from "@api/queries/user.queries";
import { useModal } from "@hooks";
import { zodResolver } from "@hookform/resolvers/zod";

export function Login() {
  const modal = useModal();
  const login = useLogin(modal.close);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(LoginSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit((credentials) => {
    login.mutate(credentials);
  });

  function getErrorMessage(error: unknown): string {
    let message = null;

    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (status === Status.Unauthorized) {
        message = "Invalid username or password";
      } else if (status === Status.Forbidden) {
        message = "Please verify your email address";
      } else if (status === Status.TooManyRequests) {
        message = "Too many login attempts, please wait a while";
      } else if (status) {
        message = `Server returned error ${status}`;
      } else {
        message = "Server is not responding";
      }
    }

    return message ?? "An unknown error occurred";
  }

  return (
    <>
      <h2>Login</h2>

      <Form className="mt-2" onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Email address"
            disabled={login.isLoading}
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
            type="password"
            placeholder="Password"
            disabled={login.isLoading}
            {...register("password")}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <SpinButton text="Login" className="w-100" loading={login.isLoading} />
      </Form>

      {login.isError && (
        <div className="alert alert-danger mt-3">
          {getErrorMessage(login.error)}
        </div>
      )}

      <p className="mt-4">
        <span className="me-2">Don't have an account?</span>
        <a className="link-primary" onClick={() => modal.show(<Register />)}>
          Register
        </a>
      </p>
    </>
  );
}

export default Login;
