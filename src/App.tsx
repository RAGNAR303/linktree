import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { NetWorks } from "./pages/networks";
import { Private } from "./routes/Private";
import { ErrorPage } from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <NetWorks />,
      </Private>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export { router };
