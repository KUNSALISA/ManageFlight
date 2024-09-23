

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, DatePicker, Row, Col, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import moment, { Moment } from "moment";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';
import "./DateFlight.css";

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
  Type: {
    type_flight: string;
  };
}

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<FlightDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const navigate = useNavigate();

  // Table columns definition
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
        <p>{dayjs(schedule_start).format("HH:mm : DD MMM YYYY")}</p>
      ),
    },
    {
      title: "Schedule End",
      dataIndex: "schedule_end",
      key: "schedule_end",
      render: (schedule_end) => (
        <p>{dayjs(schedule_end).format("HH:mm : DD MMM YYYY")}</p>
      ),
    },
    {
      title: "Airline",
      key: "AirlineID",
      render: (record) => <>{record.Airline?.airline_name || "N/A"}</>,
    },
    {
      title: "Type",
      key: "TypeID",
      render: (record) => <>{record.Type?.type_flight || "N/A"}</>,
    },
  ];

  // Fetch flight details from API
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

  // Filter data based on search text and date
  const filteredFlights = flights.filter((flight) => {
    const matchesFlightCode = flight.flight_code.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate =
      selectedDate === null || moment(flight.schedule_start).isSame(selectedDate, "day");
    return matchesFlightCode && matchesDate;
  });

  // Handle selection of all rows
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRowKeys([]);
    } else {
      const allKeys = flights.map((flight) => flight.ID);
      setSelectedRowKeys(allKeys);
    }
    setAllSelected(!allSelected);
  };

  const handleAdd = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
  
    const payload = {
      date: selectedDate.format("YYYY-MM-DD"),  // ส่งวันที่ที่เลือก
      flightIDs: selectedRowKeys,              // ส่งรายการของ Flight ID ที่เลือก
      adminID: 1,  // สมมุติว่า AdminID เป็น 1 สำหรับการทดสอบ
    };
  
    try {
      const response = await axios.post("http://localhost:8080/create-flight-and-details", payload);
      console.log("Response:", response.data);
      alert("Flights added successfully!");
    } catch (error) {
      console.error("Error adding flights:", error);
    }
  };
  

  // Logout logic
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
    <div className="container-dateflight-fd">
      {/* Header */}
      <div className="header-addf-fd">
        <div className=".button-group-fd">
          <img src={FFF} alt="Logo" className="addf-logo-fd" />
        </div>
        <Button className="home-button-addf-fd" shape="round" onClick={() => navigate("/flight")}>Home</Button>

        <div className="profile-section-addf-fd">
          <img src={PPP} alt="Profile" className="profile-image-addf-fd" />
          <span className="user-name-addf-fd">John Doe</span>
          <Dropdown overlay={menu}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section-addf-fd">
        <Row gutter={16}>
          <Col span={4}>
            <DatePicker
              placeholder="Select Date"
              className="date-picker-addf-fd"
              onChange={(date) => setSelectedDate(date)}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Search Flight Code"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={2}>
            <Button onClick={handleSelectAll} className="all-button-addf-fd">
              {allSelected ? "Unselect All" : "ALL"}
            </Button>
          </Col>
          <Col span={2}>
            <Button onClick={handleAdd} className="add-button-addf-fd">
              ADD
            </Button>
          </Col>
        </Row>
      </div>

      {/* Table Section */}
      <div className="filter-table-fd">
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          columns={columns}
          dataSource={filteredFlights}
          rowKey={(record) => record.ID}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default FlightTable;


