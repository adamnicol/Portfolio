import ErrorBoundary from "./ErrorBoundary";
import { render, screen } from "@testing-library/react";

describe("ErrorBoundary", () => {
  beforeAll(() => {
    // Don't output errors to the console.
    jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Fallback component is shown on error", () => {
    const ComponentThatThrowsError = () => {
      throw new Error("It's just a test");
    };

    render(
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ComponentThatThrowsError />
      </ErrorBoundary>
    );

    expect(screen.queryByText("Something went wrong")).toBeInTheDocument();
  });

  test("Component is shown when there is no error", () => {
    const ComponentWithoutErrors = () => {
      return <p>No errors here</p>;
    };

    render(
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ComponentWithoutErrors />
      </ErrorBoundary>
    );

    expect(screen.queryByText("No errors here")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });
});
