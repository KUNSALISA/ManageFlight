import React from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import './AddFlight.css';
import FFF from '../../assets/FFF.png'
import PPP from '../../assets/PPP.jpg'

const AddFlight: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); 

  const onFinish = (values: any) => {
    console.log('Success:', values);
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
          <Button className="home-button-addf" shape="round" onClick={() => navigate('/flight')}>Home</Button>
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
        >
          {/* โค้ดฟอร์มที่เหลือเหมือนเดิม */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="FlightCode"
                name="flightCode"
                rules={[{ required: true, message: 'Please input FlightCode!' }]}
              >
                <Input placeholder="FlightCode" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Please input Type!' }]}
              >
                <Input placeholder="Type" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Flying From"
                name="flyingFrom"
                rules={[{ required: true, message: 'Please input Flying From!' }]}
              >
                <Input placeholder="Flying From" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Going To"
                name="goingTo"
                rules={[{ required: true, message: 'Please input Going To!' }]}
              >
                <Input placeholder="Going To" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Schedule Start"
                name="scheduleStart"
                rules={[{ required: true, message: 'Please select Schedule Start!' }]}
              >
                <DatePicker placeholder="Select date" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Schedule End"
                name="scheduleEnd"
                rules={[{ required: true, message: 'Please select Schedule End!' }]}
              >
                <DatePicker placeholder="Select date" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Hour"
                name="hour"
                rules={[{ required: true, message: 'Please input Hour!' }]}
              >
                <Input placeholder="Hour" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Airline_ID"
                name="airlineId"
                rules={[{ required: true, message: 'Please input Airline_ID!' }]}
              >
                <Input placeholder="Airline_ID" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Cost"
                name="cost"
                rules={[{ required: true, message: 'Please input Cost!' }]}
              >
                <Input placeholder="Cost" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Point"
                name="point"
                rules={[{ required: true, message: 'Please input Point!' }]}
              >
                <Input placeholder="Point" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
          <Button className="save-button-addf" shape="round" htmlType="submit" block>SAVE</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddFlight;
