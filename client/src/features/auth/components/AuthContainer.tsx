import { useState } from "react";

import LogIn from "./LogIn";
import Register from "./Register";

import "./AuthContainer.scss";

import { AuthStatus } from "../ts/types";

export const AuthContainer = () => {
  const [status, setStatus] = useState(AuthStatus.LogIn);

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container__wrap">
          <div className="auth-container__header">
            <div
              className={`auth-container__header__option ${
                status === AuthStatus.LogIn ? "chosen" : ""
              }`}
              onClick={() => setStatus(AuthStatus.LogIn)}
            >
              <h4>Log in</h4>
            </div>
            <div
              className={`auth-container__header__option ${
                status === AuthStatus.Register ? "chosen" : ""
              }`}
              onClick={() => setStatus(AuthStatus.Register)}
            >
              <h4>Register</h4>
            </div>
          </div>
          <div
            className={`auth-container__forms ${
              status === AuthStatus.Register ? "register" : ""
            }`}
          >
            <LogIn />
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};
