import { AdminInterface } from "../../interfaces/admin";
import { AirlineInterface, AirportInterface, FlightInterface, FlightAndFlightDetailsInterface, FlightDetailsInterface, TypeOfFlightInterface } from "../../interfaces/fullmanageflight";
import axios from 'axios';
import { message } from "antd";

const apiUrl = "http://localhost:8080";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const createRequestOptions = () => {
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
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${apiUrl}/refresh-token`, { refresh_token: refreshToken });

    if (response.data && response.data.access_token && response.data.token_type) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("token_type", response.data.token_type);
      
      if (response.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }

      message.success("Token refreshed successfully.");
    } else {
      throw new Error("Invalid token response");
    }
  } catch (error) {
    message.error("Failed to refresh token. Please log in again.");
    localStorage.removeItem("token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  }
};

async function SignUp(data: AdminInterface) {
  return await axios
    .post(`${apiUrl}/signup`, data, createRequestOptions())
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateFlight(data: FlightInterface) {
  return await axios.post(`${apiUrl}/flights`, data, createRequestOptions())
    .then((res) => res)
    .catch(async (e) => {
      if (e.response && e.response.status === 401) {
        await refreshToken();
        return await axios.post(`${apiUrl}/flights`, data, createRequestOptions());
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
