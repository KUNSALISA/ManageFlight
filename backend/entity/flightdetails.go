package entity

import (
	"time"

	"gorm.io/gorm"
)

type FlightDetails struct {
	gorm.Model
	FlightCode    string    
	ScheduleStart time.Time
	ScheduleEnd   time.Time 
	Hour          uint16    
	Cost          uint16    
	Point         uint16    

	AirlineID *uint
	Airline   Airline `gorm:"foreignKey:AirlineID"`

	FlyingFromID *uint
	FlyingFrom   Airport `gorm:"foreignKey:FlyingFromID"`

	GoingToID *uint
	GoingTo   Airport `gorm:"foreignKey:GoingToID"`

	TypeID *uint
	Type   TypeOfFlight `gorm:"foreignKey:TypeID"`

	FlightDetail []FlightAndFlightDetails `gorm:"foreignKey:FlightDetailID"`
}
