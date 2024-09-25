package entity

import (
	"gorm.io/gorm"
)

type TypeOfFlight struct {
	gorm.Model
	TypeFlight string

	Type []FlightDetails `gorm:"foreignKey:TypeID"`
}
