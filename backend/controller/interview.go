package controller

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /interviews/book
// นักศึกษทำการจองตารางสัมภาษณ์
func BookInterview(c *gin.Context) {
	var input struct {
		ScheduleID uint `json:"schedule_id" binding:"required"`
		StudentID  uint `json:"student_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var schedule entity.InterviewScheduling
	// ตรวจสอบว่า schedule ที่ต้องการจองมีอยู่จริงและยังว่างอยู่
	if err := config.DB().Where("id = ? AND status = ?", input.ScheduleID, "available").First(&schedule).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Interview slot not available or not found"})
		return
	}

	// เริ่ม transaction
	tx := config.DB().Begin()

	// สร้าง Interview record
	interview := entity.Interview{
		InterviewSchedulingID: input.ScheduleID,
		StudentID:             input.StudentID,
		Status:                "booked",
	}
	if err := tx.Create(&interview).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create interview record"})
		return
	}

	// อัปเดตสถานะของตารางนัดหมาย (InterviewScheduling)
	schedule.Status = "booked"
	if err := tx.Save(&schedule).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update schedule status"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": interview})
}

// GET /interviews/student/:studentId
// ดูการนัดหมายทั้งหมดของนักศึกษา
func GetInterviewsByStudent(c *gin.Context) {
	studentId := c.Param("studentId")
	var interviews []entity.Interview

	if err := config.DB().Where("student_id = ?", studentId).Preload("InterviewScheduling.Employer").Find(&interviews).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No interviews found for this student"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": interviews})
}

// GET /interviews/employer/:employerId
// ดูการนัดหมายทั้งหมดของนายจ้าง
func GetInterviewsByEmployer(c *gin.Context) {
    employerId := c.Param("employerId")
    var interviews []entity.Interview

    // Join ตารางเพื่อค้นหา interview ที่เชื่อมกับ employerId
    err := config.DB().
        Joins("JOIN interview_schedulings ON interviews.interview_scheduling_id = interview_schedulings.id").
        Where("interview_schedulings.employer_id = ?", employerId).
		Preload("Student").
		Preload("InterviewScheduling").
        Find(&interviews).Error

    if err != nil {
        if err == gorm.ErrRecordNotFound {
             c.JSON(http.StatusNotFound, gin.H{"error": "No interviews found for this employer"})
             return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": interviews})
}