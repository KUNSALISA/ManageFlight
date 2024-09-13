import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './DateFlight.css';
import FFF from './assets/FFF.png'
import PPP from './assets/PPP.jpg'

interface FlightDetail {
    flightCode: string;
    flyingFrom: string;
    goingTo: string;
    scheduleStart: string;
    scheduleEnd: string;
    airline: string;
}

const DateFlight: React.FC = () => {
    const [search, setSearch] = useState<string>('');

    const flightDetails: FlightDetail[] = [
        {
            flightCode: 'AA123',
            flyingFrom: 'New York',
            goingTo: 'London',
            scheduleStart: '2024-09-10 14:30',
            scheduleEnd: '2024-09-10 18:45',
            airline: 'American Airlines',
        },
        {
            flightCode: 'BA456',
            flyingFrom: 'London',
            goingTo: 'New York',
            scheduleStart: '2024-09-11 10:00',
            scheduleEnd: '2024-09-11 13:30',
            airline: 'British Airways',
        },
        {
            flightCode: 'DL789',
            flyingFrom: 'Atlanta',
            goingTo: 'Paris',
            scheduleStart: '2024-09-12 16:00',
            scheduleEnd: '2024-09-12 20:15',
            airline: 'Delta Airlines',
        },
    ];

    const filteredDetails = flightDetails.filter(detail =>
        detail.flightCode.toLowerCase().includes(search.toLowerCase())
    );

    const navigate = useNavigate();
    const handleHomeClick = () => {
      navigate("/");
    };

    return (
        <div className="flight-details-container">
            <header className="header">
                <img src={FFF} alt="Logo" className="logo" />
                  <button onClick={handleHomeClick}>Home</button>
                <nav>
                  <img src={PPP} alt="Profile" className="logo-2" />  
                </nav>
                <nav className="nav-m">
                  <div className="member-button">
                    <span>MEMBER</span>
                </div>
        </nav>
            </header>
            <div className="controls">
                <input type="date" className="date-input" />
                <button className="all-button">ALL</button>
                <button className="add-button">ADD</button>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Flight Code"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button className="search-button">Search</button>
            </div>
            <table className="flight-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Flight Code</th>
                        <th>Flying From</th>
                        <th>Going To</th>
                        <th>Schedule Start</th>
                        <th>Schedule End</th>
                        <th>Airline</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDetails.map((detail, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" /></td>
                            <td>{detail.flightCode}</td>
                            <td>{detail.flyingFrom}</td>
                            <td>{detail.goingTo}</td>
                            <td>{detail.scheduleStart}</td>
                            <td>{detail.scheduleEnd}</td>
                            <td>{detail.airline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DateFlight;
