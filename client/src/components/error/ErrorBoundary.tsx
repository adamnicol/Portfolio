import * as Sentry from "@sentry/react";
import { ErrorReset } from "./ErrorReset";
import { ReactElement } from "react";

function ErrorBoundary(props: {
  fallback?: ReactElement;
  children: ReactElement | ReactElement[];
}) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ resetError }) => {
        return (
          <ErrorReset resetErrorBoundary={resetError}>
            {props.fallback}
          </ErrorReset>
        );
      }}
    >
      {props.children}
    </Sentry.ErrorBoundary>
  );
}

export default ErrorBoundary;
