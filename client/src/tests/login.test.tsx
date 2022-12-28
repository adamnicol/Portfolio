import Login from "../pages/Login";
import Status from "../utils/statusCodes";
import userEvent from "@testing-library/user-event";
import { AxiosError } from "axios";
import { AxiosResponse } from "axios";
import { fireEvent, render, screen } from "@testing-library/react";
import { useLogin } from "../api/queries/user.queries";

jest.mock("../api/queries/user.queries.ts");

describe("Login", () => {
  const mockedUseLogin = useLogin as jest.Mock;
  const mockedMutate = jest.fn();

  beforeEach(() => {
    mockedUseLogin.mockImplementation(() => ({
      mutate: mockedMutate,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Component is rendered", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Form is validated", async () => {
    render(<Login />);

    // Simulate clicking the login button.
    const button = screen.getByRole("button");
    await userEvent.click(button);

    // Fields are blank so mutate should not be called.
    expect(mockedMutate).not.toHaveBeenCalled();
  });

  test("Form is submitted", async () => {
    render(<Login />);

    // Populate fields to pass validation.
    setFieldValue("Email address", "test@test.com");
    setFieldValue("Password", "password123");

    // Simulate clicking the login button.
    const button = screen.getByRole("button");
    await userEvent.click(button);

    // Was the login event handled?
    expect(mockedMutate).toHaveBeenCalledTimes(1);
  });

  function setFieldValue(placeholder: string, newValue: string) {
    const field = screen.getByPlaceholderText(placeholder);
    fireEvent.change(field, {
      target: { value: newValue },
    });
  }

  test("Error message is shown", () => {
    const error = new AxiosError();
    error.response = { status: Status.Unauthorized } as AxiosResponse;

    mockedUseLogin.mockImplementation(() => ({
      isError: true,
      error,
    }));

    render(<Login />);
    const message = screen.getByText("Invalid username or password");
    expect(message).toBeInTheDocument();
  });
});
