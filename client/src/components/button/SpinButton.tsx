import { Button, Spinner } from "react-bootstrap";

interface ISpinButtonProps {
  text: string;
  loading: boolean;
  className?: string;
}

function SpinButton(props: ISpinButtonProps) {
  const { text, loading, className } = props;

  return (
    <Button type="submit" className={className} disabled={loading}>
      {loading && <Spinner as="span" animation="border" size="sm" />} {text}
    </Button>
  );
}

export default SpinButton;
