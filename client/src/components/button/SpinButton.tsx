import { Button, Spinner } from "react-bootstrap";
import { ButtonHTMLAttributes } from "react";

interface SpinButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading: boolean;
}

export function SpinButton(props: SpinButtonProps) {
  const { text, loading, ...attributes } = props;

  return (
    <Button type="submit" disabled={loading} {...attributes}>
      {loading && <Spinner as="span" animation="border" size="sm" />} {text}
    </Button>
  );
}

export default SpinButton;
