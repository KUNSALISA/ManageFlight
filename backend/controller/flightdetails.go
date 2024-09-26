package controller

import (
	"net/http"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateFlightDetails(c *gin.Context) {
	var flightDetails entity.FlightDetails

	// Bind incoming JSON to flightDetails struct
	if err := c.ShouldBindJSON(&flightDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := entity.DB() // Assuming you've initialized the DB in your project

	var airline entity.Airline
	db.First(&airline, flightDetails.AirlineID)
	if airline.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "airline not found"})
		return
	}

	var flyingFrom entity.Airport
	db.First(&flyingFrom, flightDetails.FlyingFromID)
	if flyingFrom.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "flyingFrom not found"})
		return
	}

	var goingTo entity.Airport
	db.First(&goingTo, flightDetails.GoingToID)
	if goingTo.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "goingTo not found"})
		return
	}

	var flightType entity.TypeOfFlight
	db.First(&flightType, flightDetails.TypeID)
	if flightType.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "flightType not found"})
		return
	}

	flight := entity.FlightDetails{
		FlightCode:    flightDetails.FlightCode,
		ScheduleStart: flightDetails.ScheduleStart,
		ScheduleEnd:   flightDetails.ScheduleStart,
		Hour:          flightDetails.Hour,
		Cost:          flightDetails.Cost,
		Point:         flightDetails.Point,
		AirlineID:     flightDetails.AirlineID,
		Airline:       airline,
		FlyingFromID:  flightDetails.FlyingFromID,
		FlyingFrom:    flyingFrom,
		GoingToID:     flightDetails.GoingToID,
		GoingTo:       goingTo,
		TypeID:        flightDetails.TypeID,
		Type:          flightType,
	}

	if err := db.Create(&flight).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "FlightDetails created successfully", "data": flightDetails})
}

// GetFlightDetails - ฟังก์ชันสำหรับดึงข้อมูล FlightDetails ทั้งหมด
func GetFlightDetails(c *gin.Context) {
	var flightDetails []entity.FlightDetails

	if err := entity.DB().
		Preload("Airline").
		Preload("FlyingFrom", func(db *gorm.DB) *gorm.DB {
			return db.Select("id, airport_code") //เอา id ออก
		}).
		Preload("GoingTo", func(db *gorm.DB) *gorm.DB {
			return db.Select("id, airport_code")
		}).
		Preload("Type").
		Find(&flightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
}

// GetFlightDetailsByID - ฟังก์ชันสำหรับดึงข้อมูล FlightDetails ตาม ID
func GetFlightDetailsByID(c *gin.Context) {
	ID := c.Param("id")
	var flightDetails entity.FlightDetails

	db := entity.DB()
	results := db.Preload("Airline").
		Preload("FlyingFrom", func(db *gorm.DB) *gorm.DB {
			return db.Select("id, airport_code")
		}).
		Preload("GoingTo", func(db *gorm.DB) *gorm.DB {
			return db.Select("id, airport_code")
		}).
		Preload("Type").First(&flightDetails, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if flightDetails.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, flightDetails)
}

func UpdateFlightDetails(c *gin.Context) {
	var flightDetails entity.FlightDetails
	Flight_ID := c.Param("id")

	db := entity.DB()
	result := db.First(&flightDetails, Flight_ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&flightDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&flightDetails)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func DeleteFlightDetails(c *gin.Context) {

	id := c.Param("id")

	db := entity.DB()
	if tx := db.Exec("DELETE FROM flight_details WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}
