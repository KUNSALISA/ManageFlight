import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu, message, Select, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import instance from './axiosConfig';
import './AddFlight.css';
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';
import { FlightDetailsInterface } from '../../interfaces/fullmanageflight';

const { Option } = Select;

const AddFlight: React.FC = () => {
  const [form] = Form.useForm<FlightDetailsInterface>(); // Set form type to FlightDetailsInterface
  const [airlines, setAirlines] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [airports, setAirports] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airlineRes, typeRes, airportRes] = await Promise.all([
          instance.get('/airline'),
          instance.get('/TypeOfFlight'),
          instance.get('/airport'), // Fetch airports
        ]);
        setAirlines(airlineRes.data.data);
        setTypes(typeRes.data.data);
        setAirports(airportRes.data.data); // Set airports
      } catch (error) {
        message.error('Failed to fetch data.');
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values: FlightDetailsInterface) => {
    const data = {
      flight_code: values.FlightCode,
      schedule_start: values.ScheduleStart, // Assuming the date is already in the correct format
      schedule_end: values.ScheduleEnd, // Assuming the date is already in the correct format
      hour: values.Hour,
      cost: values.Cost,
      point: values.Point,
      airline_id: values.AirlineID,
      flying_from_id: values.FlyingFromID,
      going_to_id: values.GoingToID,
      type_id: values.TypeID,
    };

    try {
      await instance.post('/flight-details', data);
      message.success('Flight added successfully!');
      navigate('/flight');
    } catch (error) {
      message.error('Failed to add flight');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
    <div className="add-fligth-container">
      <div className="header-addf">
        <div className="button-group-addflight">
          <img src={FFF} alt="Logo" className="addf-logo" />
          <Button className="home-button-addf" shape="round" onClick={() => navigate('/flight')}>
            Home
          </Button>
        </div>

        <div className="profile-section-addf">
          <img src={PPP} alt="Profile" className="profile-image-addf" />
          <span className="user-name-addf">John Doe</span>
          <Dropdown overlay={menu}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="form-container-addf">
        <Form
          form={form}
          name="addFlight"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            TypeID: undefined,
            FlyingFromID: undefined,
            GoingToID: undefined,
            ScheduleStart: null,
            ScheduleEnd: null,
            AirlineID: undefined,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Flight Code" name="FlightCode" rules={[{ required: true, message: 'Please input Flight Code!' }]}>
                <Input placeholder="Flight Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Type" name="TypeID" rules={[{ required: true, message: 'Please select Type!' }]}>
                <Select placeholder="Select Type">
                  {types.map(type => (
                    <Option key={type.id} value={type.id}>{type.name}</Option>
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
                <Select placeholder="Select Departure Airport">
                  {airports.map(airport => (
                    <Option key={airport.id} value={airport.id}>{airport.name}</Option>
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
                <Select placeholder="Select Destination Airport">
                  {airports.map(airport => (
                    <Option key={airport.id} value={airport.id}>{airport.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Schedule Start" name="ScheduleStart" rules={[{ required: true, message: 'Please select Schedule Start!' }]}>
                <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Schedule End" name="ScheduleEnd" rules={[{ required: true, message: 'Please select Schedule End!' }]}>
                <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Hour" name="Hour" rules={[{ required: true, message: 'Please input Hour!' }]}>
                <InputNumber placeholder="Hour" min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Airline" name="AirlineID" rules={[{ required: true, message: 'Please select Airline!' }]}>
                <Select placeholder="Select Airline">
                  {airlines.map(airline => (
                    <Option key={airline.id} value={airline.id}>{airline.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Cost" name="Cost" rules={[{ required: true, message: 'Please input Cost!' }]}>
                <InputNumber placeholder="Cost" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Point" name="Point" rules={[{ required: true, message: 'Please input Point!' }]}>
                <InputNumber placeholder="Point" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button className="save-button-addf" shape="round" htmlType="submit" block>
              SAVE
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddFlight;
