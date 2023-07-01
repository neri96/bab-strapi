import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectAuthStatus,
  selectCurrentUser,
} from "../features/auth/authSlice";

const Protected = ({
  children,
  requiredRoles,
  isPage = false,
  message,
}: {
  children: ReactNode;
  requiredRoles: string[];
  isPage?: boolean;
  message?: string;
}) => {
  let allowed = false;

  const { role } = useSelector(selectCurrentUser);
  const isAuth = useSelector(selectAuthStatus);

  if (isAuth && requiredRoles.length && requiredRoles.includes(role!)) {
    allowed = true;
  } else if (isPage) {
    return <h1>{message}</h1> || <Navigate to={"/"} replace />;
  }

  return <>{allowed ? children : null}</>;
};

export default Protected;
