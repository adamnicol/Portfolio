import { RefObject, useEffect } from "react";

export function useLostFocus(
  ref: RefObject<HTMLElement>,
  onLostFocus: () => void
) {
  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchend", listener);
    };
  }, [ref]);

  function listener(e: MouseEvent | TouchEvent) {
    if (!ref.current?.contains(e.target as Node)) {
      onLostFocus();
    }
  }
}
