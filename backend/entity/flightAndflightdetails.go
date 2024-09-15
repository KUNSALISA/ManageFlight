package entity

import (
	"gorm.io/gorm"
)

type FlightAndFlightDetails struct {
	gorm.Model

	FlightID *uint
	Flight   Flight `gorm:"foriegnKey:FlightID"`

	FlightDetailID *uint
	FlightDetail   FlightDetails `gorm:"foriegnKey:FlightDetailID"`

	AdminID *uint
	Admin   Admin `gorm:"foriegnKey:admin_id"`
}
