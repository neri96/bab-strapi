import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useEmailConfirmMutation } from "../../../api/services/auth";

import Button from "../../../components/Button";

import "./ConfirmUser.scss";

export const ConfirmUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [confirm, { data }] = useEmailConfirmMutation();

  useLayoutEffect(() => {
    (async () => {
      const link = location.pathname.split("/")[2];

      const { confirmed } = await confirm({ link }).unwrap();

      if (!confirmed) {
        navigate("/");
      }
    })();
  }, [confirm, navigate, location.pathname]);

  return data?.confirmed ? (
    <div className="confirm">
      <h1>Your account has been confirmed, you can log in now</h1>
      <div className="confirm__footer">
        <Button handleClick={() => navigate("/auth")}>Log in</Button>
      </div>
    </div>
  ) : null;
};

export default ConfirmUser;
