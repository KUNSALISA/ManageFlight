import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './AddFlight.css';
import FFF from './assets/FFF.png'
import PPP from './assets/PPP.jpg'

const AddFlight: React.FC = () => {
  const [formData, setFormData] = useState({
    flightCode: '',
    type: '',
    flyingFrom: '',
    goingTo: '',
    scheduleStart: '',
    scheduleEnd: '',
    hour: '',
    airlineID: '',
    cost: '',
    point: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // ส่งข้อมูลไปยัง backend หรือจัดการกับข้อมูลที่กรอกเข้ามา
  };

  const navigate = useNavigate();
    const handleHomeClick = () => {
      navigate("/");
    };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src={FFF} alt="Logo" />
        </div>
        <nav className = "nav-1">
          <button onClick={handleHomeClick}>Home</button>
        </nav>
        <img src={PPP} alt="Profile" className="logo-2" />
        <nav className="nav">
          <div className="member">
            <span>MEMBER</span>
          </div>
        </nav>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>FlightCode</label>
              <input
                type="text"
                name="flightCode"
                value={formData.flightCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Flying From</label>
              <input
                type="text"
                name="flyingFrom"
                value={formData.flyingFrom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Going To</label>
              <input
                type="text"
                name="goingTo"
                value={formData.goingTo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Schedule Start</label>
              <input
                type="date"
                name="scheduleStart"
                value={formData.scheduleStart}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Schedule End</label>
              <input
                type="date"
                name="scheduleEnd"
                value={formData.scheduleEnd}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Hour</label>
              <input
                type="text"
                name="hour"
                value={formData.hour}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Airline_ID</label>
              <input
                type="text"
                name="airlineID"
                value={formData.airlineID}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Cost</label>
              <input
                type="text"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Point</label>
              <input
                type="text"
                name="point"
                value={formData.point}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="save-button">SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;
