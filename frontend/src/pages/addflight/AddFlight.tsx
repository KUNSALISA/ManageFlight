// import React from 'react';
// import { Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu, message } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';
// import './AddFlight.css';
// import FFF from '../../assets/FFF.png'
// import PPP from '../../assets/PPP.jpg'

// const AddFlight: React.FC = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate(); 

//   const onFinish = async (values: any) => {
//     try {
//       const response = await axios.post('http://localhost:8080/createFlightDetails', {
//         flight_code: values.flightCode,
//         schedule_start: values.scheduleStart.format('YYYY-MM-DD'), 
//         schedule_end: values.scheduleEnd.format('YYYY-MM-DD'),
//         hour: values.hour,
//         cost: values.cost,
//         point: values.point,
//         airline_id: values.airlineId, 
//         flying_from_id: values.flyingFrom,
//         going_to_id: values.goingTo,
//         type_id: values.type,
//       });
//       message.success('Flight added successfully');
//       navigate('/flight');
//     } catch (error) {
//       console.error('Failed to add flight:', error);
//       message.error('Failed to add flight');
//     }
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('token_type');
//     navigate('/');
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="1" onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div className="add-fligth-container">
//       <div className="header-addf">
//         <div className="button-group-addflight">
//           <img src={FFF} alt="Logo" className="addf-logo" />
//           <Button className="home-button-addf" shape="round" onClick={() => navigate('/flight')}>Home</Button>
//         </div>

//         <div className="profile-section-addf">
//           <img src={PPP} alt="Profile" className="profile-image-addf" />
//           <span className="user-name-addf">John Doe</span>
//           <Dropdown overlay={menu}>
//             <Button>
//               <DownOutlined />
//             </Button>
//           </Dropdown>
//         </div>
//       </div>

//       <div className="form-container-addf">
//         <Form
//           form={form}
//           name="addFlight"
//           layout="vertical"
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Flight Code"
//                 name="flightCode"
//                 rules={[{ required: true, message: 'Please input Flight Code!' }]}
//               >
//                 <Input placeholder="Flight Code" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Type"
//                 name="type"
//                 rules={[{ required: true, message: 'Please input Type!' }]}
//               >
//                 <Input placeholder="Type" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Flying From"
//                 name="flyingFrom"
//                 rules={[{ required: true, message: 'Please input Flying From!' }]}
//               >
//                 <Input placeholder="Flying From" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Going To"
//                 name="goingTo"
//                 rules={[{ required: true, message: 'Please input Going To!' }]}
//               >
//                 <Input placeholder="Going To" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Schedule Start"
//                 name="scheduleStart"
//                 rules={[{ required: true, message: 'Please select Schedule Start!' }]}
//               >
//                 <DatePicker placeholder="Select date" style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Schedule End"
//                 name="scheduleEnd"
//                 rules={[{ required: true, message: 'Please select Schedule End!' }]}
//               >
//                 <DatePicker placeholder="Select date" style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Hour"
//                 name="hour"
//                 rules={[{ required: true, message: 'Please input Hour!' }]}
//               >
//                 <Input placeholder="Hour" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Airline ID"
//                 name="airlineId"
//                 rules={[{ required: true, message: 'Please input Airline ID!' }]}
//               >
//                 <Input placeholder="Airline ID" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Cost"
//                 name="cost"
//                 rules={[{ required: true, message: 'Please input Cost!' }]}
//               >
//                 <Input placeholder="Cost" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Point"
//                 name="point"
//                 rules={[{ required: true, message: 'Please input Point!' }]}
//               >
//                 <Input placeholder="Point" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item>
//             <Button className="save-button-addf" shape="round" htmlType="submit" block>SAVE</Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddFlight;


import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

interface FlightDetails {
  flight_code: string;
  schedule_start: string;
  schedule_end: string;
  hour: number;
  cost: number;
  point: number;
  airline_id: number;
  flying_from_id: number;
  going_to_id: number;
  type_id: number;
}

