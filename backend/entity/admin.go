package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Email     string    `gorm:"unique;not null" json:"email"` // อีเมลต้องไม่ซ้ำและไม่เป็นค่าว่าง
	Password  string    `gorm:"not null" json:"password"`
	FirstName string    `gorm:"not null" json:"first_name"`
	LastName  string    `gorm:"not null" json:"last_name"`
	Birthday  time.Time `gorm:"not null" json:"birthday"`
	Role      string    `gorm:"not null" json:"role"`  //////////

	Admin []FlightAndFlightDetails `gorm:"foreignKey:AdminID"`
}
