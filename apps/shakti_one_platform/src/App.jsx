import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";

import DashBoard from "./pages/DashBoard";
import Schedule from "./pages/Schedule";
import Transactions from "./pages/Transactions";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
};

export default App;
