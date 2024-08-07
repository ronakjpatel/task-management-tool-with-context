import "./App.css";

import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import AppLayout from "./pages/AppLayout";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import ViewTask, { handleEditedData } from "./components/ViewTask";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignUp from "./components/SignUp";
export const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/addtask",
        element: <ProtectedRoute element={<AddTask />} />,
      },
      {
        path: "/viewtask",
        element: <ProtectedRoute element={<ViewTask />} />,
        action: handleEditedData,
      },
    ],
  },
]);
