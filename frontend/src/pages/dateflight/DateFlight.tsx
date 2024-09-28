import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, Row, Col, Modal, DatePicker, message, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined, DownOutlined,SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FFF from '../../assets/FFF.png';
import {GetFlightDetails,DeleteFlightDetails} from '../../services/https/index';
import { FlightDetailsInterface} from '../../interfaces/fullmanageflight';
import "./DateFlight.css";

function DateFlight (){
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

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteFlightDetails(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "Deleted successfully!",
      });
      GetFlightDetails();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "Error Deleted Flights!",
      });
    }
    setConfirmLoading(false);
  };


  const handleSave = async () => {
    if (!selectedDate) {
      message.error("Please select a date.");
      return;
    }

    const payload = {
      date: selectedDate.format("YYYY-MM-DD"),
      flightIDs: selectedRowKeys,
      adminID: 1, 
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

  const handleCancel = () => {
    setOpen(false);
  };

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
      <div className="header-addf-fd">
        <div className=".button-group-fd">
          <img src={FFF} alt="Logo" className="addf-logo-fd" />
        </div>
        <Button className="home-button-addf-fd" shape="round" onClick={() => navigate("/flight")}>Home</Button>

        <div style={{ color: "white", fontSize: "24px",fontWeight: "bold",marginRight:"-10%"}}>เพิ่มเที่ยวบินในวันที่ที่ต้องการ</div>
      
        <div className="profile-section-addf-fd">
          <Dropdown overlay={menu}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

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
        title="Delete ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>

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

export default DateFlight;
