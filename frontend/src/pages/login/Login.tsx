
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import FFF from '../../assets/FFF.png';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: values.email,
        password: values.password,
      });
      // เก็บ token ที่ได้ใน localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('token_type', 'Bearer'); // กำหนด Bearer ไว้ใช้ในการส่ง header

      message.success('Login successful');
      navigate('/flight'); // เปลี่ยนหน้าไปที่ flight หลังจาก login สำเร็จ
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="head-log">
      <div className="login-container">
      <img src={FFF} alt="Logo" className="logo-login" />
        <Form name="login" className="login-form" onFinish={onFinish}>
          <h1>Login</h1>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-form-button-go"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
