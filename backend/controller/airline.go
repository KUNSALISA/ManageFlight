package controller

import (
	"net/http"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)


func GetAirline(c *gin.Context) {
	var airlines []entity.Airline
	if err := entity.DB().Raw("SELECT * FROM airline").Find(&airlines).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": airlines})
}


// GetAirlineByID - ฟังก์ชันสำหรับดึงข้อมูลสายการบิน ID
func GetAirlineByID(c *gin.Context) {
	var airlines entity.Airline
	id := c.Param("id")

	// ดึงข้อมูลจากฐานข้อมูลตาม ID
	if err := entity.DB().First(&airlines, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Airline not found"})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": airlines})
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
