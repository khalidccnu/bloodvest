import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

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
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
