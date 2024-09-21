// export interface AirlineInterface {
//     ID?: number;  
//     AirlineName: string; 
// }

// export interface AirportInterface {
//     ID?: number;  
//     AirportName: string;  
//     AirportCode: string;  
// }

// export interface FlightInterface {
//     ID?: number; 
//     FlightDate: string;  // วันที่ของ Flight (ในรูปแบบ ISO 8601 เช่น "2024-09-13T00:00:00Z")
// }

// export interface FlightAndFlightDetailsInterface {
//     ID?: number; 
//     FlightID?: number; 
//     FlightDetailID?: number;  
//     AdminID?: number;  
// }

// export interface FlightDetailsInterface {
//     ID?: number;  
//     FlightCode: string;  
//     ScheduleStart: string;  // วันที่เริ่มต้นของตารางเวลา (ในรูปแบบ ISO 8601 เช่น "2024-09-13T00:00:00Z")
//     ScheduleEnd: string;    // วันที่สิ้นสุดของตารางเวลา (ในรูปแบบ ISO 8601 เช่น "2024-09-13T00:00:00Z")
//     Hour: number;  
//     Cost: number;  
//     Point: number; 
//     AirlineID?: number;  
//     FlyingFromID?: number;  
//     GoingToID?: number; 
//     TypeID?: number;  
// }

// export interface TypeOfFlightInterface {
//     ID?: number; 
//     TypeFlight: string;  
// }


// Admin Interface
export interface AdminInterface {
    ID?: number;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Birthday: string;
}

// Airline Interface
export interface AirlineInterface {
    ID?: number;
    AirlineName: string;
}

// Airport Interface
export interface AirportInterface {
    ID?: number;
    AirportName: string;
    AirportCode: string;
}

// Flight Interface
export interface FlightInterface {
    ID?: number;
    FlightDate: string;
}

// FlightAndFlightDetails Interface
export interface FlightAndFlightDetailsInterface {
    ID?: number;
    FlightID?: number;
    Flight?: FlightInterface;
    FlightDetailID?: number;
    FlightDetail?: FlightDetailsInterface;
    AdminID?: number;
    Admin?: AdminInterface;
}

// FlightDetails Interface
export interface FlightDetailsInterface {
    ID?: number;
    FlightCode: string;
    ScheduleStart: string;
    ScheduleEnd: string;
    Hour: number;
    Cost: number;
    Point: number;
    AirlineID?: number;
    Airline?: AirlineInterface;
    FlyingFromID?: number;
    FlyingFrom?: AirportInterface;
    GoingToID?: number;
    GoingTo?: AirportInterface;
    TypeID?: number;
    Type?: TypeOfFlightInterface;
}

// TypeOfFlight Interface
export interface TypeOfFlightInterface {
    ID?: number;
    TypeFlight: string;
}
