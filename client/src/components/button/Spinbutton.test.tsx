import SpinButton from "./SpinButton";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("SpinButton", () => {
  test("Component is rendered", () => {
    render(<SpinButton text="Submit" loading={false} />);
  });

  test("Button label is shown", () => {
    render(<SpinButton text="Submit" loading={false} />);
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  test("Button is disabled when loading", () => {
    render(<SpinButton text="Submit" loading={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("Button is enabled when not loading", () => {
    render(<SpinButton text="Submit" loading={false} />);
    expect(screen.getByRole("button")).toBeEnabled();
  });

  test("Spinner is shown when loading", () => {
    render(<SpinButton text="Submit" loading={true} />);
    expect(
      screen.getByRole("button").firstElementChild?.getAttribute("class")
    ).toContain("spinner");
  });

  test("Spinner is hidden when not loading", () => {
    render(<SpinButton text="Submit" loading={false} />);
    expect(screen.getByRole("button").firstElementChild).toBeNull();
  });

  test("Clicking the button submits the form", async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <form method="post" onSubmit={onSubmit}>
        <SpinButton text="Submit" loading={false} />
      </form>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
  });
});
