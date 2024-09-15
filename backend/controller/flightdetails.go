package controller

import (
	"net/http"
	"time"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

// // CreateFlightDetails - ฟังก์ชันสำหรับสร้างข้อมูล FlightDetails ใหม่
// func CreateFlightDetails(c *gin.Context) {
// 	var flightDetails entity.FlightDetails

// 	// ผูกข้อมูลจาก JSON ไปยัง struct flightDetails
// 	if err := c.ShouldBindJSON(&flightDetails); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// ตรวจสอบว่า FlyingFromID และ GoingToID มีค่าหรือไม่
// 	if flightDetails.FlyingFromID == nil || flightDetails.GoingToID == nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "FlyingFromID and GoingToID are required"})
// 		return
// 	}

// 	// ตรวจสอบว่า AirlineID, TypeID เป็นค่า valid หรือไม่ (หากมีการตรวจสอบ)
// 	// สมมติว่ามีการตรวจสอบว่า AirlineID, TypeID เป็น valid ID ได้

// 	// ตั้งค่า Datetime เป็นเวลาปัจจุบัน
// 	flightDetails.CreatedAt = time.Now()
// 	flightDetails.UpdatedAt = time.Now()

// 	// บันทึกข้อมูลลงฐานข้อมูล
// 	if err := entity.DB().Create(&flightDetails).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// ส่งข้อมูลกลับไปในรูป JSON พร้อมสถานะ OK
// 	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
// }

func CreateFlightDetails(c *gin.Context) {
	var flightDetails entity.FlightDetails

	if err := c.ShouldBindJSON(&flightDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if flightDetails.FlyingFromID == nil || flightDetails.GoingToID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlyingFromID and GoingToID are required"})
		return
	}

	flightDetails.CreatedAt = time.Now()
	flightDetails.UpdatedAt = time.Now()

	if err := entity.DB().Create(&flightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
}

// GetFlightDetails - ฟังก์ชันสำหรับดึงข้อมูล FlightDetails ทั้งหมด
func GetFlightDetails(c *gin.Context) {
	var flightDetails []entity.FlightDetails

	// ดึงข้อมูลจากฐานข้อมูล
	if err := entity.DB().Find(&flightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
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

// UpdateFlightDetails - ฟังก์ชันสำหรับอัปเดตข้อมูล FlightDetails
func UpdateFlightDetails(c *gin.Context) {
	var flightDetails entity.FlightDetails
	id := c.Param("id")

	// ค้นหาข้อมูล FlightDetails ตาม ID
	if err := entity.DB().First(&flightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightDetails not found"})
		return
	}

	// ผูกข้อมูลใหม่จาก JSON ไปยัง struct flightDetails
	if err := c.ShouldBindJSON(&flightDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า FlyingFromID และ GoingToID มีค่าหรือไม่
	if flightDetails.FlyingFromID == nil || flightDetails.GoingToID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlyingFromID and GoingToID are required"})
		return
	}

	// ตั้งค่า UpdatedAt เป็นเวลาปัจจุบัน
	flightDetails.UpdatedAt = time.Now()

	// บันทึกข้อมูลที่อัปเดตลงฐานข้อมูล
	if err := entity.DB().Save(&flightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลที่อัปเดตกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
}

// DeleteFlightDetails - ฟังก์ชันสำหรับลบข้อมูล FlightDetails
func DeleteFlightDetails(c *gin.Context) {
	var flightDetails entity.FlightDetails
	id := c.Param("id")

	// ค้นหาข้อมูล FlightDetails ตาม ID
	if err := entity.DB().First(&flightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightDetails not found"})
		return
	}

	// ลบข้อมูล FlightDetails จากฐานข้อมูล
	if err := entity.DB().Delete(&flightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อความยืนยันการลบ
	c.JSON(http.StatusOK, gin.H{"message": "FlightDetails deleted successfully"})
}
