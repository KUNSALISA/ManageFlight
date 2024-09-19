// import React, { useState } from "react";
// import { Table, Button, Input, DatePicker, Row, Col, Dropdown, Menu } from "antd";
// import { useNavigate } from "react-router-dom";
// import type { ColumnsType } from "antd/es/table";
// import moment, { Moment } from "moment"; // เพิ่ม moment สำหรับจัดการวันที่
// import "./DateFlight.css";
// import { DownOutlined, SearchOutlined } from "@ant-design/icons";
// import FFF from '../../assets/FFF.png';
// import PPP from '../../assets/PPP.jpg';

// interface FlightDetail {
//   key: string;
//   flightCode: string;
//   flyingFrom: string;
//   goingTo: string;
//   scheduleStart: string;
//   scheduleEnd: string;
//   airline: string;
// }

// const data: FlightDetail[] = [
//   {
//     key: "1",
//     flightCode: "AA123",
//     flyingFrom: "New York",
//     goingTo: "London",
//     scheduleStart: "2024-09-10 14:30",
//     scheduleEnd: "2024-09-10 18:45",
//     airline: "American Airlines",
//   },
//   {
//     key: "2",
//     flightCode: "BA456",
//     flyingFrom: "London",
//     goingTo: "New York",
//     scheduleStart: "2024-09-11 10:00",
//     scheduleEnd: "2024-09-11 13:30",
//     airline: "British Airways",
//   },
//   {
//     key: "3",
//     flightCode: "DL789",
//     flyingFrom: "Atlanta",
//     goingTo: "Paris",
//     scheduleStart: "2024-09-12 16:00",
//     scheduleEnd: "2024-09-12 20:15",
//     airline: "Delta Airlines",
//   },
// ];

// const DateFlight: React.FC = () => {
//   const navigate = useNavigate();
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
//   const [allSelected, setAllSelected] = useState(false); // สำหรับจัดการสถานะเลือกทั้งหมด/ยกเลิก

//   const GetFlightDetails = async () => {
//     let res = await GetFlightDetails();
//     if (res) {
//       setUsers(res);
//     }
//   };

//   useEffect(() => {
//     GetFlightDetails();
//   }, []);


//   const columns: ColumnsType<FlightDetail> = [
//     {
//       title: "Flight Code",
//       dataIndex: "flightCode",
//       key: "flightCode",
//     },
//     {
//       title: "Flying From",
//       dataIndex: "flyingFrom",
//       key: "flyingFrom",
//     },
//     {
//       title: "Going To",
//       dataIndex: "goingTo",
//       key: "goingTo",
//     },
//     {
//       title: "Schedule Start",
//       dataIndex: "scheduleStart",
//       key: "scheduleStart",
//     },
//     {
//       title: "Schedule End",
//       dataIndex: "scheduleEnd",
//       key: "scheduleEnd",
//     },
//     {
//       title: "Airline",
//       dataIndex: "airline",
//       key: "airline",
//     },
//   ];

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedRowKeys([]);
//     } else {
//       const allKeys = data.map((flight) => flight.key);
//       setSelectedRowKeys(allKeys);
//     }
//     setAllSelected(!allSelected); // สลับสถานะเลือกทั้งหมด/ยกเลิก
//   };

//   const handleAdd = () => {
//     console.log("Add selected flights:", selectedRowKeys);
//     // Logic สำหรับเพิ่มข้อมูลที่ถูกเลือกใน sqlite
//   };

//   // ฟังก์ชันสำหรับการค้นหา flight code
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchText(e.target.value);
//   };

//   // ฟังก์ชันสำหรับการค้นหาด้วยวันที่
//   const handleDateChange = (date: Moment | null) => {
//     setSelectedDate(date);
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

//   // ฟิลเตอร์ข้อมูลด้วย flight code และวันที่
//   const filteredData = data.filter((flight) => {
//     const matchesFlightCode = flight.flightCode
//       .toLowerCase()
//       .includes(searchText.toLowerCase());
//     const matchesDate =
//       selectedDate === null ||
//       moment(flight.scheduleStart).isSame(selectedDate, "day");
//     return matchesFlightCode && matchesDate;
//   });

//   return (
//     <div className="container-dateflight-fd">
//       <div className="header-addf-fd">
//         <div className=".button-group-fd">
//           <img src={FFF} alt="Logo" className="addf-logo-fd" />
//         </div>
//         <Button className="home-button-addf-fd" shape="round" onClick={() => navigate("/flight")}>Home</Button>

//         <div className="profile-section-addf-fd">
//           <img src={PPP} alt="Profile" className="profile-image-addf-fd" />
//           <span className="user-name-addf-fd">John Doe</span>
//             <Dropdown overlay={menu}>
//                 <Button>
//                 <DownOutlined />
//                 </Button>
//             </Dropdown>
//         </div>
//       </div>

//       {/* Filter และปุ่ม ALL / ADD */}
//       <div className="filter-section-addf-fd">
//         <Row gutter={16}>
//           <Col span={4}>
//             <DatePicker
//               placeholder="เลือกวันที่"
//               className="date-picker-addf-fd"
//               onChange={handleDateChange}
//             />
//           </Col>
//           <Col span={4}>
//             <Input
//                 placeholder="Search Flight Code"
//                 value={searchText}
//                 onChange={handleSearch}
//                 prefix={<SearchOutlined />}
//             />
//           </Col>
//           <Col span={2}>
//             <Button onClick={handleSelectAll} className="all-button-addf-fd">
//               {allSelected ? "Unselect All" : "ALL"}
//             </Button>
//           </Col>
//           <Col span={2}>
//             <Button onClick={handleAdd} className="add-button-addf-fd">
//               ADD
//             </Button>
//           </Col>
//         </Row>
//       </div>

