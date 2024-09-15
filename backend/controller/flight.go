package controller

import (
	"net/http"
	_"time"

	"github.com/gin-gonic/gin"
	"github.com/KUNSALISA/ManageFlight/entity"
)


func CreateFlight(c *gin.Context) {
	var flight entity.Flight

	// ผูกข้อมูลจาก JSON ไปยัง struct flight
	if err := c.ShouldBindJSON(&flight); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า FlightDate ถูกตั้งค่ามาจาก frontend หรือไม่
	if flight.FlightDate.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlightDate is required"})
		return
	}

	// บันทึกข้อมูลลงฐานข้อมูล
	if err := entity.DB().Create(&flight).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON พร้อมสถานะ OK
	c.JSON(http.StatusOK, gin.H{"data": flight})
}

// GetFlights - ฟังก์ชันสำหรับดึงข้อมูลเที่ยวบินทั้งหมด
func GetFlights(c *gin.Context) {
	var flights []entity.Flight

	// ดึงข้อมูลจากฐานข้อมูล
	if err := entity.DB().Find(&flights).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flights})
}

func GetFlightByID(c *gin.Context) {
	var flight entity.Flight
	id := c.Param("id")

	// ดึงข้อมูลจากฐานข้อมูลตาม ID
	if err := entity.DB().First(&flight, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flight})
}

// UpdateFlight - ฟังก์ชันสำหรับอัปเดตข้อมูลเที่ยวบิน
func UpdateFlight(c *gin.Context) {
	var flight entity.Flight
	id := c.Param("id")

	// ค้นหาข้อมูลเที่ยวบินตาม ID
	if err := entity.DB().First(&flight, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
		return
	}

	// ผูกข้อมูลใหม่จาก JSON ไปยัง struct flight
	if err := c.ShouldBindJSON(&flight); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า FlightDate ถูกตั้งค่ามาจาก frontend หรือไม่
	if flight.FlightDate.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlightDate is required"})
		return
	}

	// บันทึกข้อมูลที่อัปเดตลงฐานข้อมูล
	if err := entity.DB().Save(&flight).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลที่อัปเดตกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flight})
}

// DeleteFlight - ฟังก์ชันสำหรับลบข้อมูลเที่ยวบิน
func DeleteFlight(c *gin.Context) {
	var flight entity.Flight
	id := c.Param("id")

	// ค้นหาข้อมูลเที่ยวบินตาม ID
	if err := entity.DB().First(&flight, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
		return
	}

	// ลบข้อมูลเที่ยวบินจากฐานข้อมูล
	if err := entity.DB().Delete(&flight).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อความยืนยันการลบ
	c.JSON(http.StatusOK, gin.H{"message": "Flight deleted successfully"})
}
