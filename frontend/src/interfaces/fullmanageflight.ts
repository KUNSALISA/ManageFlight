
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

// FlightAndFlightDetails Interface
export interface FlightAndFlightDetailsInterface {
    ID?: number;
    FlightDate: string;
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
