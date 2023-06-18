import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isLoading, user } = useAuth();

  return !isLoading ? (
    user?.uid ? (
      children
    ) : (
      <Navigate to="/login" state={{ fromURL: location }}></Navigate>
    )
  ) : null;
};

export default PrivateRoute;
