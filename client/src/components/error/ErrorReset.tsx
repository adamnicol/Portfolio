import { ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

export function ErrorReset(props: {
  resetErrorBoundary: () => void;
  children?: ReactElement;
}) {
  const { pathname } = useLocation();
  const originalPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== originalPathname.current) {
      props.resetErrorBoundary();
    }
  }, [pathname]);

  return <>{props.children}</>;
}
