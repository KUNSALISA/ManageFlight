package controller

import (
	"net/http"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

func GetAirline(c *gin.Context) {
	var airlines []entity.Airline

	// ดึงข้อมูลพร้อมกับการเชื่อมโยงข้อมูลที่เกี่ยวข้อง
	results := entity.DB().
		Preload("FlightDetails").
		Find(&airlines)

	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": airlines})
}

func GetAirlineByID(c *gin.Context) {
	var airline entity.Airline
	id := c.Param("id")

	if err := entity.DB().
		Preload("FlightDetails").
		First(&airline, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Airline not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": airline})
}

// func CreateAirline(c *gin.Context) {
// 	var airlines entity.Airline

// 	if err := c.ShouldBindJSON(&airlines); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if err := entity.DB().Create(&airlines).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": airlines})
// }
