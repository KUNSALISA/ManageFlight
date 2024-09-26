// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu, message, Select, InputNumber } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import instance from './axiosConfig';
// import './AddFlight.css';
// import FFF from '../../assets/FFF.png';
// import PPP from '../../assets/PPP.jpg';
// import { FlightDetailsInterface, TypeOfFlightInterface, AirlineInterface, AirportInterface } from '../../interfaces/fullmanageflight';

// const { Option } = Select;

// const AddFlight: React.FC = () => {
//   const [form] = Form.useForm<FlightDetailsInterface>();
//   const [airlines, setAirlines] = useState<AirlineInterface[]>([]);
//   const [types, setTypes] = useState<TypeOfFlightInterface[]>([]);
//   const [airports, setAirports] = useState<AirportInterface[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [airlineRes, typeRes, airportRes] = await Promise.all([
//           instance.get('/airline'),
//           instance.get('/TypeOfFlight'),
//           instance.get('/airport'),
//         ]);
//         setAirlines(airlineRes.data.data);
//         setTypes(typeRes.data.data);
//         setAirports(airportRes.data.data);
//       } catch (error) {
//         message.error('Failed to fetch data.');
//       }
//     };
//     fetchData();
//   }, []);

//   const onFinish = async (values: FlightDetailsInterface) => {
//     const data = {
//       flight_code: values.FlightCode,
//       schedule_start: values.ScheduleStart,
//       schedule_end: values.ScheduleEnd,
//       hour: values.Hour,
//       cost: values.Cost,
//       point: values.Point,
//       airline_id: values.AirlineID,
//       flying_from_id: values.FlyingFromID,
//       going_to_id: values.GoingToID,
//       type_id: values.TypeID,
//     };

//     try {
//       await instance.post('/flight-details', data);
//       message.success('Flight added successfully!');
//       navigate('/flight');
//     } catch (error) {
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
//     <div className="add-flight-container">
//       <div className="header-addf">
//         <div className="button-group-addflight">
//           <img src={FFF} alt="Logo" className="addf-logo" />
//           <Button className="home-button-addf" shape="round" onClick={() => navigate('/flight')}>
//             Home
//           </Button>
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
//           initialValues={{
//             TypeID: undefined,
//             FlyingFromID: undefined,
//             GoingToID: undefined,
//             ScheduleStart: null,
//             ScheduleEnd: null,
//             AirlineID: undefined,
//           }}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Flight Code" name="FlightCode" rules={[{ required: true, message: 'Please input Flight Code!' }]}>
//                 <Input placeholder="Flight Code" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="Type" name="TypeID" rules={[{ required: true, message: 'Please select Type!' }]}>
//                 <Select placeholder="Select Type">
//                   {types.map(type => (
//                     <Option key={type.ID} value={type.ID}>{type.TypeFlight}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item 
//                 label="Flying From" 
//                 name="FlyingFromID" 
//                 rules={[{ required: true, message: 'Please select the departure airport!' }]}
//               >
//                 <Select placeholder="Select Departure Airport">
//                   {airports.map(airport => (
//                     <Option key={airport.ID} value={airport.ID}>{airport.AirportName}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item 
//                 label="Going To" 
//                 name="GoingToID" 
//                 rules={[{ required: true, message: 'Please select the destination airport!' }]}
//               >
//                 <Select placeholder="Select Destination Airport">
//                   {airports.map(airport => (
//                     <Option key={airport.ID} value={airport.ID}>{airport.AirportName}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Schedule Start" name="ScheduleStart" rules={[{ required: true, message: 'Please select Schedule Start!' }]}>
//                 <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="Schedule End" name="ScheduleEnd" rules={[{ required: true, message: 'Please select Schedule End!' }]}>
//                 <DatePicker showTime placeholder="Select date and time" style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Hour" name="Hour" rules={[{ required: true, message: 'Please input Hour!' }]}>
//                 <InputNumber placeholder="Hour" min={1} style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="Airline" name="AirlineID" rules={[{ required: true, message: 'Please select Airline!' }]}>
//                 <Select placeholder="Select Airline">
//                   {airlines.map(airline => (
//                     <Option key={airline.ID} value={airline.ID}>{airline.AirlineName}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Cost" name="Cost" rules={[{ required: true, message: 'Please input Cost!' }]}>
//                 <InputNumber placeholder="Cost" min={0} style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="Point" name="Point" rules={[{ required: true, message: 'Please input Point!' }]}>
//                 <InputNumber placeholder="Point" min={0} style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item>
//             <Button className="save-button-addf" shape="round" htmlType="submit" block>
//               SAVE
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddFlight;

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Select, InputNumber, message, Menu, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import './AddFlight.css';
import FFF from '../../assets/FFF.png'; 
import PPP from '../../assets/PPP.jpg';
import { PlusOutlined, DownOutlined  } from "@ant-design/icons";
import { FlightDetailsInterface, AirlineInterface, AirportInterface, TypeOfFlightInterface } from '../../interfaces/fullmanageflight';
import { GetAirline, GetTypeOfFlight, GetAirports, CreateFlightDetails } from '../../services/https/index'; 

