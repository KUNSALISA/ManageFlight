package controller

import (
	"net/http"
	"time"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

// CreateFlightAndFlightDetails - ฟังก์ชันสำหรับสร้างข้อมูล FlightAndFlightDetails ใหม่
func CreateFlightAndFlightDetails(c *gin.Context) {
	var flightAndFlightDetails entity.FlightAndFlightDetails

	// ผูกข้อมูลจาก JSON ไปยัง struct flightAndFlightDetails
	if err := c.ShouldBindJSON(&flightAndFlightDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า FlightID, FlightDetailID, AdminID มีค่าหรือไม่
	if flightAndFlightDetails.FlightID == nil || flightAndFlightDetails.FlightDetailID == nil || flightAndFlightDetails.AdminID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlightID, FlightDetailID, and AdminID are required"})
		return
	}

	// ตั้งค่า Datetime เป็นเวลาปัจจุบัน
	flightAndFlightDetails.CreatedAt = time.Now()
	flightAndFlightDetails.UpdatedAt = time.Now()

	// บันทึกข้อมูลลงฐานข้อมูล
	if err := entity.DB().Create(&flightAndFlightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON พร้อมสถานะ OK
	c.JSON(http.StatusOK, gin.H{"data": flightAndFlightDetails})
}

// // GetFlightAndFlightDetails - ฟังก์ชันสำหรับดึงข้อมูล FlightAndFlightDetails ทั้งหมด
// func GetFlightAndFlightDetails(c *gin.Context) {
// 	var flightAndFlightDetails []entity.FlightAndFlightDetails

// 	// ดึงข้อมูลจากฐานข้อมูล
// 	if err := entity.DB().Find(&flightAndFlightDetails).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// ส่งข้อมูลกลับไปในรูป JSON
// 	c.JSON(http.StatusOK, gin.H{"data": flightAndFlightDetails})
// }

// GetFlightAndFlightDetails - ดึงข้อมูล FlightAndFlightDetails ทั้งหมด
func GetFlightAndFlightDetails(c *gin.Context) {
	var flightAndFlightDetails []entity.FlightAndFlightDetails

	// ดึงข้อมูลพร้อมกับการเชื่อมข้อมูลใน relation ต่างๆ เช่น Flight, FlightDetails, Admin
	if err := entity.DB().Preload("Flight").Preload("FlightDetail").Preload("Admin").Find(&flightAndFlightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flightAndFlightDetails})
}

// GetFlightAndFlightDetailsByID - ฟังก์ชันสำหรับดึงข้อมูล FlightAndFlightDetails ตาม ID
func GetFlightAndFlightDetailsByID(c *gin.Context) {
	var flightAndFlightDetails entity.FlightAndFlightDetails
	id := c.Param("id")

	// ดึงข้อมูลจากฐานข้อมูลตาม ID
	if err := entity.DB().First(&flightAndFlightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightAndFlightDetails not found"})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flightAndFlightDetails})
}

// UpdateFlightAndFlightDetails - ฟังก์ชันสำหรับอัปเดตข้อมูล FlightAndFlightDetails
func UpdateFlightAndFlightDetails(c *gin.Context) {
	var flightAndFlightDetails entity.FlightAndFlightDetails
	id := c.Param("id")

	// ค้นหาข้อมูล FlightAndFlightDetails ตาม ID
	if err := entity.DB().First(&flightAndFlightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightAndFlightDetails not found"})
		return
	}

	// ผูกข้อมูลใหม่จาก JSON ไปยัง struct flightAndFlightDetails
	if err := c.ShouldBindJSON(&flightAndFlightDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า FlightID, FlightDetailID, AdminID มีค่าหรือไม่
	if flightAndFlightDetails.FlightID == nil || flightAndFlightDetails.FlightDetailID == nil || flightAndFlightDetails.AdminID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlightID, FlightDetailID, and AdminID are required"})
		return
	}

	// ตั้งค่า UpdatedAt เป็นเวลาปัจจุบัน
	flightAndFlightDetails.UpdatedAt = time.Now()

	// บันทึกข้อมูลที่อัปเดตลงฐานข้อมูล
	if err := entity.DB().Save(&flightAndFlightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลที่อัปเดตกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flightAndFlightDetails})
}

// DeleteFlightAndFlightDetails - ฟังก์ชันสำหรับลบข้อมูล FlightAndFlightDetails
func DeleteFlightAndFlightDetails(c *gin.Context) {
	var flightAndFlightDetails entity.FlightAndFlightDetails
	id := c.Param("id")

	// ค้นหาข้อมูล FlightAndFlightDetails ตาม ID
	if err := entity.DB().First(&flightAndFlightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightAndFlightDetails not found"})
		return
	}

	// ลบข้อมูล FlightAndFlightDetails จากฐานข้อมูล
	if err := entity.DB().Delete(&flightAndFlightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อความยืนยันการลบ
	c.JSON(http.StatusOK, gin.H{"message": "FlightAndFlightDetails deleted successfully"})
}
