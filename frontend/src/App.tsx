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
        <Route path="/edit-flight/:flightCode" element={<EditFlight />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React from "react";
// import ReactDOM from "react-dom/client";
// import "antd/dist/reset.css"; 
// import FlightTable from './pages/dateflight/DateFlight.tsx'
// import './pages/dateflight/DateFlight.css'

// const App: React.FC = () => {
//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Flight Details</h1>
//       <FlightTable />
//     </div>
//   );
// };

// export default App;

