import React from 'react';
import Convert from "./Pages/Convert";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/convert" element={<Convert />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
