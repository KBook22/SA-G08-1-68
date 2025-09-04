package controller

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// ดึงข้อมูลนักศึกษา  JobPost พร้อม Preload
func InitJobApplication(c *gin.Context) {
	jobpostID := c.Param("id")
	userID, _ := c.Get("userID")

	// ดึงข้อมูลนักศึกษา + gender + bank
	var student entity.Student
	if err := config.DB().
		Preload("User").
		Preload("Gender").
		Preload("Bank").
		Where("user_id = ?", userID).
		First(&student).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบนักศึกษา"})
		return
	}

	// ดึงข้อมูลประกาศงาน + employer + category + employment type + salary type
	var jobpost entity.Jobpost
	if err := config.DB().
		Preload("Employer").
		Preload("Employer.User").
		Preload("JobCategory").
		Preload("EmploymentType").
		Preload("SalaryType").
		First(&jobpost, jobpostID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบประกาศงาน"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"student": student,
		"student_code": student.User.Username,
		"jobpost": jobpost,
	})
}

// สมัครงาน
func CreateJobApplication(c *gin.Context) {
	var app entity.JobApplication
	if err := c.ShouldBindJSON(&app); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	app.ApplicationStatus = entity.StatusPending
	app.LastUpdate = time.Now()

	if err := config.DB().Create(&app).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "สมัครงานสำเร็จ",
		"data":    app,
	})
}
