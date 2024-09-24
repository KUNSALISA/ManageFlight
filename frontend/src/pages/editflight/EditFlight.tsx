import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu, message, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../addflight/axiosConfig';
import './EditFlight.css';
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';
import moment from 'moment';

const EditFlight: React.FC = () => {
  const [form] = Form.useForm(); // ใช้ฟอร์มจาก Ant Design
  const [airlines, setAirlines] = useState([]); // เก็บข้อมูลสายการบิน
  const [types, setTypes] = useState([]); // เก็บข้อมูลประเภทไฟลท์
  const navigate = useNavigate(); // ใช้ในการนำทางกลับ
  const { id } = useParams<{ id: string }>(); // ดึง ID ของไฟลท์จากพารามิเตอร์ใน URL

  // โหลดข้อมูลเมื่อเปิดหน้า
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airlineRes, typeRes, flightRes] = await Promise.all([
          instance.get('/airline'),
          instance.get('/TypeOfFlight'),
          instance.get(`/flight-details/${id}`), // ดึงข้อมูลไฟลท์ตาม ID
        ]);

        setAirlines(airlineRes.data.data); // ตั้งค่าข้อมูลสายการบิน
        setTypes(typeRes.data.data); // ตั้งค่าข้อมูลประเภทไฟลท์

        const flightData = flightRes.data.data; // ดึงข้อมูลไฟลท์
        form.setFieldsValue({
          flightCode: flightData.flight_code,
          scheduleStart: moment(flightData.schedule_start),
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
        message.error('ไม่สามารถโหลดข้อมูลได้');
      }
    };
    fetchData();
  }, [id, form]);

  // ฟังก์ชันเมื่อกดบันทึก
  const onFinish = async (values: any) => {
    const data = {
      flight_code: values.flightCode,
      schedule_start: values.scheduleStart.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      schedule_end: values.scheduleEnd.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      hour: values.hour,
      cost: values.cost,
      point: values.point,
      airline_id: values.airlineId,
      flying_from_id: values.flyingFrom,
      going_to_id: values.goingTo,
      type_id: values.type,
    };

    try {
      await instance.put(`/flight-details/${id}`, data);
      message.success('แก้ไขไฟลท์สำเร็จ!');
      navigate('/flight'); // นำทางกลับไปหน้าไฟลท์
    } catch (error) {
      message.error('แก้ไขไฟลท์ไม่สำเร็จ');
    }
  };

  // ฟังก์ชันลบข้อมูลไฟลท์
  const handleDelete = async () => {
    try {
      await instance.delete(`/flight-details/${id}`);
      message.success('ลบไฟลท์สำเร็จ!');
      navigate('/flight');
    } catch (error) {
      message.error('ลบไฟลท์ไม่สำเร็จ');
    }
  };

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    navigate('/');
  };

  // เมนูออกจากระบบ
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="edit-flight-container">
      <div className="header-edit-flight">
        <div className="button-group-edit-flight">
          <img src={FFF} alt="Logo" className="edit-flight-logo" />
          <Button className="home-button-edit-flight" shape="round" onClick={() => navigate('/flight')}>
            หน้าหลัก
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
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="รหัสไฟลท์" name="flightCode" rules={[{ required: true, message: 'กรุณากรอกรหัสไฟลท์!' }]}>
                <Input placeholder="รหัสไฟลท์" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ประเภท" name="type" rules={[{ required: true, message: 'กรุณาระบุประเภท!' }]}>
                <InputNumber placeholder="ประเภท" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ต้นทาง" name="flyingFrom" rules={[{ required: true, message: 'กรุณาระบุ ID สนามบินต้นทาง!' }]}>
                <Input placeholder="ต้นทาง" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ปลายทาง" name="goingTo" rules={[{ required: true, message: 'กรุณาระบุ ID สนามบินปลายทาง!' }]}>
                <Input placeholder="ปลายทาง" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="เวลาเริ่มต้น" name="scheduleStart" rules={[{ required: true, message: 'กรุณาเลือกเวลาเริ่มต้น!' }]}>
                <DatePicker showTime placeholder="เลือกเวลา" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="เวลาสิ้นสุด" name="scheduleEnd" rules={[{ required: true, message: 'กรุณาเลือกเวลาสิ้นสุด!' }]}>
                <DatePicker showTime placeholder="เลือกเวลา" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ชั่วโมง" name="hour" rules={[{ required: true, message: 'กรุณากรอกชั่วโมง!' }]}>
                <InputNumber placeholder="ชั่วโมง" min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="สายการบิน" name="airlineId" rules={[{ required: true, message: 'กรุณาระบุ ID สายการบิน!' }]}>
                <InputNumber placeholder="สายการบิน" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ค่าใช้จ่าย" name="cost" rules={[{ required: true, message: 'กรุณากรอกค่าใช้จ่าย!' }]}>
                <InputNumber placeholder="ค่าใช้จ่าย" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="คะแนน" name="point" rules={[{ required: true, message: 'กรุณากรอกคะแนน!' }]}>
                <InputNumber placeholder="คะแนน" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button className="save-button-edit-flight" shape="round" htmlType="submit" block>
              บันทึก
            </Button>
          </Form.Item>

          <Form.Item>
            <Button className="delete-button-edit" danger shape="round" onClick={handleDelete} block>
              ลบ
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditFlight;
