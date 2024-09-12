package entity

import (
	"gorm.io/gorm"
)

type TypeOfFlight struct {
	gorm.Model
	TypeFlight string `json:"type_flight"`

	Type []FlightDetails `gorm:"foreignKey:TypeID"`
}
