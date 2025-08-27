package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// GET /discounts
func ListDiscounts(c *gin.Context) {
	var discounts []entity.Discounts
	if err := config.DB().Find(&discounts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve discounts"})
		return
	}
	c.JSON(http.StatusOK, discounts)
}

// POST /discounts
func CreateDiscount(c *gin.Context) {
	var discount entity.Discounts
	if err := c.ShouldBindJSON(&discount); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB().Create(&discount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create discount"})
		return
	}
	c.JSON(http.StatusCreated, discount)
}