import { AdminInterface } from "../../interfaces/admin";
import { AirlineInterface, AirportInterface, FlightAndFlightDetailsInterface, FlightDetailsInterface, TypeOfFlightInterface } from "../../interfaces/fullmanageflight";
import { message } from "antd";

const apiUrl = "http://localhost:8080";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const createRequestOptions = (method: string, data: any = null) => {
  if (!Authorization || !Bearer) {
    message.error("User is not authenticated");
    throw new Error("No token or token type available");
  }

  const headers = {  //แค่อันนี้ก็ได้
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  };

  return {
    method: method,
    headers: headers,
    body: data ? JSON.stringify(data) : null,
  };
};

async function SignUp(data: AdminInterface) {
  let res = await fetch(`${apiUrl}/signup`, createRequestOptions("POST", data))  //ส่งคำร้องขอไป API await คือรอก่อนจนกว่าจะทำงานเสร็จ
    .then(res => (res.status == 201 ? res.json() : false));
  
  return res;
}

async function CreateFlightDetails(data: FlightDetailsInterface) {
  let res = await fetch(`${apiUrl}/flight-details`, createRequestOptions("POST", data))
    .then(res => (res.status == 201 ? res.json() : false));
  
  return res;
}

async function GetFlightDetails() {
  let res = await fetch(`${apiUrl}/flight-details`, createRequestOptions("GET"))
    .then(res => (res.status == 200 ? res.json() : false));
  
  return res;
}

async function GetFlightDetailsByID(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/flight-details/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function UpdateFlightDetails(data: FlightDetailsInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/flight-details`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}



async function DeleteFlightDetails(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/flight-details/${id}`,requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return true;
      } else {
        return false;
      }
    });
  return res;
}

async function GetAirline() {
  let res = await fetch(`${apiUrl}/airline`, createRequestOptions("GET"))
    .then(res => (res.status == 200 ? res.json() : false));
  
  return res;
}

async function GetAirlineByID(id: string) {
  let res = await fetch(`${apiUrl}/airline/${id}`, createRequestOptions("GET"))
    .then(res => (res.status == 200 ? res.json() : false));
  
  return res;
}


async function GetAirports() {
  let res = await fetch(`${apiUrl}/airport`, createRequestOptions("GET"))
    .then(res => (res.status == 200 ? res.json() : false));
  
  return res;
}


async function GetTypeOfFlight() {
  let res = await fetch(`${apiUrl}/TypeOfFlight`, createRequestOptions("GET"))
    .then(res => (res.status == 200 ? res.json() : false));
  
  return res;
}

async function GetFlightAndFlightDetails() {
  let res = await fetch(`${apiUrl}/flight-and-flight-details`, createRequestOptions("GET"))
    .then(res => (res.status == 200 ? res.json() : false));
  
  return res;
}

export {
  SignUp,
  CreateFlightDetails,
  GetFlightDetails,
  GetFlightDetailsByID,
  UpdateFlightDetails,
  DeleteFlightDetails,
  GetAirline,
  GetAirlineByID,
  GetTypeOfFlight,
  GetAirports,
  GetFlightAndFlightDetails
};
