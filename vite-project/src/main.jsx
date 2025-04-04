import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Hostel from "./Hostel"; // Import the Hostel component
import Facilities from "./components/Facilities"; // Import the Facilities component
import Homepage from "./Homepage"; // Import the Homepage component
import "bootstrap/dist/css/bootstrap.min.css";
import AdminRoute from "./components/AdminRoute";
import ClerkRoutes from "./components/signin/ClerkRoutes"; // Import Clerk authentication routes

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<Homepage />} />

        {/* Dynamic route for individual hostels */}
        <Route path="/:hostel" element={<Hostel />} />

        {/* Route for the facilities page */}
        <Route path="/facilities/:hostelId" element={<Facilities />} />

        {/* Admin route */}
        <Route path="/admin" element={<AdminRoute />} />

        {/* Clerk Authentication Routes */}
        <Route path="/signin" element={<ClerkRoutes />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


