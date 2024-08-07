import React, { createContext, useState } from "react";

export const LoginContext = createContext("");

const LoginContextProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({
    isLoggedIn: null,
    loggedInUserId: null,
  });

  function doLogin(payload) {
    const newLoginInfo = JSON.parse(JSON.stringify(loginInfo));
    newLoginInfo.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", true);
    newLoginInfo.loggedInUserId = payload.uid;
    localStorage.setItem("loggedInUserId", payload.uid);

    setLoginInfo(newLoginInfo);
  }
  function doLogout() {
    const newLoginInfo = JSON.parse(JSON.stringify(loginInfo));
    newLoginInfo.isLoggedIn = false;
    newLoginInfo.loggedInUserId = null;
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUserId");
    setLoginInfo(newLoginInfo);
  }

  return (
    <LoginContext.Provider value={{ loginInfo, doLogin, doLogout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
