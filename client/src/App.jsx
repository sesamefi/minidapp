import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Crosschain from "./crosschain";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crosschain" element={<Crosschain />} />
      </Routes>
    </Router>
  );
};

export default App;
