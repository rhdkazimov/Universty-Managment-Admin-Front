import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";

export const ProtectedRouter = ({ children }) => {
  if (localStorage.getItem("token")) {
    const user = localStorage.getItem("user");
    if (user.isAdmin) return children;
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to={ROUTES.ADMIN.LOGIN} />;
    }
  }
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return <Navigate to={ROUTES.ADMIN.LOGIN} />;
};
