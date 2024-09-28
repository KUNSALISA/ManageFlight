import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, Space, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/es/table";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';
import {FlightDetailsInterface,FlightAndFlightDetailsInterface} from '../../interfaces/fullmanageflight';
import {GetFlightAndFlightDetails} from '../../services/https/index';
import "./flight.css";

const Flight: React.FC = () => {
  const [flight_s, setDate] = useState<FlightAndFlightDetailsInterface[]>([]);
  const [flightdetails, setFlight] = useState<FlightDetailsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  // Table columns
  const columns: ColumnsType<FlightAndFlightDetailsInterface> = [
    {
      title: "Flight Code",
      key: "FlightDetailID",
      render: (record) => <>{record.FlightDetail?.FlightCode || "N/A"}</>,
    },
    {
      title: "Flying From",
      key: "FlightDetailID",
      render: (record) => <>{record.FlightDetail?.FlyingFrom?.AirportCode || "N/A"}</>,
    },
    {
      title: "Going To",
      key: "FlightDetailID",
      render: (record) => <>{record.FlightDetail?.GoingTo?.AirportCode || "N/A"}</>,
    },
    {
      title: "Schedule Start",
      dataIndex: "FlightDetailID",
      key: "FlightDetailID",
      render: (text, record) => {
        const scheduleStart = record.FlightDetail?.ScheduleStart;
        return (
          <p>{scheduleStart ? dayjs(scheduleStart).format("HH:mm:ss") : "N/A"}</p>
        );
      }
    },
    {
      title: "Schedule End",
      dataIndex: "FlightDetailID",
      key: "FlightDetailID",
      render: (text, record) => {
        const scheduleEnd = record.FlightDetail?.ScheduleEnd;
        return (
          <p>{scheduleEnd ? dayjs(scheduleEnd).format("HH:mm:ss") : "N/A"}</p>
        );
      }
    },
    {
      title: "Airline",
      key: "FlightDetailID",
      render: (record) => <>{record.FlightDetail?.Airline?.AirlineName || "N/A"}</>,
    },
    {
      title: "Flight Date",
      dataIndex: "FlightDate",  
      key: "FlightDate",
      render: (FlightDate) => (
        <p>{dayjs(FlightDate).format("YYYY:MM:DD")}</p>
      ),
    },
  ];

    // Fetch flight details from the backend API
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get("http://localhost:8080/flight-and-flight-details"); //
          setDate(response.data.data);
        } catch (error) {
          console.error("Error fetching flight details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    
  // Filter data based on search text
  const filteredFlights = flight_s.filter((flight) => {
    return flight.FlightDetail?.FlightCode.toLowerCase().includes(searchText.toLowerCase());
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
        <div>เที่ยวบินในแต่ละวัน </div>
        <div className="profile-section">
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
        </Space>
      </div>
      <Table columns={columns} dataSource={filteredFlights} pagination={false} rowKey={(record) => record.ID} loading={loading} />
    </div>
  );
};

export default Flight;
