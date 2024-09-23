package controller

import (
	"net/http"
	"time"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

type CreateFlightAndDetailsRequest struct {
	FlightID        uint   `json:"flightID"`
	FlightDetailIDs []uint `json:"flightDetailIDs"` // เปลี่ยนเป็นอาร์เรย์
	AdminID         uint   `json:"adminID"`
}

func CreateFlightAndFlightDetails(c *gin.Context) {
	var req CreateFlightAndDetailsRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบข้อมูล Admin ที่ส่งมา
	var admin entity.Admin
	if err := entity.DB().First(&admin, req.AdminID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Admin not found"})
		return
	}

	// สำหรับแต่ละ FlightDetailID
	for _, flightDetailID := range req.FlightDetailIDs {
		flightAndDetails := entity.FlightAndFlightDetails{
			FlightID:       &req.FlightID,
			FlightDetailID: &flightDetailID,
			AdminID:        &req.AdminID,
		}
		if err := entity.DB().Create(&flightAndDetails).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create flight and details"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"status": "Flight and details added successfully"})
}

func parseDate(dateStr string) time.Time {
	layout := "2006-01-02"
	t, _ := time.Parse(layout, dateStr)
	return t
}

func GetFlightAndFlightDetails(c *gin.Context) {
	var flightAndDetails []entity.FlightAndFlightDetails

	if err := entity.DB().
		Preload("Flight").
		Preload("FlightDetail").
		Preload("FlightDetail.Airline").
		Preload("FlightDetail.FlyingFrom").
		Preload("FlightDetail.GoingTo").
		Preload("FlightDetail.Type").
		Preload("Admin").
		First(&flightAndDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get flight and details"})
		return
	}
	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flightAndDetails})
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
