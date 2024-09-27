package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func UintPtr(i uint) *uint {
	return &i
}

func SetupDatabase() {
	// เปิดการเชื่อมต่อฐานข้อมูล SQLite
	database, err := gorm.Open(sqlite.Open("G11_PROJECT.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// ทำการ AutoMigrate เพื่อสร้างตารางตามโครงสร้างของ Entity ที่กำหนด
	database.AutoMigrate(
		&Admin{},
		&Airline{},
		&Airport{},
		&FlightAndFlightDetails{},
		&FlightDetails{},
		&TypeOfFlight{},
	)
	db = database

	// สร้างข้อมูลผู้ใช้ (Admin)
	hashedPasswordAdmin, _ := HashPassword("admin")
	hashedPasswordUser, _ := HashPassword("user")
	birthday, _ := time.Parse("2006-01-02", "2003-08-15")
	admins := []Admin{
		{
			Email:     "Admin@gmail.com",
			Password:  hashedPasswordAdmin,
			FirstName: "Salisa",
			LastName:  "Manage",
			Birthday:  birthday,
			Role:      "admin",
		},
		{
			Email:     "Member@gmail.com",
			Password:  hashedPasswordUser,
			FirstName: "Member",
			LastName:  "Buy",
			Birthday:  birthday,
			Role:      "user",
		},
	}
	for _, admin := range admins {
		db.FirstOrCreate(&admin, Admin{Email: admin.Email})
	}

	// สร้างข้อมูลประเภทเที่ยวบิน (TypeOfFlight)
	flightTypes := []TypeOfFlight{
		{TypeFlight: "Departures"},
		{TypeFlight: "Domestic flight"},
	}
	for _, flightType := range flightTypes {
		db.FirstOrCreate(&flightType, TypeOfFlight{TypeFlight: flightType.TypeFlight})
	}

	// สร้างข้อมูลสายการบิน (Airline)
	airlines := []Airline{
		{AirlineName: "AirAsia"},
		{AirlineName: "Thai Airways"},
		{AirlineName: "Bangkok Airways"},
		{AirlineName: "Thai Lion Air"},
		{AirlineName: "Qantas"},
		{AirlineName: "NokAir"},
		{AirlineName: "Vietjet"},
		{AirlineName: "Lufthansa"},
		{AirlineName: "China Southern Airlines"},
		{AirlineName: "China Eastern Airline"},
		{AirlineName: "Turkish"},
		{AirlineName: "Hainan"},
	}
	for _, airline := range airlines {
		db.FirstOrCreate(&airline, Airline{AirlineName: airline.AirlineName})
	}

	// สร้างข้อมูลสนามบิน (Airport)
	airports := []Airport{
		{AirportName: "Suvarnabhumi Airport", AirportCode: "BKK"},
		{AirportName: "Don Mueang International Airport", AirportCode: "DMK"},
		{AirportName: "Chiang Mai International Airport", AirportCode: "CNX"},
		{AirportName: "Phuket International Airport", AirportCode: "HKT"},
		{AirportName: "Samui Airport", AirportCode: "USM"},
	}
	for _, airport := range airports {
		db.FirstOrCreate(&airport, Airport{AirportName: airport.AirportName})
	}

	// ดึงข้อมูลที่เกี่ยวข้องเพื่อนำมาใช้ในข้อมูล FlightDetails
	var airline Airline
	var flyingFrom, goingTo Airport
	var flightType TypeOfFlight

	db.First(&airline, "airline_name = ?", "AirAsia")
	db.First(&flyingFrom, "airport_name = ?", "Suvarnabhumi Airport")
	db.First(&goingTo, "airport_name = ?", "Don Mueang International Airport")
	db.First(&flightType, "type_flight = ?", "Departures")

	// ตรวจสอบการดึงข้อมูล
	if airline.ID == 0 || flyingFrom.ID == 0 || goingTo.ID == 0 || flightType.ID == 0 {
		panic("related data not found")
	}

	// สร้างข้อมูลรายละเอียดเที่ยวบิน (FlightDetails)
	flightDetails := []FlightDetails{
		{
			FlightCode:    "FD4113",
			ScheduleStart: time.Date(2023, 9, 10, 8, 30, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 9, 10, 12, 30, 0, 0, time.UTC),
			Hour:          4,
			Cost:          100,
			Point:         10,
			AirlineID:     UintPtr(airline.ID),
			FlyingFromID:  UintPtr(flyingFrom.ID),
			GoingToID:     UintPtr(goingTo.ID),
			TypeID:        UintPtr(flightType.ID),
		},
		{
			FlightCode:    "AA102",
			ScheduleStart: time.Date(2023, 10, 5, 9, 45, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 10, 5, 13, 45, 0, 0, time.UTC),
			Hour:          4,
			Cost:          150,
			Point:         20,
			AirlineID:     UintPtr(3), // ID ของสายการบินที่กำหนด
			FlyingFromID:  UintPtr(1), // ID ของสนามบินต้นทาง
			GoingToID:     UintPtr(4), // ID ของสนามบินปลายทาง
			TypeID:        UintPtr(2), // ID ของประเภทเที่ยวบิน
		},
		{
			FlightCode:    "TG202",
			ScheduleStart: time.Date(2023, 12, 15, 11, 15, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 12, 15, 15, 15, 0, 0, time.UTC),
			Hour:          4,
			Cost:          200,
			Point:         30,
			AirlineID:     UintPtr(6),
			FlyingFromID:  UintPtr(5),
			GoingToID:     UintPtr(3),
			TypeID:        UintPtr(1),
		},
	}

	// แทรกหรืออัปเดตข้อมูล FlightDetails
	for _, flightDetail := range flightDetails {
		db.Where(FlightDetails{FlightCode: flightDetail.FlightCode}).
			Assign(flightDetail).FirstOrCreate(&flightDetail)
	}
}
