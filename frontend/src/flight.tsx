import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Button, Table, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './flight.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import {FlightAndFlightDetailsInterface} from "./interfaces/fullmanageflight"

const { Header, Content } = Layout;

const Flight: React.FC = () => {
  const [flights, setFlights] = useState<FlightAndFlightDetailsInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // ดึงข้อมูลจาก backend 
    axios.get('http://localhost:8080/flight-and-flight-details')
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);

  const navigate = useNavigate(); // ใช้สำหรับการนำทาง

  const columns = [
    {
      title: 'Date',
      dataIndex: 'flight_date',
      key: 'date',
      render: (record: FlightAndFlightDetailsInterface) => <>{record.Flight?.flight_date || "N/A"}</>,
    },
    {
      title: 'Flight Code',
      dataIndex: 'flight_code',
      key: 'flightCode',
      render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.flight_code || "N/A"}</>,
    },    
    {
      title: 'Flying From',
      dataIndex: 'airport_code',
      key: 'flyingFrom',
      render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.Airport?.airport_code || "N/A"}</>,
    },
    {
      title: 'Going To',
      dataIndex: 'airport_code',
      key: 'goingTo',
      render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.Airport?.airport_code || "N/A"}</>,
    },
    {
      title: 'Schedule Start',
      dataIndex: 'schedule_start',
      key: 'scheduleStart',
      render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.schedule_start || "N/A"}</>,
    },
    {
      title: 'Schedule End',
      dataIndex: 'schedule_end',
      key: 'scheduleEnd',
      render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.schedule_end || "N/A"}</>,
    },
    {
      title: 'Airline',
      dataIndex: 'airline_name',
      key: 'airline',
      render: (record: FlightAndFlightDetailsInterface) => <>{record.FlightDetails?.Airline?.airline_name || "N/A"}</>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: FlightAndFlightDetailsInterface) => (
        <Button 
          style={{ backgroundColor: '#D8D1BE', color: '#5F212E' }}
          onClick={() => navigate(`/edit-flight/${record.FlightDetails?.flight_code}`)} // นำทางไปหน้า EditFlight โดยส่ง flight_code ไปด้วย
        >
          EDIT
        </Button>
      ),
    },
  ];

  const handleSearch = () => {
    const filteredFlights = flights.filter(flight =>
      flight.flight_code && flight.flight_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFlights(filteredFlights);
  };

  
  return (
    <Layout>
      {/* ส่วน Header */}
      <Header className="header" style={{ backgroundColor: '#69ABC1', height: 146 }}>
        <div style={{ float: 'left', paddingTop: 10 }}>
          <img
            src="https://via.placeholder.com/162x128"
            alt="Logo"
            style={{ width: 162, height: 128 }}
          />
        </div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['flights']} style={{ backgroundColor: '#69ABC1', height: 146 }}>
          <Menu.Item key="flights" className="menu-item">Flights</Menu.Item>
          <Menu.Item key="add-flights" className="menu-item">Add Flights</Menu.Item>
        </Menu>
        <div style={{ float: 'right', paddingTop: 30, paddingRight: 50 }}>
          <Avatar size={88} src="https://via.placeholder.com/113x109" />
          <Button className="menu-item" style={{ marginLeft: '20px' }}>MEMBER</Button>
        </div>
      </Header>

      {/* ส่วนเนื้อหา */}
      <Content style={{ padding: '50px 100px' }}>
        {/* ส่วนค้นหา */}
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Input
              placeholder="ค้นหาเที่ยวบินด้วยรหัส"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={handleSearch} style={{ marginLeft: 10 }}>
              ค้นหา
            </Button>
          </Col>
        </Row>

        {/* ตาราง */}
        <Table
          columns={columns}
          dataSource={flights}
          rowKey="flight_code"
          pagination={false}
        />
      </Content>
    </Layout>
  );
};
export default Flight;

