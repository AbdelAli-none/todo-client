import { LoginForm } from "@/components/Auth/components/LoginForm";
import { RegisterForm } from "@/components/Auth/components/RegisterForm";
import { Content } from "@/components/Content";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AuthPage } from "@/components/Auth/components/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ToDosContent } from "@/components/ToDosContent";
import { Dashboard } from "@/components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <ProtectedRoute Component={Content} />,
    children: [
      { index: true, Component: ToDosContent },
      {
        path: "dashboard",
        Component: Dashboard,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthPage,
    children: [
      { index: true, Component: LoginForm },
      { path: "login", Component: LoginForm },
      {
        path: "register",
        Component: RegisterForm,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
