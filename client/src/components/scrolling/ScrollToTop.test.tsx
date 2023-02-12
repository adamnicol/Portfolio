import ScrollToTop from "./ScrollToTop";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("ScrollToTop", () => {
  window.scrollTo = jest.fn();

  test("Component is rendered without errors", () => {
    render(<ScrollToTop />);
  });

  test("Button is hidden by default", () => {
    const { queryByTitle } = render(<ScrollToTop />);
    expect(queryByTitle("Back to top")).not.toBeInTheDocument();
  });

  test("Button is shown after scrolling", () => {
    const { getByTitle } = render(<ScrollToTop />);

    // Set the scroll position.
    Object.defineProperty(window, "pageYOffset", { value: 400 });
    fireEvent.scroll(window);

    expect(getByTitle("Back to top")).toBeInTheDocument();
  });

  test("Clicking button returns to the top", () => {
    const { getByTitle } = render(<ScrollToTop />);

    // Set the scroll position.
    Object.defineProperty(window, "pageYOffset", { value: 400 });
    fireEvent.scroll(window);

    // Simulate clicking the button.
    fireEvent.click(getByTitle("Back to top"));
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test("Scroll position is reset on route change", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <ScrollToTop />
      </MemoryRouter>
    );

    window.history.pushState({}, "About", "/about");
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
