package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// POST /payments
func CreatePayment(c *gin.Context) {
	var payment entity.Payments
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB().Create(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create payment"})
		return
	}
	c.JSON(http.StatusCreated, payment)
}

// GET /payments/:id
func GetPaymentByID(c *gin.Context) {
	var payment entity.Payments
	id := c.Param("id")
	if err := config.DB().Preload("BillableItem").Preload("PaymentMethods").Preload("Status").Preload("PaymentReport").First(&payment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
		return
	}
	c.JSON(http.StatusOK, payment)
}

// GET /payments
func ListPayments(c *gin.Context) {
	var payments []entity.Payments
	if err := config.DB().Preload("BillableItem").Preload("Status").Find(&payments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not list payments"})
		return
	}
	c.JSON(http.StatusOK, payments)
}

// GET /payment_methods
func ListPaymentMethods(c *gin.Context) {
	var methods []entity.PaymentMethods
	if err := config.DB().Find(&methods).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Could not list payment methods"})
		return
	}
	c.JSON(http.StatusOK, methods)
}

// GET /payment_statuses
func ListPaymentStatuses(c *gin.Context) {
    var statuses []entity.Statuses
    if err := config.DB().Find(&statuses).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Could not list payment statuses"})
        return
    }
    c.JSON(http.StatusOK, statuses)
}