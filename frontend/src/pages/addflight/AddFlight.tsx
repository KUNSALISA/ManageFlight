import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu, message, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import instance from './axiosConfig';
import './AddFlight.css';
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';

const AddFlight: React.FC = () => {
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airlineRes, typeRes] = await Promise.all([
          instance.get('/airline'),
          instance.get('/TypeOfFlight'),
        ]);
        setAirlines(airlineRes.data.data);
        setTypes(typeRes.data.data);
      } catch (error) {
        message.error('Failed to fetch data.');
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    const data = {
      flight_code: values.flightCode,
      schedule_start: values.scheduleStart.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      schedule_end: values.scheduleEnd.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      hour: values.hour,
      cost: values.cost,
      point: values.point,
      airline_id: values.airlineId,
      flying_from_id: values.flyingFrom, // ID input for Flying From
      going_to_id: values.goingTo,       // ID input for Going To
      type_id: values.type,
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
            type: undefined,
            flyingFrom: undefined,
            goingTo: undefined,
            scheduleStart: null,
            scheduleEnd: null,
            airlineId: undefined,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Flight Code" name="flightCode" rules={[{ required: true, message: 'Please input Flight Code!' }]}>
                <Input placeholder="Flight Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select Type!' }]}>
                <InputNumber placeholder="Type ID" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                label="Flying From ID" 
                name="flyingFrom" 
                rules={[{ required: true, message: 'Please input the departure airport ID!' }]}
              >
                <Input placeholder="Flying From ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label="Going To ID" 
                name="goingTo" 
                rules={[{ required: true, message: 'Please input the destination airport ID!' }]}
              >
                <Input placeholder="Going To ID" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Schedule Start" name="scheduleStart" rules={[{ required: true, message: 'Please select Schedule Start!' }]}>
                <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Schedule End" name="scheduleEnd" rules={[{ required: true, message: 'Please select Schedule End!' }]}>
                <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Hour" name="hour" rules={[{ required: true, message: 'Please input Hour!' }]}>
                <InputNumber placeholder="Hour" min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Airline ID" name="airlineId" rules={[{ required: true, message: 'Please input Airline ID!' }]}>
                <InputNumber placeholder="Airline ID" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Cost" name="cost" rules={[{ required: true, message: 'Please input Cost!' }]}>
                <InputNumber placeholder="Cost" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Point" name="point" rules={[{ required: true, message: 'Please input Point!' }]}>
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
