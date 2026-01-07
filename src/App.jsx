import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();
  const { user } = useAuth(); // Need to access user state
  const hideNavbarRoutes = ["/login", "/signup"];
  // Hide navbar if on login/signup, OR if user is logged in (showing Dashboard on home)
  // Actually, Dashboard handles its own nav. If user is logged in, and we are on "/", we show dashboard which includes sidebar.
  // The user might visit other pages (like /about) where they expect the regular navbar?
  // But typically a logged in app has a consistent shell.
  // For now, let's assume ALL pages for a logged-in user might eventually shift to the dashboard shell, but the user specifically asked for "instead of home".
  // Let's hide standard Navbar on "/" if user is logged in.
  const isDashboard = user && location.pathname === "/";
  const hideNavbar = hideNavbarRoutes.includes(location.pathname) || isDashboard;
  return (
    <>
      <Toaster position="top-right" />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
