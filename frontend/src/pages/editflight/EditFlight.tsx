import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu, message, InputNumber, Select } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './EditFlight.css';
import FFF from '../../assets/FFF.png';
import dayjs from 'dayjs';
import {GetFlightDetailsByID,UpdateFlightDetails,GetAirline,GetTypeOfFlight,GetAirports} from '../../services/https/index';
import { FlightDetailsInterface, AirlineInterface, AirportInterface, TypeOfFlightInterface } from '../../interfaces/fullmanageflight';

const { Option } = Select;

function EditFlight() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [flight, setFlight] = useState<FlightDetailsInterface | null>(null);
  const [airlines, setAirlines] = useState<AirlineInterface[]>([]);
  const [types, setTypes] = useState<TypeOfFlightInterface[]>([]);
  const [airports, setAirports] = useState<AirportInterface[]>([]);

  let { id } = useParams();
  console.log(id);
  const [form] = Form.useForm();

  const onFinish = async (values: FlightDetailsInterface) => {
    values.ID = flight?.ID; // ใส่ ID ของ flight ใน object ที่จะส่งไปยัง backend
    let res = await UpdateFlightDetails(values); // เรียกใช้ฟังก์ชัน update
    if (res) {
      messageApi.open({
        type: "success",
        content: "Flight updated successfully!",
      });
      setTimeout(() => {
        navigate('/date-flight'); // นำทางไปยังหน้าอื่นเมื่อสำเร็จ
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "Failed to update flight.",
      });
    }
  };
  

  const getAirline = async () => {
    let res = await GetAirline();
    if (res) {
      setAirlines(res.data);  
    }
  };

  const getAirports = async () => {
    let res = await GetAirports();
    console.log(res);
    if (res) {
      setAirports(res.data);
    }
  };

  const getTypes = async () => {
    let res = await GetTypeOfFlight();
    if (res) {
      setTypes(res.data);
    }
  };

  const getFlightById = async () => {
    let res = await GetFlightDetailsByID(Number(id));
    console.log(res);
    if (res) {
      setFlight(res);
      form.setFieldsValue({
        FlightCode: res.FlightCode,
        TypeID: res.TypeID,
        FlyingFromID: res.FlyingFromID,
        GoingToID: res.GoingToID,
        ScheduleStart: dayjs(res.ScheduleStart),
        ScheduleEnd: dayjs(res.ScheduleEnd),
        Hour: res.Hour,
        AirlineID: res.AirlineID,
        Cost: res.Cost,
        Point: res.Point,
      });
    }
  };

  useEffect(() => {
    getFlightById();
    getAirline();
    getAirports();
    getTypes();
  }, []);
  
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
    <div className="edit-flight-container">
      {contextHolder}
      <div className="header-edit-flight">
        <div className="button-group-edit-flight">
          <img src={FFF} alt="Logo" className="edit-flight-logo" />
          <Button className="home-button-edit-flight" shape="round" onClick={() => navigate('/flight')}>
            Home
          </Button>
        </div>

        <div className="profile-section-edit-flight">
          <Dropdown overlay={menu}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="form-container-addf-dt">
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Flight Code"
                name="FlightCode"
                rules={[{ required: true, message: 'Please input Flight Code!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Type"
                name="TypeID"
                rules={[{ required: true, message: 'Please select Type!' }]}
              >
                <Select allowClear>
                  {types.map(type => (
                    <Option key={type.ID} value={type.TypeFlight}>
                      {type.TypeFlight}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Flying From"
                name="FlyingFromID"
                rules={[{ required: true, message: 'Please select the departure airport!' }]}
              >
                <Select allowClear>
                  {airports.map(airport => (
                    <Option key={airport.ID} value={airport.AirportCode}>
                      {airport.AirportCode}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Going To"
                name="GoingToID"
                rules={[{ required: true, message: 'Please select the destination airport!' }]}
              >
                <Select allowClear>
                  {airports.map(airport => (
                    <Option key={airport.ID} value={airport.AirportCode}>
                      {airport.AirportCode}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Schedule Start"
                name="ScheduleStart"
                rules={[{ required: true, message: 'Please select Schedule Start!' }]}
              >
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Schedule End"
                name="ScheduleEnd"
                rules={[{ required: true, message: 'Please select Schedule End!' }]}
              >
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Hour" name="Hour" rules={[{ required: true, message: 'Please input Hour!' }]}>
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Airline" name="AirlineID" rules={[{ required: true, message: 'Please select Airline!' }]}>
                <Select allowClear>
                  {airlines.map(airline => (
                    <Option key={airline.ID} value={airline.AirlineName}>
                      {airline.AirlineName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Cost" name="Cost" rules={[{ required: true, message: 'Please input Cost!' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Point" name="Point" rules={[{ required: true, message: 'Please input Point!' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Form.Item>
              <Button htmlType="button" size="large" style={{ width: "200px",marginRight: '10px'}} onClick={() => navigate('/date-flight')}>
                CANCEL
              </Button>
              <Button  type="primary" htmlType="submit" icon={<PlusOutlined />} size="large" style={{ width: "200px", backgroundColor: " #69ABC1", borderColor: " #69ABC1" }}>
                SAVE
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div> 
    </div>
  );
};
export default EditFlight;
