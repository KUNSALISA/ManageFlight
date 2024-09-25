package controller

import (
	"net/http"
	"time"

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

	// Preload related entities
	var airline entity.Airline
	var flyingFrom entity.Airport
	var goingTo entity.Airport
	var flightType entity.TypeOfFlight

	if airline.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "airline not found"})
		return
	}
	if flyingFrom.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "flyingFrom not found"})
		return
	}
	if goingTo.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "goingTo not found"})
		return
	}
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

	// ดึงข้อมูลจากฐานข้อมูลพร้อมข้อมูลที่สัมพันธ์กัน
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

	// ส่งข้อมูลกลับไปในรูปแบบ JSON
	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
}

// GetFlightDetailsByID - ฟังก์ชันสำหรับดึงข้อมูล FlightDetails ตาม ID
func GetFlightDetailsByID(c *gin.Context) {
	var flightDetails entity.FlightDetails
	id := c.Param("id")

	// ดึงข้อมูลจากฐานข้อมูลตาม ID
	if err := entity.DB().First(&flightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightDetails not found"})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
}

func UpdateFlightDetails(c *gin.Context) {
	var flightDetails entity.FlightDetails
	id := c.Param("id")

	if err := entity.DB().First(&flightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightDetails not found"})
		return
	}

	var input entity.FlightDetails
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.FlyingFromID == nil || input.GoingToID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlyingFromID and GoingToID are required"})
		return
	}

	// Update fields
	flightDetails.FlightCode = input.FlightCode
	flightDetails.ScheduleStart = input.ScheduleStart
	flightDetails.ScheduleEnd = input.ScheduleEnd
	flightDetails.Hour = input.Hour
	flightDetails.Cost = input.Cost
	flightDetails.Point = input.Point
	flightDetails.AirlineID = input.AirlineID
	flightDetails.FlyingFromID = input.FlyingFromID
	flightDetails.GoingToID = input.GoingToID
	flightDetails.TypeID = input.TypeID
	flightDetails.UpdatedAt = time.Now()

	if err := entity.DB().Save(&flightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
}

func DeleteFlightDetails(c *gin.Context) {
	var flightDetails entity.FlightDetails
	id := c.Param("id")

	if err := entity.DB().First(&flightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightDetails not found"})
		return
	}

	result := entity.DB().Delete(&flightDetails)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete FlightDetails"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "FlightDetails deleted successfully"})
}
