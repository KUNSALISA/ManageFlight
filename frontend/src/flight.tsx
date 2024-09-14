// import React, { useState, useEffect } from 'react';
// import { Layout, Menu, Avatar, Button, Table, Input, Row, Col } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import './flight.css';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import {FlightAndFlightDetailsInterface} from "./interfaces/fullmanageflight"

// const { Header, Content } = Layout;

// const Flight: React.FC = () => {
//   const [flights, setFlights] = useState<FlightAndFlightDetailsInterface[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     // ดึงข้อมูลจาก backend 
//     axios.get('http://localhost:8080/flight-and-flight-details')
//       .then((response) => {
//         setFlights(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching flight data:', error);
//       });
//   }, []);

//   const navigate = useNavigate(); // ใช้สำหรับการนำทาง

//   const columns = [
//     {
//       title: 'Date',
//       dataIndex: 'flight_date',
//       key: 'date',
//       render: (record: FlightAndFlightDetailsInterface) => <>{record.Flight?.flight_date || "N/A"}</>,
//     },
//     {
//       title: 'Flight Code',
//       dataIndex: 'flight_code',
//       key: 'flightCode',
//       render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.flight_code || "N/A"}</>,
//     },    
//     {
//       title: 'Flying From',
//       dataIndex: 'airport_code',
//       key: 'flyingFrom',
//       render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.Airport?.airport_code || "N/A"}</>,
//     },
//     {
//       title: 'Going To',
//       dataIndex: 'airport_code',
//       key: 'goingTo',
//       render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.Airport?.airport_code || "N/A"}</>,
//     },
//     {
//       title: 'Schedule Start',
//       dataIndex: 'schedule_start',
//       key: 'scheduleStart',
//       render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.schedule_start || "N/A"}</>,
//     },
//     {
//       title: 'Schedule End',
//       dataIndex: 'schedule_end',
//       key: 'scheduleEnd',
//       render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.schedule_end || "N/A"}</>,
//     },
//     {
//       title: 'Airline',
//       dataIndex: 'airline_name',
//       key: 'airline',
//       render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.Airline?.airline_name || "N/A"}</>,
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_: any, record: FlightAndFlightDetailsInterface) => (
//         <Button 
//           style={{ backgroundColor: '#D8D1BE', color: '#5F212E' }}
//           onClick={() => navigate(`/edit-flight/${record.FlightDetails?.flight_code}`)} // นำทางไปหน้า EditFlight โดยส่ง flight_code ไปด้วย
//         >
//           EDIT
//         </Button>
//       ),
//     },
//   ];

//   const handleSearch = () => {
//     const filteredFlights = flights.filter(flight =>
//       flight.flight_code && flight.flight_code.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFlights(filteredFlights);
//   };

  
//   return (
//     <Layout>
//       {/* ส่วน Header */}
//       <Header className="header" style={{ backgroundColor: '#69ABC1', height: 146 }}>
//         <div style={{ float: 'left', paddingTop: 10 }}>
//           <img
//             src="https://via.placeholder.com/162x128"
//             alt="Logo"
//             style={{ width: 162, height: 128 }}
//           />
//         </div>
//         <Menu theme="light" mode="horizontal" defaultSelectedKeys={['flights']} style={{ backgroundColor: '#69ABC1', height: 146 }}>
//           <Menu.Item key="flights" className="menu-item">Flights</Menu.Item>
//           <Menu.Item key="add-flights" className="menu-item">Add Flights</Menu.Item>
//         </Menu>
//         <div style={{ float: 'right', paddingTop: 30, paddingRight: 50 }}>
//           <Avatar size={88} src="https://via.placeholder.com/113x109" />
//           <Button className="menu-item" style={{ marginLeft: '20px' }}>MEMBER</Button>
//         </div>
//       </Header>

//       {/* ส่วนเนื้อหา */}
//       <Content style={{ padding: '50px 100px' }}>
//         {/* ส่วนค้นหา */}
//         <Row style={{ marginBottom: 20 }}>
//           <Col span={12}>
//             <Input
//               placeholder="ค้นหาเที่ยวบินด้วยรหัส"
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               prefix={<SearchOutlined />}
//               style={{ width: 300 }}
//             />
//           </Col>
//           <Col span={12}>
//             <Button type="primary" onClick={handleSearch} style={{ marginLeft: 10 }}>
//               ค้นหา
//             </Button>
//           </Col>
//         </Row>

//         {/* ตาราง */}
//         <Table
//           columns={columns}
//           dataSource={flights}
//           rowKey="flight_code"
//           pagination={false}
//         />
//       </Content>
//     </Layout>
//   );
// };
// export default Flight;

import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, DatePicker, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './flight.css';
import FFF from './assets/FFF.png'
import PPP from './assets/PPP.jpg'

interface FlightData {
  key: string;
  flightCode: string;
  from: string;
  to: string;
  start: string;
  end: string;
  airline: string;
  date: string;
}

const FlightTable: React.FC = () => {
  const [data, setData] = useState<FlightData[]>([]);
  const [originalData, setOriginalData] = useState<FlightData[]>([]); 
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const flights = [
        { key: '1', flightCode: 'FL123', from: 'Bangkok', to: 'Tokyo', start: '2024-09-10 08:00', end: '2024-09-10 12:00', airline: 'Thai Airways', date: '2024-09-10' },
        { key: '2', flightCode: 'FL456', from: 'Bangkok', to: 'New York', start: '2024-09-12 20:00', end: '2024-09-13 04:00', airline: 'Emirates', date: '2024-09-12' },
      ];
      setData(flights);
      setOriginalData(flights);
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (value === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter((flight) =>
        flight.flightCode.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);

    if (date) {
      const filteredData = originalData.filter((flight) =>
        flight.date === date.format('YYYY-MM-DD')
      );
      setData(filteredData);
    } else {
      setData(originalData);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate('/logout')}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Flight Code',
      dataIndex: 'flightCode',
      key: 'flightCode',
    },
    {
      title: 'Flying From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Going To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Schedule Start',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'Schedule End',
      dataIndex: 'end',
      key: 'end',
    },
    {
      title: 'Airline',
      dataIndex: 'airline',
      key: 'airline',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text: any, record: FlightData) => (
        <Button className="edit-button" onClick={() => navigate(`/edit-flight/${record.key}`)}>
          EDIT
        </Button>
      ),
    },
  ];

  return (
    <div className="flight-container">
      <div className="header">

        <div className="button-group-flight">
          <img src={FFF} alt="Logo" className="left-logo" />
          <Button className="flight-button">Flights</Button>
          <Button className="add-flight-button">Add flights</Button>
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
            onChange={handleSearch}
          />
          <DatePicker
            onChange={handleDateChange}
            value={selectedDate}
            format="YYYY-MM-DD"
          />
        </Space>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default FlightTable;
