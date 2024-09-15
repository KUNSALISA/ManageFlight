// import { AdminInterface } from "../../interfaces/Admin";  
import { AirlineInterface, AirportInterface, FlightInterface, FlightAndFlightDetailsInterface, FlightDetailsInterface, TypeOfFlightInterface } from "../../interfaces/fullmanageflight"; 
import {AdminInterface} from "../../interfaces/admin"
import axios from 'axios';
import { message } from "antd"; 

const apiUrl = "http://localhost:8080";

const createRequestOptions = () => {
  const Authorization = localStorage.getItem("token");
  const Bearer = localStorage.getItem("token_type");

  if (!Authorization || !Bearer) {
    message.error("User is not authenticated");
    throw new Error("No token or token type available");
  }

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Bearer} ${Authorization}`,
    },
  };
};

const refreshToken = async () => {
  try {
    // ดึง refresh token จาก localStorage
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // ส่งคำขอไปยัง API เพื่อทำการ refresh token
    const response = await axios.post(`${apiUrl}/refresh-token`, {
      refresh_token: refreshToken,
    });

    // ตรวจสอบว่าได้ token ใหม่หรือไม่
    if (response.data && response.data.access_token && response.data.token_type) {
      // บันทึก token ใหม่ลง localStorage
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("token_type", response.data.token_type);
      
      // หาก API ส่ง refresh token ใหม่กลับมาด้วย ให้บันทึกลง localStorage เช่นกัน
      if (response.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }

      message.success("Token refreshed successfully.");
    } else {
      throw new Error("Invalid token response");
    }
  } catch (error) {
    message.error("Failed to refresh token. Please log in again.");
    // ถ้า refresh token ไม่สำเร็จ ให้ลบ token ออกจาก localStorage และเปลี่ยนเส้นทางไปที่หน้า login
    localStorage.removeItem("token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";  // เปลี่ยนเส้นทางไปหน้า login
  }
};

// async function SignUp(data: AdminInterface) {
//   try {
//     // ส่งคำขอ POST ไปยังเซิร์ฟเวอร์เพื่อสร้างผู้ใช้ใหม่
//     const response = await axios.post(`${apiUrl}/register`, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // ถ้าการตอบสนองจากเซิร์ฟเวอร์มีสถานะ 200 หรือ 201 (สำเร็จ)
//     if (response.status === 200 || response.status === 201) {
//       message.success("Registration successful!");
//       return response.data; // ส่งคืนข้อมูลที่ได้จากเซิร์ฟเวอร์ (เช่น ข้อมูลผู้ใช้ที่สร้าง)
//     } else {
//       // ถ้าไม่ใช่ 200 หรือ 201 ให้แสดงข้อความข้อผิดพลาด
//       message.error("Registration failed. Please try again.");
//       return response;
//     }
//   } catch (error) {
//     // จัดการข้อผิดพลาดที่เกิดขึ้น
//     if (error.response) {
//       // ถ้ามีข้อมูลข้อผิดพลาดจากเซิร์ฟเวอร์
//       message.error(`Registration failed: ${error.response.data.message || 'Please try again later.'}`);
//       return error.response;
//     } else {
//       // ถ้าไม่มีข้อมูลข้อผิดพลาดจากเซิร์ฟเวอร์
//       message.error("Registration failed. Please try again later.");
//       return null;
//     }
//   }
// }

async function SignUp(data: AdminInterface) {
  return await axios
    .post(`${apiUrl}/register`, data, createRequestOptions())
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateFlight(data: FlightInterface) {
  return await axios.post(`${apiUrl}/flights`, data, createRequestOptions())
    .then((res) => res)
    .catch(async (e) => {
      if (e.response && e.response.status === 401) {
        await refreshToken();  // Refresh token ถ้าได้รับ 401
        return await axios.post(`${apiUrl}/flights`, data, createRequestOptions());  // ลองส่ง request อีกครั้ง
      }
      message.error("An error occurred while creating the flight.");
      return e.response;
    });
}

async function GetFlights() {
    return await axios.get(`${apiUrl}/flights`, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetFlightByID(id: string) {
    return await axios.get(`${apiUrl}/flights/${id}`, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}

async function UpdateFlight(id: string, data: FlightInterface) {
    return await axios.put(`${apiUrl}/flights/${id}`, data, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}

async function DeleteFlight(id: string) {
    return await axios.delete(`${apiUrl}/flights/${id}`, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}

async function CreateFlightDetails(data: FlightDetailsInterface) {
    return await axios.post(`${apiUrl}/flight-details`, data, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetFlightDetails() {
    return await axios.get(`${apiUrl}/flight-details`, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetFlightDetailsByID(id: string) {
    return await axios.get(`${apiUrl}/flight-details/${id}`, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
  }
  async function UpdateFlightDetails(id: string, data: FlightDetailsInterface) {
    return await axios.put(`${apiUrl}/flight-details/${id}`, data, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}

async function DeleteFlightDetails(id: string) {
    return await axios.delete(`${apiUrl}/flight-details/${id}`, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
  }
  async function GetAirline() {
    return await axios.get(`${apiUrl}/airline`, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetAirlineByID(id: string) {
    return await axios.get(`${apiUrl}/airline/${id}`, createRequestOptions())
      .then((res) => res)
      .catch((e) => e.response);
}
                  
export {
  SignUp,
  CreateFlight,
  GetFlights,
  GetFlightByID,
  UpdateFlight,
  DeleteFlight,
  CreateFlightDetails,
  GetFlightDetails,
  GetFlightDetailsByID,
  UpdateFlightDetails,
  DeleteFlightDetails,
  GetAirline,
  GetAirlineByID
};