//       <div className="filter-table-fd">
//         <Table
//             rowSelection={{
//             selectedRowKeys,
//             onChange: (keys) => setSelectedRowKeys(keys),
//             }}
//             columns={columns}
//             dataSource={filteredData}
//         />
//       </div>
//     </div>
//   );
// };

// export default DateFlight;

import React, { useEffect, useState } from "react";
import { Table, Button, Input, DatePicker, Row, Col, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import moment, { Moment } from "moment";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import FFF from '../../assets/FFF.png';
import PPP from '../../assets/PPP.jpg';
import { GetFlightDetails } from '../../services/https'; // เรียกใช้จาก service ที่สร้างไว้แล้ว

interface AirlineInterface {
  airline_name: string;
}

interface AirportInterface {
  airport_name: string;
}

interface TypeOfFlightInterface {
  type: string;
}

interface FlightDetail {
  key: string;
  flightCode: string;
  scheduleStart: string;
  scheduleEnd: string;
  airline: AirlineInterface;
  flyingFrom: AirportInterface;
  goingTo: AirportInterface;
  type: TypeOfFlightInterface;
}

const DateFlight: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [allSelected, setAllSelected] = useState(false); 
  const [flights, setFlights] = useState<FlightDetail[]>([]); // เก็บข้อมูล flights ที่ดึงมาจาก backend

  // ฟังก์ชันดึงข้อมูล flight details จาก backend โดยใช้ GetFlightDetails จาก service
  const fetchFlightDetails = async () => {
    try {
      const res = await GetFlightDetails(); // ใช้จาก service ที่สร้างไว้แล้ว
      if (res && res.data) {
        const flightDetails = res.data.map((flight: any) => ({
          key: flight.id,
          flightCode: flight.flight_code,
          scheduleStart: moment(flight.schedule_start).format('YYYY-MM-DD HH:mm'),
          scheduleEnd: moment(flight.schedule_end).format('YYYY-MM-DD HH:mm'),
          airline: flight.Airline,
          flyingFrom: flight.FlyingFrom,
          goingTo: flight.GoingTo,
          type: flight.Type
        }));
        setFlights(flightDetails);
      } else {
        console.error("No flight data received");
      }
    } catch (error) {
      console.error("Error fetching flight details:", error);
    }
  };

  useEffect(() => {
    fetchFlightDetails(); // ดึงข้อมูลเมื่อ component ถูกสร้าง
  }, []);

  const columns: ColumnsType<FlightDetail> = [
    {
      title: "Flight Code",
      dataIndex: "flightCode",
      key: "flightCode",
    },
    {
      title: "Flying From",
      dataIndex: ["flyingFrom", "airport_name"], // ดึงชื่อสนามบินต้นทาง
      key: "flyingFrom",
    },
    {
      title: "Going To",
      dataIndex: ["goingTo", "airport_name"], // ดึงชื่อสนามบินปลายทาง
      key: "goingTo",
    },
    {
      title: "Schedule Start",
      dataIndex: "scheduleStart",
      key: "scheduleStart",
    },
    {
      title: "Schedule End",
      dataIndex: "scheduleEnd",
      key: "scheduleEnd",
    },
    {
      title: "Airline",
      dataIndex: ["airline", "airline_name"], // ดึงชื่อสายการบิน
      key: "airline",
    },
    {
      title: "Type of Flight",
      dataIndex: ["type", "type"], // ดึงประเภทของเที่ยวบิน
      key: "type",
    },
  ];

  // ฟังก์ชันสำหรับการค้นหา flight code
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // ฟังก์ชันสำหรับการค้นหาด้วยวันที่
  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date);
  };

  // ฟิลเตอร์ข้อมูลด้วย flight code และวันที่
  const filteredData = flights.filter((flight) => {
    const matchesFlightCode = flight.flightCode
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesDate =
      selectedDate === null ||
      moment(flight.scheduleStart).isSame(selectedDate, "day");
    return matchesFlightCode && matchesDate;
  });

  return (
    <div className="container-dateflight-fd">
      <div className="header-addf-fd">
        <img src={FFF} alt="Logo" className="addf-logo-fd" />
        <Button shape="round" onClick={() => navigate("/flight")}>Home</Button>
        <div className="profile-section-addf-fd">
          <img src={PPP} alt="Profile" className="profile-image-addf-fd" />
          <span className="user-name-addf-fd">John Doe</span>
          <Dropdown overlay={<Menu>
            <Menu.Item key="1" onClick={() => navigate("/")}>
              Logout
            </Menu.Item>
          </Menu>}>
            <Button><DownOutlined /></Button>
          </Dropdown>
        </div>
      </div>

      <div className="filter-section-addf-fd">
        <Row gutter={16}>
          <Col span={4}>
            <DatePicker
              placeholder="เลือกวันที่"
              onChange={handleDateChange}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="Search Flight Code"
              value={searchText}
              onChange={handleSearch}
              prefix={<SearchOutlined />}
            />
          </Col>
        </Row>
      </div>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  );
};

export default DateFlight;
