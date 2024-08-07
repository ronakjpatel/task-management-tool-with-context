import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginContext } from "../store/LoginContextProvider";

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const { loginInfo, doLogin, doLogout } = useContext(LoginContext);
  const existingLoginStatus = localStorage.getItem("isLoggedIn");
  const loginStatus = loginInfo.isLoggedIn;

  if (existingLoginStatus) {
    if (!loginStatus) {
      doLogin({
        uid: localStorage.getItem("loggedInUserId"),
      });
    }
  }

  if (!existingLoginStatus) {
    doLogout();
  }

  return existingLoginStatus !== null ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
