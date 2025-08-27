package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// POST /orders
func CreateOrder(c *gin.Context) {
	var order entity.Orders
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create order"})
		return
	}
	c.JSON(http.StatusCreated, order)
}

// GET /orders/:id
func GetOrderByID(c *gin.Context) {
	var order entity.Orders
	id := c.Param("id")
	if err := config.DB().Preload("Employer").Preload("BillableItem").Preload("AddonServices").First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}
	c.JSON(http.StatusOK, order)
}

// GET /orders
func ListOrders(c *gin.Context) {
	var orders []entity.Orders
	if err := config.DB().Preload("Employer").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not list orders"})
		return
	}
	c.JSON(http.StatusOK, orders)
}

// DELETE /orders/:id
func DeleteOrderByID(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Exec("DELETE FROM orders WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted succesful"})
}