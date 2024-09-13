import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Button, Table, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './App.css';
import axios from 'axios';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from backend
    axios.get('https://api.example.com/flights') // แทนที่ URL ด้วย backend ที่ใช้
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);

  const columns = [
    {
      title: 'Flight Code',
      dataIndex: 'flightCode',
      key: 'flightCode',
    },
    {
      title: 'Flying From',
      dataIndex: 'flyingFrom',
      key: 'flyingFrom',
    },
    {
      title: 'Going To',
      dataIndex: 'goingTo',
      key: 'goingTo',
    },
    {
      title: 'Schedule Start',
      dataIndex: 'scheduleStart',
      key: 'scheduleStart',
    },
    {
      title: 'Schedule End',
      dataIndex: 'scheduleEnd',
      key: 'scheduleEnd',
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
      key: 'actions',
      render: (text, record) => (
        <Button style={{ backgroundColor: '#D8D1BE', color: '#5F212E' }}>EDIT</Button>
      ),
    },
  ];

  const handleSearch = () => {
    const filteredFlights = flights.filter(flight =>
      flight.flightCode && flight.flightCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFlights(filteredFlights);
  };
  

  return (
    <Layout>
      {/* Header Section */}
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

      {/* Content Section */}
      <Content style={{ padding: '50px 100px' }}>
        {/* Search Section */}
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Input
              placeholder="Search Flight by Code"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={handleSearch} style={{ marginLeft: 10 }}>
              Search
            </Button>
          </Col>
        </Row>

        {/* Table Section */}
        <Table
          columns={columns}
          dataSource={flights}
          rowKey="flightCode"
          pagination={false}
        />
      </Content>
    </Layout>
  );
};

export default App;