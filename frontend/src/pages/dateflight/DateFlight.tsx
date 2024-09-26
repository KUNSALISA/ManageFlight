import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, Row, Col, Modal, DatePicker, message, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined,SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';
import {GetFlightDetails,GetFlightDetailsByID,UpdateFlightDetails,GetAirline,GetTypeOfFlight,GetAirports} from '../../services/https/index';
import { FlightDetailsInterface, AirlineInterface, AirportInterface, TypeOfFlightInterface } from '../../interfaces/fullmanageflight';
import "./DateFlight.css";

const FlightTable: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [flights, setFlights] = useState<FlightDetailsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>(null); 
  const [modalText, setModalText] = useState<String>();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<Number>();
  const navigate = useNavigate();


  // Table columns definition
  const columns: ColumnsType<FlightDetailsInterface> = [
    {
      title: "Flight Code",
      dataIndex: "FlightCode",
      key: "FlightCode",
    },
    {
      title: "Flying From",
      key: "FlyingFromID",
      render: (record) => <>{record.FlyingFrom?.AirportCode || "N/A"}</>,
    },
    {
      title: "Going To",
      key: "GoingToID",
      render: (record) => <>{record.GoingTo?.AirportCode || "N/A"}</>,
    },
    {
      title: "Schedule Start",
      dataIndex: "ScheduleStart",
      key: "ScheduleStart",
      render: (schedule_start) => (
        <p>{dayjs(schedule_start).format("HH:mm:ss")}</p>
      ),
    },
    {
      title: "Schedule End",
      dataIndex: "ScheduleEnd",
      key: "ScheduleEnd",
      render: (schedule_end) => (
        <p>{dayjs(schedule_end).format("HH:mm:ss")}</p>
      ),
    },
    {
      title: "Airline",
      key: "AirlineID",
      render: (record) => <>{record.Airline?.AirlineName || "N/A"}</>,
    },
    {
      title: "Type",
      key: "TypeID",
      render: (record) => <>{record.Type?.TypeFlight || "N/A"}</>,
    },
    {
      title: "Manage",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => navigate(`/edit-flight/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
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

  // Filter flights based on search text
  const filteredFlights = flights.filter((flight) =>
    flight.FlightCode.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select at least one flight.");
      return;
    }
    setIsModalVisible(true);
  };

  const showModal = (val: FlightDetailsInterface) => {
    setModalText(
      `Do you want to delete "${val.FlightCode}" ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  // Handle saving selected flights with the chosen date
  const handleSave = async () => {
    if (!selectedDate) {
      message.error("Please select a date.");
      return;
    }

    const payload = {
      date: selectedDate.format("YYYY-MM-DD"),
      flightIDs: selectedRowKeys,
      adminID: 1,  // Assuming adminID 1 for testing
    };

    try {
      const response = await axios.post("http://localhost:8080/flight-and-flight-details", payload);
      console.log("Response:", response.data);
      message.success("Flights saved successfully!");
      setIsModalVisible(false);
      navigate("/flight");
    } catch (error) {
      console.error("Error saving flights:", error);
      message.error("Failed to save flights.");
    }
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
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
            <Input
              placeholder="Search Flight Code"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
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

      <Modal
        title="Select Date"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <DatePicker
          placeholder="Select Date"
          onChange={(date) => setSelectedDate(date)}
        />
      </Modal>
    </div>
  );
};

export default FlightTable;
