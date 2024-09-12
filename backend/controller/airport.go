// package controller

// import (
// 	"net/http"

// 	"github.com/KUNSALISA/ManageFlight/entity"
// 	"github.com/gin-gonic/gin"
// )

// func CreateAirport(c *gin.Context) {
// 	var airports entity.Airport

// 	if err := c.ShouldBindJSON(&airports); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	if err := entity.DB().Create(&airports).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": airports})
// }

// func GetAirport(c *gin.Context) {
// 	var airports []entity.Airport
// 	if err := entity.DB().Raw("SELECT * FROM airport").Find(&airports).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": airports})
// }


// // CreateAirport - ฟังก์ชันสำหรับสร้างข้อมูลสนามบินใหม่
// func CreateAirport(c *gin.Context) {
// 	var airport entity.Airport

// 	// ผูกข้อมูลจาก JSON ไปยัง struct airport
// 	if err := c.ShouldBindJSON(&airport); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// บันทึกข้อมูลลงฐานข้อมูล
// 	if err := entity.DB().Create(&airport).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// ส่งข้อมูลกลับไปในรูป JSON พร้อมสถานะ OK
// 	c.JSON(http.StatusOK, gin.H{"data": airport})
// }


package controller

import (
	"net/http"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

// GetAirports - ฟังก์ชันสำหรับดึงข้อมูลสนามบินทั้งหมด
func GetAirports(c *gin.Context) {
	var airports []entity.Airport

	// ดึงข้อมูลจากฐานข้อมูล
	if err := entity.DB().Find(&airports).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": airports})
}

// GetAirportByID - ฟังก์ชันสำหรับดึงข้อมูลสนามบินตาม ID
func GetAirportByID(c *gin.Context) {
	var airport entity.Airport
	id := c.Param("id")

	// ดึงข้อมูลจากฐานข้อมูลตาม ID
	if err := entity.DB().First(&airport, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Airport not found"})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": airport})
}




