import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Private } from "./pages/Private";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      {/* PUBLIC ROUTES */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* PRIVATE ROUTE */}
      <Route path="private" element={<Private />} />

      {/* OTHER ROUTES */}
      <Route path="single/:theId" element={<Single />} />
      <Route path="demo" element={<Demo />} />

    </Route>
  )
);
