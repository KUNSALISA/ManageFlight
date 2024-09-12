package main
import (
	"github.com/KUNSALISA/ManageFlight/controller"
	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"
func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// User Routes
	//All page
	r.GET("/members", controller.ListMember)
	r.GET("/member/:ID", controller.GetMember)
	r.GET("/login/:username", controller.GetMemberByUsername)
	r.PATCH("/members", controller.UpdateMember)
	r.DELETE("/members/:id", controller.DeleteMember)
	r.POST("/members", controller.CreateMember)
	//Page.Login
	r.POST("/login", controller.LoginByUsername)
	//Page.publish
	r.GET("/cartoon/:ID",controller.GetCartoonByID)
	r.GET("/episodes/:ID",controller.GetEpisodeByID)
	r.GET("/episode/:ID",controller.GetChapterByID)
	r.POST("/episodes/:ID",controller.CreateEpisodes)
	r.POST("/cartoons/:ID/:categoriesID",controller.CreateSeries)
	//Page.paymentCoin
	r.GET("/package", controller.PackageCoin)
	r.GET("/package/:ID/:ID_package", controller.UpdateCoin)
	//Page.Catagories
	r.GET("/categories",controller.GetCategories)
	r.GET("/cartoons/:ID",controller.GetCartoon)
	
	//Page.Dashboard
	r.GET("/home",controller.GetCartoonToDashboard)

	//Page.paymentEpisode
	r.GET("/paymentEP/:member_ID/:ID_E", controller.CheckPaymentEP)
	r.GET("PaymentEP/:member_ID/:ID_E",controller.UpdatePaymentEp)

	//Page.Comment
    r.POST("/comments/:ID/:IDep",controller.CreateComment)
    r.GET("/comments/:ID",controller.GetComment)
    r.GET("/members/:ID",controller.GetUsernameByMemberID)

	//Page.Bookshelf/follow
	r.GET("/bookshelf/follow/:ID",controller.GetCartoonFollowByID)

	r.GET("/bookshelf/follows/:memberID/:cartoonID",controller.CreateFollow)
	r.GET("/bookshelf/followsCheck/:memberID/:cartoonID",controller.CheckCartoonFollowByID)
	r.DELETE("/bookshelf/follows/:memberID/:cartoonID",controller.DeleteFollow)

	//Page.rating
	r.GET("/cartoon/ratings/:mem4RatingID/:toon4RatingID",controller.CreateRating)
	r.GET("/cartoon/ratingCheck/:mem4RatingID/:toon4RatingID",controller.CheckCartoonRatingByID)
	r.DELETE("/cartoon/ratingDEL/:mem4RatingID/:toon4RatingID",controller.DeleteRating)

	r.GET("/cartoon/rating",controller.GetCartoonRating1stID)
	r.GET("/cartoon/ratings2nd",controller.GetCartoonRating2ndID)
	r.GET("/cartoon/ratings3th",controller.GetCartoonRating3thID)
	
	
	//Page.Bookshelf/paymentEpisodes
	r.GET("/bookshelf/paymentEpisodes",controller.ListPaymentEpisode)
	r.GET("/bookshelf/paymentEpisodes/:ID",controller.GetCartoonPaymentEpisodesByID)
	
	//Page.Bookshelf/history
	r.GET("/bookshelf/history/:memberID",controller.GetCartoonHistoryByID)
	r.GET("/bookshelf/history/:memberID/:cartoonID",controller.CreateHistory)


	

	// Run the server
	r.Run()
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