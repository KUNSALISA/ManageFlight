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
	Hour          uint16    `json:"hour"`
	Cost          uint16    `json:"cost"`
	Point         uint16    `json:"point"`

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
