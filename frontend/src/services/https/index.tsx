// import { AdminInterface } from "../../interfaces/Admin";  
import { AirlineInterface, AirportInterface, FlightInterface, FlightAndFlightDetailsInterface, FlightDetailsInterface, TypeOfFlightInterface } from "../../interfaces/fullmanageflight"; 

import axios from 'axios';
import { message } from "antd"; 

const apiUrl = "http://localhost:8080";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

// async function SignIn(data: LoginInterface) {
//   return await axios
//     .post(`${apiUrl}/signIn`, data, requestOptions)
//     .then((res) => res)
//     .catch((e) => e.response);
// }

async function CreateFlight(data: FlightInterface) {
    return await axios.post(`${apiUrl}/flights`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetFlights() {
    return await axios.get(`${apiUrl}/flights`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetFlightByID(id: string) {
    return await axios.get(`${apiUrl}/flights/${id}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function UpdateFlight(id: string, data: FlightInterface) {
    return await axios.put(`${apiUrl}/flights/${id}`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function DeleteFlight(id: string) {
    return await axios.delete(`${apiUrl}/flights/${id}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function CreateFlightDetails(data: FlightDetailsInterface) {
    return await axios.post(`${apiUrl}/flight-details`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetFlightDetails() {
    return await axios.get(`${apiUrl}/flight-details`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetFlightDetailsByID(id: string) {
    return await axios.get(`${apiUrl}/flight-details/${id}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
  async function UpdateFlightDetails(id: string, data: FlightDetailsInterface) {
    return await axios.put(`${apiUrl}/flight-details/${id}`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function DeleteFlightDetails(id: string) {
    return await axios.delete(`${apiUrl}/flight-details/${id}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
  async function GetAirline() {
    return await axios.get(`${apiUrl}/airline`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetAirlineByID(id: string) {
    return await axios.get(`${apiUrl}/airline/${id}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}
                  
export {
  //SignIn,
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