import Status from "../utils/statusCodes";
import { AxiosError } from "axios";
import { useActivate } from "../api/queries/user.queries";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Activate() {
  const { token } = useParams();
  const activate = useActivate();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      activate.mutate(token);
    }
  }, []);

  if (activate.isLoading) {
    return (
      <div className="p-2">
        <div className="spinner-border spinner-border-sm text-primary" />
        <span className="ms-2">Activating account...</span>
      </div>
    );
  }

  if (activate.isError) {
    if (activate.error instanceof AxiosError) {
      const status = activate.error.response?.status;
      return (
        <div className="p-2">
          {status === Status.BadRequest && "Invalid activation link"}
          {status === Status.NotFound && "Account not found"}
          {status === Status.Conflict && "Account already activated"}
          {status === Status.Error && "Unknown error"}
        </div>
      );
    }
  }

  if (activate.isSuccess) {
    setTimeout(() => navigate("/"), 10000);
    return (
      <div className="p-2">
        <p>
          Your account has been activated and you can now log in. You will be
          redirected shortly.
        </p>
        <p>
          Click <a href="/">Here</a> to go back now.
        </p>
      </div>
    );
  }

  return null;
}

export default Activate;