const FlightForm: React.FC = () => {
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [types, setTypes] = useState([]);

  // ดึงข้อมูลสายการบิน สนามบิน และประเภทเที่ยวบินจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const airlinesResponse = await axios.get('http://localhost:8080/airlines');
        const airportsResponse = await axios.get('http://localhost:8080/airports');
        const typesResponse = await axios.get('http://localhost:8080/types');
        
        setAirlines(airlinesResponse.data.data);
        setAirports(airportsResponse.data.data);
        setTypes(typesResponse.data.data);
      } catch (error) {
        notification.error({ message: 'ไม่สามารถดึงข้อมูลได้!' });
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    try {
      const formattedValues: FlightDetails = {
        ...values,
        schedule_start: values.schedule_start.format('YYYY-MM-DD HH:mm:ss'),
        schedule_end: values.schedule_end.format('YYYY-MM-DD HH:mm:ss'),
      };

      const response = await axios.post('http://localhost:8080/flight-details', formattedValues);

      if (response.status === 200) {
        notification.success({ message: 'เพิ่มเที่ยวบินเรียบร้อยแล้ว!' });
        form.resetFields();
      }
    } catch (error) {
      notification.error({ message: 'ไม่สามารถเพิ่มข้อมูลเที่ยวบินได้!' });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ hour: 1, cost: 100, point: 0 }}
    >
      <Form.Item
        label="รหัสเที่ยวบิน"
        name="flight_code"
        rules={[{ required: true, message: 'กรุณากรอกรหัสเที่ยวบิน!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="เวลาเริ่มต้น"
        name="schedule_start"
        rules={[{ required: true, message: 'กรุณาเลือกเวลาเริ่มต้น!' }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        label="เวลาสิ้นสุด"
        name="schedule_end"
        rules={[{ required: true, message: 'กรุณาเลือกเวลาสิ้นสุด!' }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        label="ระยะเวลาบิน (ชั่วโมง)"
        name="hour"
        rules={[{ required: true, message: 'กรุณากรอกจำนวนชั่วโมงบิน!' }]}
      >
        <InputNumber min={1} max={24} />
      </Form.Item>

      <Form.Item
        label="ค่าใช้จ่าย"
        name="cost"
        rules={[{ required: true, message: 'กรุณากรอกค่าใช้จ่าย!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label="คะแนนสะสม"
        name="point"
        rules={[{ required: true, message: 'กรุณากรอกคะแนนสะสม!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      {/* เลือกข้อมูลสายการบิน สนามบินต้นทาง สนามบินปลายทาง และประเภทเที่ยวบิน */}
      <Form.Item
        label="สายการบิน"
        name="airline_id"
        rules={[{ required: true, message: 'กรุณาเลือกสายการบิน!' }]}
      >
        <Select>
          {airlines.map((airline: any) => (
            <Option key={airline.ID} value={airline.ID}>{airline.airline_name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="ต้นทาง"
        name="flying_from_id"
        rules={[{ required: true, message: 'กรุณาเลือกสนามบินต้นทาง!' }]}
      >
        <Select>
          {airports.map((airport: any) => (
            <Option key={airport.ID} value={airport.ID}>{airport.airport_code}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="ปลายทาง"
        name="going_to_id"
        rules={[{ required: true, message: 'กรุณาเลือกสนามบินปลายทาง!' }]}
      >
        <Select>
          {airports.map((airport: any) => (
            <Option key={airport.ID} value={airport.ID}>{airport.airport_code}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="ประเภทเที่ยวบิน"
        name="type_id"
        rules={[{ required: true, message: 'กรุณาเลือกประเภทเที่ยวบิน!' }]}
      >
        <Select>
          {types.map((type: any) => (
            <Option key={type.ID} value={type.ID}>{type.type_flight}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          เพิ่มเที่ยวบิน
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FlightForm;

