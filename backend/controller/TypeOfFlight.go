package controller

import (
	"net/http"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

// func GetTypeOfFlight(c *gin.Context) {
// 	var types []entity.TypeOfFlight
// 	db := entity.DB()

// 	results := db.Select("*").Find(&types)
// 	if results.Error != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, types)
// }

func GetTypeOfFlight(c *gin.Context) {
	var types []entity.TypeOfFlight
	if err := entity.DB().Find(&types).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": types})
}

// // GetAirlineByID - ฟังก์ชันสำหรับดึงข้อมูลสายการบิน ID
// func GetTypeOfFlightByID(c *gin.Context) {
// 	var types entity.TypeOfFlight
// 	id := c.Param("id")

// 	// ดึงข้อมูลจากฐานข้อมูลตาม ID
// 	if err := entity.DB().First(&types, id).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "TypeOfFlight not found"})
// 		return
// 	}

// 	// ส่งข้อมูลกลับไปในรูป JSON
// 	c.JSON(http.StatusOK, gin.H{"data": types})
// }

func GetTypeOfFlightByID(c *gin.Context) {
	var types entity.TypeOfFlight
	id := c.Param("id")

	if err := entity.DB().First(&types, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "TypeOfFlight not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": types})
}
