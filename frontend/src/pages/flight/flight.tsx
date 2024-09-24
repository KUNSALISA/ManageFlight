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
import "./flight.css";

export interface FlightDetail {
  ID: number;
  FlightDetailID: number;  // ID from FlightDetails
  FlightDate: string; // Date of the flight
  flight_code: string; // From FlightDetails
  schedule_start: string; // From FlightDetails
  schedule_end: string; // From FlightDetails
  Airline: {
    airline_name: string;
  };
  FlyingFrom: {
    airport_code: string;
  };
  GoingTo: {
    airport_code: string;
  };
}

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<FlightDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  // Fetch flight details from the backend API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/flight-and-flight-details");
        const flightData = response.data.data.map((item: any) => ({
          ID: item.ID,
          FlightDetailID: item.FlightDetailID,
          FlightDate: moment(item.flight_date).format("YYYY-MM-DD"),
          flight_code: item.FlightDetail.flight_code,
          schedule_start: moment(item.FlightDetail.schedule_start).format("YYYY-MM-DD HH:mm"),
          schedule_end: moment(item.FlightDetail.schedule_end).format("YYYY-MM-DD HH:mm"),
          Airline: item.FlightDetail.Airline,
          FlyingFrom: item.FlightDetail.FlyingFrom,
          GoingTo: item.FlightDetail.GoingTo,
        }));
        setFlights(flightData);
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
        <p>{dayjs(schedule_start).format("HH:mm:ss")}</p>
      ),
    },
    {
      title: "Schedule End",
      dataIndex: "schedule_end",
      key: "schedule_end",
      render: (schedule_end) => (
        <p>{dayjs(schedule_end).format("HH:mm:ss")}</p>
      ),
    },
    {
      title: "Airline",
      key: "AirlineID",
      render: (record) => <>{record.Airline?.airline_name || "N/A"}</>,
    },
    {
      title: "Flight Date",
      dataIndex: "FlightDate",  // Displaying flight_date from API
      key: "FlightDate",
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

  // Filter data based on search text
  const filteredFlights = flights.filter((flight) => {
    return flight.flight_code.toLowerCase().includes(searchText.toLowerCase());
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
        </Space>
      </div>
      <Table columns={columns} dataSource={filteredFlights} pagination={false} rowKey={(record) => record.ID} loading={loading} />
    </div>
  );
};

export default FlightTable;
