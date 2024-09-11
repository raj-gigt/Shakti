import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Platform from "./pages/Platform.jsx";
import Setup from "./pages/Setup.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/login" element={<Login />} />
          
          <Route exact path="/" element={<LandingPage />} />

            <Route exact path="/home" element={<Home />} />
          {/* Protected routes */}
          //<Route element={<ProtectedRoute />}>
          //</Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/platform" element={<Platform />} />
          </Route>

          <Route exact path="/setup" element={<Setup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
