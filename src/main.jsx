import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import TaskContextProvider from "./store/TaskContextProvider.jsx";
import UserContextProvider from "./store/UserContextProvider.jsx";
import LoginContextProvider from "./store/LoginContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginContextProvider>
      <UserContextProvider>
        <TaskContextProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Zoom
          />
        </TaskContextProvider>
      </UserContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
