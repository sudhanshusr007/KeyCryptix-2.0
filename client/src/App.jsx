import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GeneratePassword from "./pages/GeneratePassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/generate-password" element={<GeneratePassword />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
