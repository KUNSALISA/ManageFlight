package entity

import (
	"gorm.io/driver/sqlite"

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

	// TypeOfFlight := []entity.TypeOfFlight{
	// 	{TypeFlight: "Departures "},
	// 	{TypeFlight: "Domestic flight"},
	// }
	// for _, pkg := range TypeOfFlight {
	// 	db.FirstOrCreate(&pkg, entity.TypeOfFlight{TypeFlight: pkg.TypeFlight})
	// }
}
