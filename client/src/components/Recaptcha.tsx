import config from "../utils/config";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "../hooks";

type Theme = "light" | "dark";

type RecaptureProps = {
  onChange: (token: string | null) => void;
};

const recaptchaRef = React.createRef<ReCAPTCHA>();
export function resetCaptcha() {
  recaptchaRef.current?.reset();
}

export function Recaptcha(props: RecaptureProps) {
  const { theme } = useTheme();

  return (
    <ReCAPTCHA
      key={theme}
      theme={theme as Theme}
      sitekey={config.RECAPTCHA_SITE_KEY}
      onChange={props.onChange}
      ref={recaptchaRef}
    />
  );
}
