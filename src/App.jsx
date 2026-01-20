import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Market from "./pages/Market";

import { Toaster } from "react-hot-toast";

import { ProtectedRoute, PublicRoute } from "./components/RouteGuards";

const App = () => {
  const location = useLocation();
  const { user } = useAuth(); // Need to access user state
  const hideNavbarRoutes = ["/login", "/signup"];
  // Hide navbar if on login/signup, OR if user is logged in (as Dashboard has its own header)
  const hideNavbar = hideNavbarRoutes.includes(location.pathname) || user;
  return (
    <>
      <Toaster position="top-right" />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/market"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rfq/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/your-rfqs"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/your-bids"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/your-orders"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
