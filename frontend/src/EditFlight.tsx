// import React from 'react';
// import { useParams } from 'react-router-dom';

// const EditFlight: React.FC = () => {
//   const { flightCode } = useParams<{ flightCode: string }>(); // ดึง flightCode จาก URL

//   return (
//     <div>
//       <h1>Edit Flight {flightCode}</h1>
//       {/* เพิ่มฟอร์มหรือข้อมูลเพื่อแก้ไขเที่ยวบิน */}
//     </div>
//   );
// };

// export default EditFlight;

import React, { useState, useEffect } from 'react';
import { Button, Input, Form } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

interface FlightData {
  key: string;
  flightCode: string;
  from: string;
  to: string;
  start: string;
  end: string;
  airline: string;
}

const EditFlight: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ดึง parameter ID จาก URL
  const navigate = useNavigate();
  
  const [flightData, setFlightData] = useState<FlightData | null>(null);

  useEffect(() => {
    // Mock ข้อมูลการดึง flight ตาม ID
    const fetchFlight = async () => {
      const mockFlights = [
        { key: '1', flightCode: 'FL123', from: 'Bangkok', to: 'Tokyo', start: '2024-09-10 08:00', end: '2024-09-10 12:00', airline: 'Thai Airways' },
        { key: '2', flightCode: 'FL456', from: 'Bangkok', to: 'New York', start: '2024-09-12 20:00', end: '2024-09-13 04:00', airline: 'Emirates' },
      ];
      const flight = mockFlights.find(f => f.key === id);
      setFlightData(flight || null);
    };

    fetchFlight();
  }, [id]);

  const handleSave = () => {
    // บันทึกข้อมูลหลังจากแก้ไข (mock function)
    console.log(flightData);
    navigate('/');
  };

  if (!flightData) {
    return <div>Loading...</div>;
  }

  return (
    <Form layout="vertical">
      <Form.Item label="Flight Code">
        <Input
          value={flightData.flightCode}
          onChange={(e) => setFlightData({ ...flightData, flightCode: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="From">
        <Input
          value={flightData.from}
          onChange={(e) => setFlightData({ ...flightData, from: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="To">
        <Input
          value={flightData.to}
          onChange={(e) => setFlightData({ ...flightData, to: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Start Time">
        <Input
          value={flightData.start}
          onChange={(e) => setFlightData({ ...flightData, start: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="End Time">
        <Input
          value={flightData.end}
          onChange={(e) => setFlightData({ ...flightData, end: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Airline">
        <Input
          value={flightData.airline}
          onChange={(e) => setFlightData({ ...flightData, airline: e.target.value })}
        />
      </Form.Item>
      <Button type="primary" onClick={handleSave}>Save</Button>
    </Form>
  );
};

export default EditFlight;
