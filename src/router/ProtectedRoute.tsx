import type React from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({
  Component,
}: {
  Component: React.ComponentType;
}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"auth/login"} replace />;
  }
  return <Component />;
};
