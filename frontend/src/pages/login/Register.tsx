
import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import axios from 'axios';
import './Register.css';

const Register: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const formattedBirthday = new Date(values.birthday).toISOString(); // แปลงวันที่เป็น ISO format
      await axios.post('http://localhost:8080/register', {
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        birthday: formattedBirthday,
      });
      message.success('Registration successful');
      onClose(); // ปิด modal เมื่อสมัครสำเร็จ
    } catch (error) {
      message.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<div style={{ textAlign: 'center' , color: '#600'}}>Register</div>}
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="register-modal"
    >
      <Form name="register" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your Last Name!' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="birthday"
          label="Birthday"
          rules={[{ required: true, message: 'Please input your Birthday!' }]}
        >
          <Input type="date" placeholder="Birthday" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="register-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Register;
