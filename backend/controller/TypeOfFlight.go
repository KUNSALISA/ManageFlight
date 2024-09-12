package controller

import (
	"net/http"

	"github.com/KUNSALISA/ManageFlight/entity"
	"github.com/gin-gonic/gin"
)

func CreateCategories(c *gin.Context) {
	var types entity.TypeOfFlight

	if err := c.ShouldBindJSON(&types); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": types})
}

func GetCategories(c *gin.Context) {
	var categories []entity.TypeOfFlight
	if err := entity.DB().Raw("SELECT * FROM categories").Find(&categories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": categories})
}
