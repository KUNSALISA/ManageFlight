export interface AirlineInterface {
    ID?: number;  // หมายเลขประจำตัวของ Airline (อาจจะไม่ระบุได้)
    AirlineName: string;  // ชื่อของ Airline
}

export interface AirportInterface {
    ID?: number;  // หมายเลขประจำตัวของ Airport (อาจจะไม่ระบุได้)
    AirportName: string;  // ชื่อของ Airport
    AirportCode: string;  // รหัสของ Airport
}

export interface FlightInterface {
    ID?: number;  // หมายเลขประจำตัวของ Flight (อาจจะไม่ระบุได้)
    FlightDate: string;  // วันที่ของ Flight (ในรูปแบบ ISO 8601 เช่น "2024-09-13T00:00:00Z")
}

export interface FlightAndFlightDetailsInterface {
    ID?: number;  // หมายเลขประจำตัวของ FlightAndFlightDetails (อาจจะไม่ระบุได้)
    FlightID?: number;  // หมายเลขประจำตัวของ Flight (อาจจะไม่ระบุได้)
    FlightDetailID?: number;  // หมายเลขประจำตัวของ FlightDetails (อาจจะไม่ระบุได้)
    AdminID?: number;  // หมายเลขประจำตัวของ Admin (อาจจะไม่ระบุได้)
}

export interface FlightDetailsInterface {
    ID?: number;  // หมายเลขประจำตัวของ FlightDetails (อาจจะไม่ระบุได้)
    FlightCode: string;  // รหัสของ Flight
    ScheduleStart: string;  // วันที่เริ่มต้นของตารางเวลา (ในรูปแบบ ISO 8601 เช่น "2024-09-13T00:00:00Z")
    ScheduleEnd: string;    // วันที่สิ้นสุดของตารางเวลา (ในรูปแบบ ISO 8601 เช่น "2024-09-13T00:00:00Z")
    Hour: number;  // จำนวนชั่วโมง
    Cost: number;  // ค่าใช้จ่าย
    Point: number;  // คะแนน
    AirlineID?: number;  // หมายเลขประจำตัวของ Airline (อาจจะไม่ระบุได้)
    FlyingFromID?: number;  // หมายเลขประจำตัวของ Airport ที่ออกเดินทาง (อาจจะไม่ระบุได้)
    GoingToID?: number;  // หมายเลขประจำตัวของ Airport ที่ไปถึง (อาจจะไม่ระบุได้)
    TypeID?: number;  // หมายเลขประจำตัวของ TypeOfFlight (อาจจะไม่ระบุได้)
}

export interface TypeOfFlightInterface {
    ID?: number;  // หมายเลขประจำตัวของ TypeOfFlight (อาจจะไม่ระบุได้)
    TypeFlight: string;  // ประเภทของ Flight
}
