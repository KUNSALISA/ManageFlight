package entity

import (
	"time"

	"gorm.io/gorm"
)

type Flight struct {
	gorm.Model
	FlightDate time.Time `json:"flight_date"`

	Flight []FlightAndFlightDetails `gorm:"foreignKey:FlightID"`
}
