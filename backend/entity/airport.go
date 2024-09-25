package entity

import (
	"gorm.io/gorm"
)

type Airport struct {
	gorm.Model
	AirportName string 
	AirportCode string 

	FlyingFrom []FlightDetails `gorm:"foreignKey:FlyingFromID"`
	GoingTo    []FlightDetails `gorm:"foreignKey:GoingToID"`
}
