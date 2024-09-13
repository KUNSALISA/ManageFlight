import React from 'react';
import { useParams } from 'react-router-dom';

const EditFlight: React.FC = () => {
  const { flightCode } = useParams<{ flightCode: string }>(); // ดึง flightCode จาก URL

  return (
    <div>
      <h1>Edit Flight {flightCode}</h1>
      {/* เพิ่มฟอร์มหรือข้อมูลเพื่อแก้ไขเที่ยวบิน */}
    </div>
  );
};

export default EditFlight;
