package controller

import (
	"errors"
	"net/http"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/KUNSALISA/ManageFlight/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func LoginByUsername(c *gin.Context) {
	var login entity.Admin
	var jwtWrapper services.JwtWrapper

	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	var admin entity.Admin
	if err := entity.DB().Where("email = ?", login.Email).First(&admin).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(login.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Incorrect password"})
		return
	}

	jwtWrapper.SecretKey = "Manage"
	jwtWrapper.Issuer = "ManageFlight"
	jwtWrapper.ExpirationHours = 24

	token, err := jwtWrapper.GenerateToken(admin.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Token generation failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"role":  admin.Role, ////////////
	})
}

//signup

func RegisterAdmin(c *gin.Context) {

	var payload entity.Admin

	if err := c.ShouldBindJSON(&payload); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	db := entity.DB()

	var userCheck entity.Admin

	result := db.Where("email = ?", payload.Email).First(&userCheck)

	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {

		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})

		return

	}

	if userCheck.ID != 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
		return
	}

	hashedPassword, _ := entity.HashPassword(payload.Password)
	user := entity.Admin{
		Email:     payload.Email,
		Password:  hashedPassword,
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
		Birthday:  payload.Birthday,
		Role:      "user",
	}

	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Sign-up successful"})

}
