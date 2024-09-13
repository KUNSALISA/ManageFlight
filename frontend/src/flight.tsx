import React, { useEffect, useState } from 'react';
import { Table, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios'; // ใช้ axios ในการ fetch ข้อมูลจาก API

interface FlightAndFlightDetails {
  id: number;
  flight: {
    flightDate: string;
  };
  flightDetail: {
    flightCode: string;
    scheduleStart: string;
    scheduleEnd: string;
    cost: number;
  };
  admin: {
    name: string;
  };
}

const FlightTable: React.FC = () => {
  const [flightData, setFlightData] = useState<FlightAndFlightDetails[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('/api/flight-and-flight-details') // เปลี่ยน URL ตามที่คุณตั้งค่าใน server
      .then((response) => {
        setFlightData(response.data.data); // ดึงข้อมูลที่ได้มาใส่ใน state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const columns: ColumnsType<FlightAndFlightDetails> = [
    {
      title: 'Flight Code',
      dataIndex: ['flightDetail', 'flightCode'],
      key: 'flightCode',
    },
    {
      title: 'Flight Date',
      dataIndex: ['flight', 'flightDate'],
      key: 'flightDate',
    },
    {
      title: 'Schedule Start',
      dataIndex: ['flightDetail', 'scheduleStart'],
      key: 'scheduleStart',
    },
    {
      title: 'Schedule End',
      dataIndex: ['flightDetail', 'scheduleEnd'],
      key: 'scheduleEnd',
    },
    {
      title: 'Cost',
      dataIndex: ['flightDetail', 'cost'],
      key: 'cost',
      render: (cost: number) => <span>{cost} USD</span>,
    },
    {
      title: 'Admin',
      dataIndex: ['admin', 'name'],
      key: 'admin',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={`/edit-flight/${record.id}`}>Edit</a>
          <a href={`/delete-flight/${record.id}`} style={{ color: 'red' }}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={flightData}
      rowKey="id" // ระบุว่า key ใช้ id
      pagination={{ pageSize: 5 }} // กำหนดจำนวน rows ต่อ page
    />
  );
};

export default FlightTable;
