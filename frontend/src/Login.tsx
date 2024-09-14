// import React, { useState } from 'react';
// import { Form, Input, Button, message } from 'antd';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate
// import './Login.css';

// const Login: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); // สร้างตัวแปร navigate

//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:8080/login', {
//         email: values.email,
//         password: values.password,
//       });
//       localStorage.setItem('token', response.data.token);
//       message.success('Login successful');
//       navigate('/flight'); // หลังจาก login สำเร็จ ให้ไปที่หน้า flight.tsx
//     } catch (error) {
//       message.error('Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <Form
//         name="login"
//         className="login-form"
//         onFinish={onFinish}
//       >
//         <h1>Login</h1>
//         <Form.Item
//           name="email"
//           rules={[{ required: true, message: 'Please input your Email!' }]}
//         >
//           <Input placeholder="Email" />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: 'Please input your Password!' }]}
//         >
//           <Input.Password placeholder="Password" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
//             Log in
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // นำ useNavigate มาใช้
import './Login.css';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนเส้นทาง

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('token', response.data.token);
      message.success('Login successful');
      navigate('/flight'); // เมื่อ login สำเร็จจะไปหน้า flight
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Form name="login" className="login-form" onFinish={onFinish}>
        <h1>Login</h1>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
