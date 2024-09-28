package controller

import (
	"net/http"
	"time"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

func CreateFlightAndFlightDetails(c *gin.Context) {
	var request struct {
		Date      string `json:"date"`
		FlightIDs []uint `json:"flightIDs"`
		AdminID   uint   `json:"adminID"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	flightDate, err := time.Parse("2006-01-02", request.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
		return
	}

	var flightAndDetails []entity.FlightAndFlightDetails

	for _, flightID := range request.FlightIDs {
		flightDetail := entity.FlightAndFlightDetails{
			FlightDate:     flightDate,
			FlightDetailID: &flightID,
			AdminID:        &request.AdminID,
		}

		// บันทึกข้อมูลลงฐานข้อมูล
		if err := entity.DB().Create(&flightDetail).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add flight detail"})
			return
		}
		flightAndDetails = append(flightAndDetails, flightDetail)
	}

	// ส่ง JSON response หลังจากบันทึกทั้งหมด
	c.JSON(http.StatusOK, gin.H{"message": "Flights added successfully", "data": flightAndDetails})
}

func GetFlightAndFlightDetails(c *gin.Context) {
	var flightAndDetails []entity.FlightAndFlightDetails

	if err := entity.DB().
		Preload("FlightDetail").
		Preload("FlightDetail.Airline").
		Preload("FlightDetail.FlyingFrom").
		Preload("FlightDetail.GoingTo").
		Preload("Admin").
		Find(&flightAndDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get flight and details"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": flightAndDetails})
}

func GetFlightAndFlightDetailsByID(c *gin.Context) {
	var flightAndFlightDetails entity.FlightAndFlightDetails
	id := c.Param("id")

	if err := entity.DB().Preload("FlightDetail").Preload("Admin").First(&flightAndFlightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightAndFlightDetails not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": flightAndFlightDetails})
}

// // UpdateFlightAndFlightDetails
// func UpdateFlightAndFlightDetails(c *gin.Context) {
// 	var flightAndFlightDetails entity.FlightAndFlightDetails
// 	id := c.Param("id")

// 	if err := entity.DB().First(&flightAndFlightDetails, id).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "FlightAndFlightDetails not found"})
// 		return
// 	}

// 	if err := c.ShouldBindJSON(&flightAndFlightDetails); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if flightAndFlightDetails.FlightDetailID == nil || flightAndFlightDetails.AdminID == nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "FlightID, FlightDetailID, and AdminID are required"})
// 		return
// 	}

// 	flightAndFlightDetails.UpdatedAt = time.Now()

// 	if err := entity.DB().Save(&flightAndFlightDetails).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": flightAndFlightDetails})
// }

// // DeleteFlightAndFlightDetails
// func DeleteFlightAndFlightDetails(c *gin.Context) {
// 	var flightAndFlightDetails entity.FlightAndFlightDetails
// 	id := c.Param("id")

// 	if err := entity.DB().First(&flightAndFlightDetails, id).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "FlightAndFlightDetails not found"})
// 		return
// 	}

// 	if err := entity.DB().Delete(&flightAndFlightDetails).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "FlightAndFlightDetails deleted successfully"})
// }
