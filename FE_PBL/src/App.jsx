import React from 'react';
import Convert from "./Pages/Convert";
import Zoom from "./Pages/Zoom";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/zoom" element={<Zoom />} />
      </Routes>
    </Router>
  );
}

export default App;
