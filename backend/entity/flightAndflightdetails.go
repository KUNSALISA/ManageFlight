package entity

import (
	"time"

	"gorm.io/gorm"
)

type FlightAndFlightDetails struct {
	gorm.Model

	FlightDate time.Time `json:"flight_date"`

	FlightDetailID *uint
	FlightDetail   FlightDetails `gorm:"foreignKey:FlightDetailID"`

	AdminID *uint
	Admin   Admin `gorm:"foreignKey:admin_id"`
}
