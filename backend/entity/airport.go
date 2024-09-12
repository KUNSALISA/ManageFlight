package entity

import (
	"gorm.io/gorm"
)

type Airport struct {
	gorm.Model
	AirportName string `json:"airport_name"`
	AirportCode string `json:"airport_code"`

	FlyingFrom []FlightDetails `gorm:"foreignKey:FlyingFromID"`
	GoingTo    []FlightDetails `gorm:"foreignKey:GoingToID"`
}
