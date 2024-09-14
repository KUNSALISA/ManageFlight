package controller

import (
	"net/http"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/KUNSALISA/ManageFlight/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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

	c.JSON(http.StatusOK, gin.H{"token": token})
}
