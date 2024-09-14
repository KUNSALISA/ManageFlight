// package main

// import (
// 	"github.com/KUNSALISA/ManageFlight/controller"
// 	"github.com/KUNSALISA/ManageFlight/entity"
// 	"github.com/gin-gonic/gin"
// )

// const PORT = "8080"

// func main() {
// 	entity.SetupDatabase()
// 	r := gin.Default()
// 	r.Use(CORSMiddleware())
// 	// User Routes
// 	// //All page
// 	// r.GET("/members", controller.ListMember)
// 	// r.GET("/member/:ID", controller.GetMember)
// 	// r.GET("/login/:username", controller.GetMemberByUsername)
// 	// r.PATCH("/members", controller.UpdateMember)
// 	// r.DELETE("/members/:id", controller.DeleteMember)
// 	// r.POST("/members", controller.CreateMember)
// 	// //Page.Login
// 	// r.POST("/login", controller.LoginByUsername)

// 	//Page.flight
// 	r.POST("/flights", controller.CreateFlight)
// 	r.GET("/flights", controller.GetFlights)
// 	r.GET("/flights/:id", controller.GetFlightByID)
// 	r.PUT("/flights/:id", controller.UpdateFlight)
// 	r.DELETE("/flights/:id", controller.DeleteFlight)

// 	//Page.airline
// 	r.GET("/airline", controller.GetAirline)
// 	r.GET("/airline/:ID", controller.GetAirlineByID)

// 	//Page.airport
// 	r.GET("/airport", controller.GetAirports)
// 	r.GET("/airport/:ID", controller.GetAirportByID)

// 	//Page.TypeOfFlight
// 	r.GET("/TypeOfFlight", controller.GetTypeOfFlight)
// 	r.GET("/TypeOfFlight/:ID", controller.GetTypeOfFlightByID)

// 	//Page.FlightDetails
// 	r.POST("/flight-details", controller.CreateFlightDetails)
// 	r.GET("/flight-details", controller.GetFlightDetails)
// 	r.GET("/flight-details/:id", controller.GetFlightDetailsByID)
// 	r.PUT("/flight-details/:id", controller.UpdateFlightDetails)
// 	r.DELETE("/flight-details/:id", controller.DeleteFlightDetails)

// 	//Page.FlightAndFlightDetails
// 	r.POST("/flight-and-flight-details", controller.CreateFlightAndFlightDetails)
// 	r.GET("/flight-and-flight-details", controller.GetFlightAndFlightDetails)
// 	r.GET("/flight-and-flight-details/:id", controller.GetFlightAndFlightDetailsByID)
// 	r.PUT("/flight-and-flight-details/:id", controller.UpdateFlightAndFlightDetails)
// 	r.DELETE("/flight-and-flight-details/:id", controller.DeleteFlightAndFlightDetails)

// 	// Run the server
// 	r.Run("localhost:" + PORT)
// }
// func CORSMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
// 		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(204)
// 			return
// 		}
// 		c.Next()
// 	}
// }

package main

import (
	"github.com/KUNSALISA/ManageFlight/controller"
	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/KUNSALISA/ManageFlight/middleware"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	// User Routes
	r.POST("/login", controller.LoginByUsername)

	// Page.flight
	r.POST("/flights", middleware.AuthMiddleware(), controller.CreateFlight)
	r.GET("/flights", middleware.AuthMiddleware(), controller.GetFlights)
	r.GET("/flights/:id", middleware.AuthMiddleware(), controller.GetFlightByID)
	r.PUT("/flights/:id", middleware.AuthMiddleware(), controller.UpdateFlight)
	r.DELETE("/flights/:id", middleware.AuthMiddleware(), controller.DeleteFlight)

	// Page.airline
	r.GET("/airline", middleware.AuthMiddleware(), controller.GetAirline)
	r.GET("/airline/:ID", middleware.AuthMiddleware(), controller.GetAirlineByID)

	// Page.airport
	r.GET("/airport", middleware.AuthMiddleware(), controller.GetAirports)
	r.GET("/airport/:ID", middleware.AuthMiddleware(), controller.GetAirportByID)

	// Page.TypeOfFlight
	r.GET("/TypeOfFlight", middleware.AuthMiddleware(), controller.GetTypeOfFlight)
	r.GET("/TypeOfFlight/:ID", middleware.AuthMiddleware(), controller.GetTypeOfFlightByID)

	// Page.FlightDetails
	r.POST("/flight-details", middleware.AuthMiddleware(), controller.CreateFlightDetails)
	r.GET("/flight-details", middleware.AuthMiddleware(), controller.GetFlightDetails)
	r.GET("/flight-details/:id", middleware.AuthMiddleware(), controller.GetFlightDetailsByID)
	r.PUT("/flight-details/:id", middleware.AuthMiddleware(), controller.UpdateFlightDetails)
	r.DELETE("/flight-details/:id", middleware.AuthMiddleware(), controller.DeleteFlightDetails)

	// Page.FlightAndFlightDetails
	r.POST("/flight-and-flight-details", middleware.AuthMiddleware(), controller.CreateFlightAndFlightDetails)
	r.GET("/flight-and-flight-details", middleware.AuthMiddleware(), controller.GetFlightAndFlightDetails)
	r.GET("/flight-and-flight-details/:id", middleware.AuthMiddleware(), controller.GetFlightAndFlightDetailsByID)
	r.PUT("/flight-and-flight-details/:id", middleware.AuthMiddleware(), controller.UpdateFlightAndFlightDetails)
	r.DELETE("/flight-and-flight-details/:id", middleware.AuthMiddleware(), controller.DeleteFlightAndFlightDetails)

	// Run the server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
