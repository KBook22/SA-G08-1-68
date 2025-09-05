package controller


import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config" // ✨ เพิ่ม import config
	"github.com/KBook22/System-Analysis-and-Design/entity"
	// "github.com/KBook22/System-Analysis-and-Design/services"
	"github.com/gin-gonic/gin"
)

func GetReportstatus(c *gin.Context) {
	var reportstatus []entity.ReportStatus
	if err := config.DB().Order("created_at asc").Find(&reportstatus).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve questions"})
		return
	}
	c.JSON(http.StatusOK, reportstatus)
}