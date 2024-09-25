// import React, { useState, useEffect } from 'react';
// import {Form,Input,Button,DatePicker,Divider,Row,Col,Card,Dropdown,Menu,message,InputNumber,Select,} from 'antd';
// import dayjs from "dayjs";
// import { PlusOutlined ,DownOutlined } from '@ant-design/icons';
// import { useNavigate, useParams } from 'react-router-dom';
// import './EditFlight.css';
// import FFF from '../../assets/FFF.png';
// import PPP from '../../assets/PPP.jpg';
// import moment from 'moment';
// import {GetFlightDetails,GetFlightDetailsByID,UpdateFlightDetails,GetAirline,GetTypeOfFlight,GetAirports} from '../../services/https/index';
// import { FlightDetailsInterface, AirlineInterface, AirportInterface, TypeOfFlightInterface } from '../../interfaces/fullmanageflight';
// const { Option } = Select;

// function EditFlight() {
//   const navigate = useNavigate();
//   const [messageApi,contextHolder] = message.useMessage();
//   const [flights, setFlights] = useState<FlightDetailsInterface[]>([]);
//   const [airlines, setAirlines] = useState<AirlineInterface[]>([]);
//   const [types, setTypes] = useState<TypeOfFlightInterface[]>([]);
//   const [airports, setAirports] = useState<AirportInterface[]>([]);

//   let { id } = useParams();
//   // อ้างอิง form กรอกข้อมูล
//   const [form] = Form.useForm();

//   const onFinish = async (values: FlightDetailsInterface) => {
//     values.ID = flights?.ID;
//     let res = await UpdateFlightDetails(values);
//     if (res) {
//       messageApi.open({
//         type: "success",
//         content: res.message,
//       });
//       setTimeout(function () {
//         navigate("/flight");
//       }, 2000);
//     } else {
//       messageApi.open({
//         type: "error",
//         content: res.message,
//       });
//     }
//   };

//   const getAirline = async () => {
//     let res = await GetAirline();
//     if (res) {
//       setAirlines(res.data);
//       console.log(res);
//     }
//   };

//   const getAirports = async () => {
//     let res = await GetAirports();
//     if (res) {
//       setAirports(res.data);
//       console.log(res);
//     }
//   };

//   const getTypes = async () => {
//     let res = await GetTypeOfFlight();
//     if (res) {
//       setTypes(res.data);
//       console.log(res);
//     }
//   };

//   const getFlightById = async () => {
//     let res = await GetFlightDetailsByID(Number(id));
//     if (res) {
//       setFlights(res);
//       // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
//       form.setFieldsValue({
//         FirstName: res.FirstName,
//         LastName: res.LastName,
//         GenderID: res.GenderID,
//         Email: res.Email,
//         BirthDay: dayjs(res.BirthDay),
//       });
//     }
//   };
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('token_type');
//     navigate('/');
//   };

//   const menu = (
//   <Menu>
//     <Menu.Item key="1" onClick={handleLogout}>
//           Logout
//     </Menu.Item>
//   </Menu>
//   );

//   useEffect(() => {
//   getAirline();
//   getAirports();
//   getTypes();
//   getFlightById();
//   }, []);

//   return (
//     <div className="edit-flight-container">
//       {contextHolder}
//       <div className="header-edit-flight">
//         <div className="button-group-edit-flight">
//           <img src={FFF} alt="Logo" className="edit-flight-logo" />
//           <Button className="home-button-edit-flight" shape="round" onClick={() => navigate('/flight')}>
//             Home
//           </Button>
//         </div>

