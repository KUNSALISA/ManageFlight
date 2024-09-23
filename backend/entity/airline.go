package entity

import (
	"gorm.io/gorm"
)

type Airline struct {
	gorm.Model
	AirlineName string `json:"airline_name"`

	FlightDetails []FlightDetails `gorm:"foreignKey:AirlineID"`

}
