package entity

import (
	"gorm.io/driver/sqlite"

	"time"

	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("G11_PROJECT.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema

	database.AutoMigrate(
		&Admin{},
		&Airline{},
		&Airport{},
		&Flight{},
		&FlightAndFlightDetails{},
		&FlightDetails{},
		&TypeOfFlight{},
	)
	db = database

	hashedPassword, _ := HashPassword("admin")
	birthday, _ := time.Parse("2006-01-02", "2003-08-15")
	User := []Admin{
		{Email: "Admin@gmail.com",
			Password:  hashedPassword,
			FirstName: "Salisa",
			LastName:  "Manage",
			Birthday:  birthday},
	}
	for _, pkg := range User {
		db.FirstOrCreate(&pkg, Admin{Email: pkg.Email})
	}

	flightTypes := []TypeOfFlight{
		{TypeFlight: "Departures"},
		{TypeFlight: "Domestic flight"},
	}
	for _, flightT := range flightTypes {
		db.FirstOrCreate(&flightT, TypeOfFlight{TypeFlight: flightT.TypeFlight})
	}

	air_flight := []Airline{
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
	for _, airline_flight := range air_flight {
		db.FirstOrCreate(&airline_flight, Airline{AirlineName: airline_flight.AirlineName})
	}

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

	flights := []Flight{
		{FlightDate: time.Date(2023, 9, 10, 0, 0, 0, 0, time.UTC)},
		{FlightDate: time.Date(2023, 10, 5, 0, 0, 0, 0, time.UTC)},
		{FlightDate: time.Date(2023, 11, 20, 0, 0, 0, 0, time.UTC)},
	}
	for _, flight := range flights {
		db.FirstOrCreate(&flight, Flight{FlightDate: flight.FlightDate})
	}

	//add data to flightdetails
	// ดึงข้อมูล Airline, Airport, และ TypeOfFlight ที่มีอยู่ในฐานข้อมูล
	var airline Airline
	var flyingFrom, goingTo Airport
	var flightType TypeOfFlight

	// ใช้คำสั่ง db.First() เพื่อดึงข้อมูล
	// ค้นหาสายการบินที่ต้องการ
	db.First(&airline, "airline_name = ?", "AirAsia")
	// ค้นหาสนามบินต้นทางและปลายทาง
	db.First(&flyingFrom, "airport_name = ?", "Suvarnabhumi Airport")
	db.First(&goingTo, "airport_name = ?", "Don Mueang International Airport")
	// ค้นหาประเภทเที่ยวบิน
	db.First(&flightType, "type_name = ?", "Departures")

	Details := []FlightDetails{
		{
			FlightCode:    "FD4113",
			ScheduleStart: time.Date(2023, 9, 10, 8, 30, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 9, 10, 12, 30, 0, 0, time.UTC),
			Hour:          4,
			Cost:          100,
			Point:         10,
			AirlineID:     &airline.ID,
			FlyingFromID:  &flyingFrom.ID,
			GoingToID:     &goingTo.ID,
			TypeID:        &flightType.ID,
		},
		{
			FlightCode:    "AA102",
			ScheduleStart: time.Date(2023, 10, 5, 9, 45, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 10, 5, 13, 45, 0, 0, time.UTC),
			Hour:          4,
			Cost:          150,
			Point:         20,
			AirlineID:     &airline.ID,
			FlyingFromID:  &flyingFrom.ID,
			GoingToID:     &goingTo.ID,
			TypeID:        &flightType.ID,
		},
	}
	for _, flightDetail := range Details {
		db.FirstOrCreate(&flightDetail, FlightDetails{FlightCode: flightDetail.FlightCode})
	}
}


