
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Input, Space, DatePicker, Dropdown, Menu } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './flight.css';
// import FFF from '../../assets/FFF.png';
// import PPP from '../../assets/PPP.jpg';

// interface FlightData {
//   key: string;
//   flightCode: string;
//   from: string;
//   to: string;
//   start: string;
//   end: string;
//   airline: string;
//   date: string;
// }

// const FlightTable: React.FC = () => {
//   const [data, setData] = useState<FlightData[]>([]);
//   const [originalData, setOriginalData] = useState<FlightData[]>([]); 
//   const [searchText, setSearchText] = useState('');
//   const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const flights = [
//         { key: '1', flightCode: 'FL123', from: 'Bangkok', to: 'Tokyo', start: '2024-09-10 08:00', end: '2024-09-10 12:00', airline: 'Thai Airways', date: '2024-09-10' },
//         { key: '2', flightCode: 'FL456', from: 'Bangkok', to: 'New York', start: '2024-09-12 20:00', end: '2024-09-13 04:00', airline: 'Emirates', date: '2024-09-12' },
//       ];
//       setData(flights);
//       setOriginalData(flights);
//     };
//     fetchData();
//   }, []);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchText(value);

//     if (value === '') {
//       setData(originalData);
//     } else {
//       const filteredData = originalData.filter((flight) =>
//         flight.flightCode.toLowerCase().includes(value.toLowerCase())
//       );
//       setData(filteredData);
//     }
//   };

//   const handleDateChange = (date: moment.Moment | null) => {
//     setSelectedDate(date);

//     if (date) {
//       const filteredData = originalData.filter((flight) =>
//         flight.date === date.format('YYYY-MM-DD')
//       );
//       setData(filteredData);
//     } else {
//       setData(originalData);
//     }
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     // Clear the token from localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('token_type');

//     // Navigate to login page
//     navigate('/');
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="1" onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   const columns = [
//     {
//       title: 'Flight Code',
//       dataIndex: 'flightCode',
//       key: 'flightCode',
//     },
//     {
//       title: 'Flying From',
//       dataIndex: 'from',
//       key: 'from',
//     },
//     {
//       title: 'Going To',
//       dataIndex: 'to',
//       key: 'to',
//     },
//     {
//       title: 'Schedule Start',
//       dataIndex: 'start',
//       key: 'start',
//     },
//     {
//       title: 'Schedule End',
//       dataIndex: 'end',
//       key: 'end',
//     },
//     {
//       title: 'Airline',
//       dataIndex: 'airline',
//       key: 'airline',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Actions',
//       key: 'action',
//       render: (text: any, record: FlightData) => (
//         <Button className="edit-button" onClick={() => navigate(`/edit-flight/${record.key}`)}>
//           EDIT
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="flight-container">
//       <div className="header">
//         <div className="button-group-flight">
//           <img src={FFF} alt="Logo" className="left-logo" />
//           <Button className="flight-button" onClick={() => navigate('/date-flight')}>Flights</Button>
//           <Button className="add-flight-button" onClick={() => navigate('/add-flight')}>Add flights</Button>
//         </div>

//         <div className="profile-section">
//           <img src={PPP} alt="Profile" className="profile-image" />
//           <span className="user-name">John Doe</span>
//           <Dropdown overlay={menu}>
//             <Button>
//               <DownOutlined />
//             </Button>
//           </Dropdown>
//         </div>
//       </div>

//       <div className="search">
//         <Space style={{ marginBottom: 16 }}>
//           <Input
//             placeholder="Search Flight by Code"
//             value={searchText}
//             onChange={handleSearch}
//           />
//           <DatePicker
//             onChange={handleDateChange}
//             value={selectedDate}
//             format="YYYY-MM-DD"
//           />
//         </Space>
//       </div>
//       <Table columns={columns} dataSource={data} pagination={false} />
//     </div>
//   );
// };

// export default FlightTable;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, DatePicker, Space, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/es/table";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { useNavigate } from "react-router-dom";
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';
import "./flight.css";

export interface FlightDetail {
  ID: number;
  flight_code: string;
  schedule_start: string;
  schedule_end: string;
  Airline: {
    airline_name: string;
  };
  FlyingFrom: {
    airport_code: string;
  };
  GoingTo: {
    airport_code: string;
  };
  date: string;
}

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<FlightDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const navigate = useNavigate();

  // Fetch flight details from SQLite backend API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/flight-details");
        setFlights(response.data.data);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Table columns
  const columns: ColumnsType<FlightDetail> = [
    {
      title: "Flight Code",
      dataIndex: "flight_code",
      key: "flight_code",
    },
    {
      title: "Flying From",
      key: "FlyingFromID",
      render: (record) => <>{record.FlyingFrom?.airport_code || "N/A"}</>,
    },
    {
      title: "Going To",
      key: "GoingToID",
      render: (record) => <>{record.GoingTo?.airport_code || "N/A"}</>,
    },
    {
      title: "Schedule Start",
      dataIndex: "schedule_start",
      key: "schedule_start",
      render: (schedule_start) => (
        <p>{moment(schedule_start).format("YYYY-MM-DD HH:mm")}</p>
      ),
    },
    {
      title: "Schedule End",
      dataIndex: "schedule_end",
      key: "schedule_end",
      render: (schedule_end) => (
        <p>{moment(schedule_end).format("YYYY-MM-DD HH:mm")}</p>
      ),
    },
    {
      title: "Airline",
      key: "AirlineID",
      render: (record) => <>{record.Airline?.airline_name || "N/A"}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Button className="edit-button" onClick={() => navigate(`/edit-flight/${record.ID}`)}>
          EDIT
        </Button>
      ),
    },
  ];

  // Filter data based on search text and date
  const filteredFlights = flights.filter((flight) => {
    const matchesFlightCode = flight.flight_code.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate =
      selectedDate === null || moment(flight.schedule_start).isSame(selectedDate, "day");
    return matchesFlightCode && matchesDate;
  });

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    navigate('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flight-container">
      <div className="header">
        <div className="button-group-flight">
          <img src={FFF} alt="Logo" className="left-logo" />
          <Button className="flight-button" onClick={() => navigate('/date-flight')}>Flights</Button>
          <Button className="add-flight-button" onClick={() => navigate('/add-flight')}>Add flights</Button>
        </div>

        <div className="profile-section">
          <img src={PPP} alt="Profile" className="profile-image" />
          <span className="user-name">John Doe</span>
          <Dropdown overlay={menu}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="search">
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search Flight by Code"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <DatePicker
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
            format="YYYY-MM-DD"
          />
        </Space>
      </div>
      <Table columns={columns} dataSource={filteredFlights} pagination={false} rowKey={(record) => record.ID} loading={loading} />
    </div>
  );
};

export default FlightTable;
