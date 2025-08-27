package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// GET /billable_items
func ListBillableItems(c *gin.Context) {
	var items []entity.BillableItems
	if err := config.DB().Find(&items).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve billable items"})
		return
	}
	c.JSON(http.StatusOK, items)
}

// POST /billable_item
func CreateBillableItem(c *gin.Context) {
	var item entity.BillableItems
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB().Create(&item).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create billable item"})
		return
	}
	c.JSON(http.StatusCreated, item)
}

// DELETE /billable_item/:id
func DeleteCreatorById(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Exec("DELETE FROM billableitemid WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "deleted succesful"})
}
