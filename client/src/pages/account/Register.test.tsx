import Status from "@utils/statusCodes";
import userEvent from "@testing-library/user-event";
import { AxiosError } from "axios";
import { AxiosResponse } from "axios";
import { fireEvent, render, screen } from "@testing-library/react";
import { Register } from "./Register";
import { useRegister } from "@api/queries/user.queries";

jest.mock("@api/queries/user.queries.ts");

describe("Login", () => {
  const mockedUseRegister = useRegister as jest.Mock;
  const mockedMutate = jest.fn();

  beforeEach(() => {
    mockedUseRegister.mockImplementation(() => ({
      mutate: mockedMutate,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Component is rendered", () => {
    render(<Register />);

    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Retype password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Form is validated", async () => {
    render(<Register />);

    // Simulate clicking the login button.
    const button = screen.getByRole("button");
    await userEvent.click(button);

    // Fields are blank so mutate should not be called.
    expect(mockedMutate).not.toHaveBeenCalled();
  });

  test("Form is submitted", async () => {
    render(<Register />);

    // Populate fields to pass validation.
    setFieldValue("Email address", "test@test.com");
    setFieldValue("Username", "user123");
    setFieldValue("Password", "password123");
    setFieldValue("Retype password", "password123");

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
    error.response = { status: Status.Conflict } as AxiosResponse;

    mockedUseRegister.mockImplementation(() => ({
      isError: true,
      error,
    }));

    render(<Register />);
    const message = screen.getByText("Email address already exists");
    expect(message).toBeInTheDocument();
  });
});
