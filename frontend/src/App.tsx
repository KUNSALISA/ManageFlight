import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import EditFlight from "./pages/editflight/EditFlight";
import Flight from "./pages/flight/flight"; 
import DateFlight from "./pages/dateflight/DateFlight";
import AddFlight from "./pages/addflight/AddFlight";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/date-flight" element={<DateFlight />} />
        <Route path="/add-flight" element={<AddFlight />} /> 
        <Route path="/edit-flight/:id" element={<EditFlight />} />
      </Routes>
    </Router>
  );
}

export default App;




