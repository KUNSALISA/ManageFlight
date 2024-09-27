

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import FFF from '../../assets/FFF.png';
import RegisterModal from './Register'; // นำเข้าคอมโพเนนต์ RegisterModal

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false); // ใช้สถานะเพื่อเปิด/ปิด Modal
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: values.email,
        password: values.password,
      });

      const { token,role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('token_type', 'Bearer');

      message.success('Login successful');

      if(role == 'admin'){
        navigate('/flight');
      } else {
        navigate('/date-flight'); ///////////
      }
      
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalVisible(false);
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
          <Form.Item>
            <Button
              type="link"
              onClick={showRegisterModal}
              className="register-link-button"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
      <RegisterModal
        visible={isRegisterModalVisible}
        onClose={handleRegisterModalClose}
      />
    </div>
  );
};

export default Login;
