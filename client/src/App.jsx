import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import LogOffRoute from "./routes/LogOffRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Root from "./Root.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardRoot from "./pages/DashboardRoot.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: (
            <LogOffRoute>
              <Login />
            </LogOffRoute>
          ),
        },
        {
          path: "signup",
          element: (
            <LogOffRoute>
              <Signup />
            </LogOffRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/dashboard",
              element: <DashboardRoot />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
