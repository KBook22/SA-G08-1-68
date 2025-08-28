package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// POST /payment_reports
func CreatePaymentReport(c *gin.Context) {
	var report entity.PaymentReports
	if err := c.ShouldBindJSON(&report); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB().Create(&report).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create payment report"})
		return
	}
	c.JSON(http.StatusCreated, report)
}

// GET /payment_reports
func ListPaymentReports(c *gin.Context) {
	var reports []entity.PaymentReports
	if err := config.DB().Find(&reports).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not list payment reports"})
		return
	}
	c.JSON(http.StatusOK, reports)
}

// GET /payment_reports/:id
func GetPaymentReportByID(c *gin.Context) {
	var report entity.PaymentReports
	id := c.Param("id")
	if err := config.DB().First(&report, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Payment report not found"})
		return
	}
	c.JSON(http.StatusOK, report)
}