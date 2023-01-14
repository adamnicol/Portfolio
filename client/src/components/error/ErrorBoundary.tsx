import * as Sentry from "@sentry/react";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

function ErrorBoundary(props: {
  fallback?: ReactElement;
  children: ReactElement | ReactElement[];
}) {
  const location = useLocation();

  return (
    <Sentry.ErrorBoundary key={location.pathname} fallback={props.fallback}>
      {props.children}
    </Sentry.ErrorBoundary>
  );
}

export default ErrorBoundary;