const { Option } = Select;

const CreateFlight: React.FC = () =>{
  const navigate = useNavigate();
  const [messageApi,contextHolder] = message.useMessage();
  const [airlines, setAirlines] = useState<AirlineInterface[]>([]);
  const [types, setTypes] = useState<TypeOfFlightInterface[]>([]);
  const [airports, setAirports] = useState<AirportInterface[]>([]);

  const onFinish = async (values: FlightDetailsInterface) => {
    let res = await CreateFlightDetails(values);
    if (res) {
      messageApi.open({
        type: "success",
        content: "Flight added successfully!",
      });
      setTimeout(() => {
        navigate("/date-flight");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "Failed to add flight. Please try again!",
      });
    }
  };

  const getAirline = async () => {
    let res = await GetAirline();
    if (res) {
      setAirlines(res.data);
      console.log(res);
    }
  };

  const getAirports = async () => {
    let res = await GetAirports();
    if (res) {
      setAirports(res.data);
      console.log(res);
    }
  };

  const getTypes = async () => {
    let res = await GetTypeOfFlight();
    if (res) {
      setTypes(res.data);
      console.log(res);
    }
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

  useEffect(() => {
    getAirline();
    getAirports();
    getTypes();
  }, []);

  return (
    <div className="add-flight-container">
      {contextHolder}
      <Form name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off">
        <div className="header-addf">
          <div className="button-group-addflight">
            <img src={FFF} alt="Logo" className="addf-logo" />
            <Button className="home-button-addf" shape="round" onClick={() => navigate('/flight')}>
              Home
            </Button>
          </div>
          <div className="profile-section-addf">
            <Dropdown overlay={menu}>
              <Button>
               <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>

        <div className="form-container-addf">
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
                    {types.map(item => (
                      <Option value={item.ID} key={item.TypeFlight}>
                        {item.TypeFlight}
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
                  rules={[{ required: true, message: 'Please select the departure Flying From!' }]}
                >
                  <Select placeholder="Select Flying From" allowClear>
                    {airports.map(item => (
                      <Option value={item.ID} key={item.AirportCode}>
                        {item.AirportCode}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Going To"
                  name="GoingToID"
                  rules={[{ required: true, message: 'Please select the destination Going To!' }]}
                >
                  <Select placeholder="Select Going To" allowClear>
                    {airports.map(item => (
                      <Option value={item.ID} key={item.AirportCode}>
                        {item.AirportCode}
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
                    {airlines.map(item => (
                      <Option value={item.ID} key={item.AirlineName}>
                        {item.AirlineName}
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

            <Form.Item>
              <Button className="save-button-addf" shape="round" htmlType="submit" block icon={<PlusOutlined />}>
                SAVE
              </Button>
            </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default CreateFlight;
