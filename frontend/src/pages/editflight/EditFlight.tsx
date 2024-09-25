import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Dropdown,
  Menu,
  message,
  InputNumber,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './EditFlight.css';
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';
import moment from 'moment';

const EditFlight: React.FC = () => {
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for better UX
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get flight ID from URL parameters

  // Fetching data for airlines, types, and specific flight by ID
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const [airlineRes, typeRes, flightRes] = await Promise.all([
          instance.get('/airline'),
          instance.get('/TypeOfFlight'),
          instance.get(`/flight-details/${id}`),
        ]);

        setAirlines(airlineRes.data.data);
        setTypes(typeRes.data.data);

        const flightData = flightRes.data.data;

        // Set form values based on fetched flight data
        form.setFieldsValue({
          flightCode: flightData.flight_code,
          scheduleStart: moment(flightData.schedule_start), // Ensure proper moment format
          scheduleEnd: moment(flightData.schedule_end),
          hour: flightData.hour,
          cost: flightData.cost,
          point: flightData.point,
          airlineId: flightData.airline_id,
          flyingFrom: flightData.flying_from_id,
          goingTo: flightData.going_to_id,
          type: flightData.type_id,
        });
      } catch (error) {
        message.error('Failed to fetch flight data.');
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [id, form]);

  // Handle form submission
  const onFinish = async (values: any) => {
    const data = {
      flight_code: values.flightCode,
      schedule_start: values.scheduleStart.format('YYYY-MM-DDTHH:mm:ss[Z]'), // Proper date format
      schedule_end: values.scheduleEnd.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      hour: values.hour,
      cost: values.cost,
      point: values.point,
      airline_id: values.airlineId,
      flying_from_id: values.flyingFrom,
      going_to_id: values.goingTo,
      type_id: values.type,
    };

    setLoading(true); // Start loading during submission

    try {
      await instance.put(`/flight-details/${id}`, data);
      message.success('Flight updated successfully!');
      navigate('/flight');
    } catch (error) {
      message.error('Failed to update flight');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    setLoading(true); // Start loading during deletion
    try {
      await instance.delete(`/flight-details/${id}`);
      message.success('Flight deleted successfully!');
      navigate('/flight');
    } catch (error) {
      message.error('Failed to delete flight');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle logout
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
      <div className="header-edit-flight">
        <div className="button-group-edit-flight">
          <img src={FFF} alt="Logo" className="edit-flight-logo" />
          <Button className="home-button-edit-flight" shape="round" onClick={() => navigate('/flight')}>
            Home
          </Button>
        </div>

        <div className="profile-section-edit-flight">
          <img src={PPP} alt="Profile" className="profile-image-edit-flight" />
          <span className="user-name-edit-flight">John Doe</span>
          <Dropdown overlay={menu}>
            <Button>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="form-container-edit-flight">
        <Form
          form={form}
          name="editFlight"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            type: undefined,
            flyingFrom: undefined,
            goingTo: undefined,
            scheduleStart: null,
            scheduleEnd: null,
            airlineId: undefined,
          }}
        >
          {/* Form fields */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Flight Code"
                name="flightCode"
                rules={[{ required: true, message: 'Please input Flight Code!' }]}
              >
                <Input placeholder="Flight Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Please select Type!' }]}
              >
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
              <Form.Item
                label="Schedule Start"
                name="scheduleStart"
                rules={[{ required: true, message: 'Please select Schedule Start!' }]}
              >
                <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Schedule End"
                name="scheduleEnd"
                rules={[{ required: true, message: 'Please select Schedule End!' }]}
              >
                <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
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
                <InputNumber placeholder="Hour" min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Airline ID"
                name="airlineId"
                rules={[{ required: true, message: 'Please input Airline ID!' }]}
              >
                <InputNumber placeholder="Airline ID" style={{ width: '100%' }} />
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
                <InputNumber placeholder="Cost" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Point"
                name="point"
                rules={[{ required: true, message: 'Please input Point!' }]}
              >
                <InputNumber placeholder="Point" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button className="save-button-edit-flight" shape="round" htmlType="submit" block loading={loading}>
              SAVE
            </Button>
          </Form.Item>

          <Form.Item>
            <Button className="delete-button-edit-flight" shape="round" onClick={handleDelete} block loading={loading}>
              DELETE
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditFlight;
