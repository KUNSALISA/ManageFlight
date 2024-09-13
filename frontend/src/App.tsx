// import React from 'react';
// import Flight from './flight';

// const App = () => {
//   return (
//     <div>
//       <Flight />
//     </div>
//   );
// };

// export default App;  


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditFlight from "./EditFlight";
import Flights from "./flight";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/edit-flight/:flightCode" element={<EditFlight />} />
      </Routes>
    </Router>
  );
}

export default App;


