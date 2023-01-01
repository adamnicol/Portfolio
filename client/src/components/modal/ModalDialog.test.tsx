import userEvent from "@testing-library/user-event";
import { ModalDialog } from "./ModalDialog";
import { render, screen } from "@testing-library/react";

describe("ModalDialog", () => {
  const onRequestClose = jest.fn();

  test("Component is rendered", () => {
    render(
      <ModalDialog visible={true} onRequestClose={onRequestClose}>
        <p>Modal content</p>
      </ModalDialog>
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  test("Component is not rendered when visible is set to false", () => {
    const { container } = render(
      <ModalDialog visible={false} onRequestClose={onRequestClose}>
        <p>Modal content</p>
      </ModalDialog>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("Close button is shown", () => {
    render(
      <ModalDialog visible={true} onRequestClose={onRequestClose}>
        <p>Modal content</p>
      </ModalDialog>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Closing the dialog fires the close event", async () => {
    render(
      <ModalDialog visible={true} onRequestClose={onRequestClose}>
        <p>Modal content</p>
      </ModalDialog>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onRequestClose).toHaveBeenCalled();
  });
});
