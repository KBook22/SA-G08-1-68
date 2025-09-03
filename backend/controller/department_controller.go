package controller

import (
	"net/http"
	"strconv"
	
	"github.com/gin-gonic/gin"
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
)

// GetDepartmentByID ดึงข้อมูลสาขาวิชาตาม ID
func GetDepartmentByID(c *gin.Context) {
	deptIDStr := c.Param("id")
	deptID, err := strconv.ParseUint(deptIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid department ID",
		})
		return
	}

	var department entity.Department
	if err := config.DB().Preload("Faculty").First(&department, deptID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Department not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    department,
	})
}

// ListAllDepartments ดึงรายการสาขาวิชาทั้งหมด
func ListAllDepartments(c *gin.Context) {
	var departments []entity.Department
	
	if err := config.DB().Preload("Faculty").Find(&departments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to fetch departments",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    departments,
		"count":   len(departments),
	})
}
