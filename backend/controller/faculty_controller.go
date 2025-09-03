package controller

import (
	"net/http"
	"strconv"
	
	"github.com/gin-gonic/gin"
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
)

// ListFaculties ดึงรายการคณะทั้งหมดพร้อม departments
func ListFaculties(c *gin.Context) {
	var faculties []entity.Faculty
	
	// Preload departments เพื่อให้ได้ข้อมูลสาขาวิชาด้วย
	if err := config.DB().Preload("Departments").Find(&faculties).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to fetch faculties",
			"message": err.Error(),
		})
		return
	}

	// แปลงเป็น response format
	var response []entity.FacultyResponse
	for _, faculty := range faculties {
		var departments []entity.DepartmentResponse
		for _, dept := range faculty.Departments {
			departments = append(departments, entity.DepartmentResponse{
				ID:        dept.ID,
				Name:      dept.Name,
				FacultyID: *dept.FacultyID,
			})
		}

		response = append(response, entity.FacultyResponse{
			ID:          faculty.ID,
			Name:        faculty.Name,
			Departments: departments,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    response,
		"count":   len(response),
	})
}

// ListDepartmentsByFaculty ดึงรายการสาขาวิชาตาม Faculty ID
func ListDepartmentsByFaculty(c *gin.Context) {
	facultyIDStr := c.Param("id")
	facultyID, err := strconv.ParseUint(facultyIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid faculty ID",
		})
		return
	}

	// ตรวจสอบว่าคณะนี้มีอยู่จริงหรือไม่
	var faculty entity.Faculty
	if err := config.DB().First(&faculty, facultyID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Faculty not found",
		})
		return
	}

	// ดึงสาขาวิชาในคณะนี้
	var departments []entity.Department
	if err := config.DB().Where("faculty_id = ?", facultyID).Find(&departments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to fetch departments",
			"message": err.Error(),
		})
		return
	}

	// แปลงเป็น response format
	var response []entity.DepartmentResponse
	for _, dept := range departments {
		response = append(response, entity.DepartmentResponse{
			ID:        dept.ID,
			Name:      dept.Name,
			FacultyID: *dept.FacultyID,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"success":     true,
		"data":        response,
		"count":       len(response),
		"faculty_id":  facultyID,
		"faculty_name": faculty.Name,
	})
}

// GetFacultyByID ดึงข้อมูลคณะตาม ID
func GetFacultyByID(c *gin.Context) {
	facultyIDStr := c.Param("id")
	facultyID, err := strconv.ParseUint(facultyIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid faculty ID",
		})
		return
	}

	var faculty entity.Faculty
	if err := config.DB().Preload("Departments").First(&faculty, facultyID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Faculty not found",
		})
		return
	}

	// แปลงเป็น response format
	var departments []entity.DepartmentResponse
	for _, dept := range faculty.Departments {
		departments = append(departments, entity.DepartmentResponse{
			ID:        dept.ID,
			Name:      dept.Name,
			FacultyID: *dept.FacultyID,
		})
	}

	response := entity.FacultyResponse{
		ID:          faculty.ID,
		Name:        faculty.Name,
		Departments: departments,
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    response,
	})
}
