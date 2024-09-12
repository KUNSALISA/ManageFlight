package entity

import (
	"time"

	"gorm.io/gorm"
)

type FlightDetails struct {
	gorm.Model
	FlightCode    string    `json:"flight_code"`
	ScheduleStart time.Time `json:"schedule_start"`
	ScheduleEnd   time.Time `json:"schedule_end"`
	Hour          uint8     `json:"hour"`
	Cost          uint8     `json:"cost"`
	Point         uint8     `json:"point"`

	AirlineID *uint
	Airline   Airline `gorm:"foriegnKey:AirlineID"`

	FlyingFromID *uint
	FlyingFrom   Airport `gorm:"foriegnKey:FlyingFromID"`

	GoingToID *uint
	GoingTo   Airport `gorm:"foriegnKey:GoingToID"`

	TypeID *uint
	Type   TypeOfFlight `gorm:"foriegnKey:TypeID"`

	FlightDetail []FlightAndFlightDetails `gorm:"foreignKey:FlightDetailID"`
}
