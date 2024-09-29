package main

import (
	"github.com/KUNSALISA/ManageFlight/controller"
	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	// เริ่มต้นเชื่อมต่อกับฐานข้อมูล
	entity.SetupDatabase()

	// สร้าง Gin engine ใหม่
	r := gin.Default()

	// ใช้ CORS middleware
	r.Use(CORSMiddleware())

	// เส้นทางทั้งหมดจะไม่ต้องยืนยันตัวตน
	r.POST("/login", controller.LoginByUsername)
	r.POST("/register", controller.RegisterAdmin)

	// Airline routes
	r.GET("/airline", controller.GetAirline)
	r.GET("/airline/:ID", controller.GetAirlineByID)

	// Airport routes
	r.GET("/airport", controller.GetAirports)
	r.GET("/airport/:ID", controller.GetAirportByID)

	// TypeOfFlight routes
	r.GET("/TypeOfFlight", controller.GetTypeOfFlight)
	r.GET("/TypeOfFlight/:ID", controller.GetTypeOfFlightByID)

	// FlightDetails routes
	r.POST("/flight-details", controller.CreateFlightDetails)
	r.GET("/flight-details", controller.GetFlightDetails)
	r.GET("/flight-details/:id", controller.GetFlightDetailsByID)
	r.PATCH("/flight-details", controller.UpdateFlightDetails)
	r.DELETE("/flight-details/:id", controller.DeleteFlightDetails)

	// Flight and FlightDetails combined routes
	r.POST("/flight-and-flight-details", controller.CreateFlightAndFlightDetails)
	r.GET("/flight-and-flight-details", controller.GetFlightAndFlightDetails)
	r.GET("/flight-and-flight-details/:id", controller.GetFlightAndFlightDetailsByID)
	// r.PUT("/flight-and-flight-details/:id", controller.UpdateFlightAndFlightDetails)
	// r.DELETE("/flight-and-flight-details/:id", controller.DeleteFlightAndFlightDetails)

	// รันเซิร์ฟเวอร์ที่พอร์ตที่กำหนด
	r.Run("localhost:" + PORT)
}

// CORSMiddleware เป็น Middleware ที่ใช้เปิดการสนับสนุน CORS
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204) // หากเป็นคำขอ OPTIONS ให้ตอบกลับด้วย 204
			return
		}
		c.Next() // ดำเนินการต่อกับคำขอที่ไม่ใช่ OPTIONS
	}
}
