package entity

import (
	"gorm.io/gorm"
)

type FlightAndFlightDetails struct {
	gorm.Model

	FlightID *uint
	Flight   Flight `gorm:"foreignKey:FlightID"`

	FlightDetailID *uint
	FlightDetail   FlightDetails `gorm:"foreignKey:FlightDetailID"`

	AdminID *uint
	Admin   Admin `gorm:"foreignKey:admin_id"`
}
