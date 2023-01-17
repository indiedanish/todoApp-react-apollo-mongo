import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

export const routes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
];