//         <div className="profile-section-edit-flight">
//           <Dropdown overlay={menu}>
//             <Button>
//               <DownOutlined />
//             </Button>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="form-container-addf-dt">
//         <Form
//             name="basic"
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             autoComplete="off"
//         >
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="Flight Code"
//                   name="FlightCode"
//                   rules={[{ required: true, message: 'Please input Flight Code!' }]}
//                 >
//                   <Input placeholder="Flight Code" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Type"
//                   name="type"
//                   rules={[{ required: true, message: 'Please select Type!' }]}
//                 >
//                   <InputNumber placeholder="Type ID" style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="Flying From ID"
//                   name="flyingFrom"
//                   rules={[{ required: true, message: 'Please input the departure airport ID!' }]}
//                 >
//                   <Input placeholder="Flying From ID" />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Going To ID"
//                   name="goingTo"
//                   rules={[{ required: true, message: 'Please input the destination airport ID!' }]}
//                 >
//                   <Input placeholder="Going To ID" />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="Schedule Start"
//                   name="scheduleStart"
//                   rules={[{ required: true, message: 'Please select Schedule Start!' }]}
//                 >
//                   <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Schedule End"
//                   name="scheduleEnd"
//                   rules={[{ required: true, message: 'Please select Schedule End!' }]}
//                 >
//                   <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="Hour"
//                   name="hour"
//                   rules={[{ required: true, message: 'Please input Hour!' }]}
//                 >
//                   <InputNumber placeholder="Hour" min={1} style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Airline ID"
//                   name="airlineId"
//                   rules={[{ required: true, message: 'Please input Airline ID!' }]}
//                 >
//                   <InputNumber placeholder="Airline ID" style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="Cost"
//                   name="cost"
//                   rules={[{ required: true, message: 'Please input Cost!' }]}
//                 >
//                   <InputNumber placeholder="Cost" min={0} style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item
//                   label="Point"
//                   name="point"
//                   rules={[{ required: true, message: 'Please input Point!' }]}
//                 >
//                   <InputNumber placeholder="Point" min={0} style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item>
//               <Button htmlType="button" style={{ marginRight: "10px" }}>
//                   CANCEL
//                 </Button>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   icon={<PlusOutlined />}
//                 >
//                   SAVE
//               </Button>
//             </Form.Item>

//             <Form.Item>
//               <Button className="delete-button-edit-flight" shape="round" onClick={handleDelete} block loading={loading}>
//                 DELETE
//               </Button>
//             </Form.Item>
//           </Form>
//           </div>
//       </div>
//    );
// };


// export default EditFlight;

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu, message, InputNumber, Select } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './EditFlight.css';
import FFF from '../../assets/FFF.png';
import dayjs from 'dayjs';
import {
  GetFlightDetailsByID,
  UpdateFlightDetails,
  GetAirline,
  GetTypeOfFlight,
  GetAirports
} from '../../services/https/index';
import { FlightDetailsInterface, AirlineInterface, AirportInterface, TypeOfFlightInterface } from '../../interfaces/fullmanageflight';

const { Option } = Select;

const EditFlight: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // State for flight details and form data
  const [flight, setFlight] = useState<FlightDetailsInterface | null>(null);
  const [airlines, setAirlines] = useState<AirlineInterface[]>([]);
  const [types, setTypes] = useState<TypeOfFlightInterface[]>([]);
  const [airports, setAirports] = useState<AirportInterface[]>([]);

  // Fetch Flight Details by ID and populate form
  const getFlightById = async () => {
    const res = await GetFlightDetailsByID(Number(id));
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

  // Fetch Airline, Airport, and Flight Type data
  const fetchSelectOptions = async () => {
    const airlineRes = await GetAirline();
    const typeRes = await GetTypeOfFlight();
    const airportRes = await GetAirports();
    
    if (airlineRes) setAirlines(airlineRes.data);
    if (typeRes) setTypes(typeRes.data);
    if (airportRes) setAirports(airportRes.data);
  };

  // Update Flight details on form submission
  const onFinish = async (values: FlightDetailsInterface) => {
    const updatedFlight = { ...values, ID: flight?.ID };
    const res = await UpdateFlightDetails(updatedFlight);
    if (res) {
      messageApi.success("Flight updated successfully!");
      setTimeout(() => {
        navigate('/flight');
      }, 2000);
    } else {
      messageApi.error("Failed to update flight.");
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

  useEffect(() => {
    getFlightById();
    fetchSelectOptions();
  }, []);

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
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Flight Code"
                name="FlightCode"
                rules={[{ required: true, message: 'Please input Flight Code!' }]}
              >
                <Input placeholder="Flight Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Type"
                name="TypeID"
                rules={[{ required: true, message: 'Please select Type!' }]}
              >
                <Select placeholder="Select Type" allowClear>
                  {types.map(type => (
                    <Option key={type.ID} value={type.ID}>
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
                <Select placeholder="Select Flying From" allowClear>
                  {airports.map(airport => (
                    <Option key={airport.ID} value={airport.ID}>
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
                <Select placeholder="Select Going To" allowClear>
                  {airports.map(airport => (
                    <Option key={airport.ID} value={airport.ID}>
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
                <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Schedule End"
                name="ScheduleEnd"
                rules={[{ required: true, message: 'Please select Schedule End!' }]}
              >
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
                <Select placeholder="Select Airline" allowClear>
                  {airlines.map(airline => (
                    <Option key={airline.ID} value={airline.ID}>
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
                <InputNumber placeholder="Cost" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Point" name="Point" rules={[{ required: true, message: 'Please input Point!' }]}>
                <InputNumber placeholder="Point" min={0} style={{ width: '100%' }} />
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
