package controller

import (
	"net/http"
	"time"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// func CreateFlightDetails(c *gin.Context) {
// 	var flightDetails entity.FlightDetails

// 	// ผูกข้อมูล JSON ที่ได้รับมากับ FlightDetails struct
// 	if err := c.ShouldBindJSON(&flightDetails); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// ตรวจสอบความถูกต้อง เช่น FlyingFromID, GoingToID
// 	if flightDetails.FlyingFromID == nil || flightDetails.GoingToID == nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "FlyingFromID and GoingToID are required"})
// 		return
// 	}

// 	flightDetails.CreatedAt = time.Now()
// 	flightDetails.UpdatedAt = time.Now()

// 	// บันทึกข้อมูลลงในฐานข้อมูล
// 	if err := entity.DB().Create(&flightDetails).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// ส่งข้อมูลกลับไปยืนยัน
// 	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
// }

// CreateFlightDetails - ฟังก์ชันสำหรับเพิ่มเที่ยวบิน
func CreateFlightDetails(c *gin.Context) {
	var flightDetails entity.FlightDetails

	// ผูกข้อมูล JSON ที่ได้รับมากับ FlightDetails struct
	if err := c.ShouldBindJSON(&flightDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบความถูกต้องของข้อมูล
	if flightDetails.FlightCode == "" || flightDetails.ScheduleStart.IsZero() || flightDetails.ScheduleEnd.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlightCode, ScheduleStart, and ScheduleEnd are required"})
		return
	}

	// ตรวจสอบว่า FlyingFromID และ GoingToID มีค่าหรือไม่
	if flightDetails.FlyingFromID == nil || flightDetails.GoingToID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlyingFromID and GoingToID are required"})
		return
	}

	// ตรวจสอบสนามบินต้นทาง
	if flightDetails.FlyingFromID != nil {
		var airport entity.Airport
		if err := entity.DB().First(&airport, flightDetails.FlyingFromID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "FlyingFrom not found"})
			return
		}
		flightDetails.FlyingFrom = airport
	}

	// ตรวจสอบสนามบินปลายทาง
	if flightDetails.GoingToID != nil {
		var airport entity.Airport
		if err := entity.DB().First(&airport, flightDetails.GoingToID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "GoingTo not found"})
			return
		}
		flightDetails.GoingTo = airport
	}

	// บันทึกข้อมูลลงฐานข้อมูล
	if err := entity.DB().Create(&flightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create FlightDetails"})
		return
	}

	// ส่งข้อมูลกลับเพื่อยืนยันการเพิ่ม
	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
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

	// ค้นหาข้อมูล FlightDetails ตาม ID
	if err := entity.DB().First(&flightDetails, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FlightDetails not found"})
		return
	}

	// ผูกข้อมูลใหม่จาก JSON ไปยัง struct flightDetails
	var input entity.FlightDetails
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า FlyingFromID และ GoingToID มีค่าหรือไม่
	if input.FlyingFromID == nil || input.GoingToID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FlyingFromID and GoingToID are required"})
		return
	}

	// ล็อก ID ไม่ให้เปลี่ยนแปลง
	input.ID = flightDetails.ID

	// อัปเดตฟิลด์ต่างๆ
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

	// บันทึกข้อมูลที่อัปเดตลงฐานข้อมูล
	if err := entity.DB().Save(&flightDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลที่อัปเดตกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": flightDetails})
}

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

	// ตรวจสอบว่ามีการลบสำเร็จหรือไม่
	if entity.DB().RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete FlightDetails"})
		return
	}

	// ส่งข้อความยืนยันการลบ
	c.JSON(http.StatusOK, gin.H{"message": "FlightDetails deleted successfully"})
}
