// // backend/controllers/student_controller.go
// package controller

// import (
// 	"net/http"
// 	"time"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/KBook22/System-Analysis-and-Design/services"
// 	"github.com/gin-gonic/gin"
// 	"gorm.io/gorm"
// )

// type StudentRegistrationPayload struct {
// 	// User fields
// 	Username string `json:"username" binding:"required"`
// 	Password string `json:"password" binding:"required"`

// 	// Student fields
// 	FirstName string `json:"first_name" binding:"required"`
// 	LastName  string `json:"last_name" binding:"required"`
// 	Email     string `json:"email" binding:"required,email"`
// 	Phone     string `json:"phone" binding:"required"`
// 	Faculty   string `json:"faculty" binding:"required"`
// 	Year      int    `json:"year" binding:"required"`
// }

// // POST /register/student
// func RegisterStudent(c *gin.Context) {
// 	var payload StudentRegistrationPayload
// 	if err := c.ShouldBindJSON(&payload); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	tx := config.DB().Begin()

// 	hashedPassword, err := config.HashPassword(payload.Password)
// 	if err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
// 		return
// 	}

// 	user := entity.User{
// 		Username: payload.Username,
// 		Password: hashedPassword,
// 		Role:     entity.Stu,
// 	}

// 	if err := tx.Create(&user).Error; err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Username may already exist"})
// 		return
// 	}

// 	student := entity.Student{
// 		UserID:    user.ID,
// 		FirstName: payload.FirstName,
// 		LastName:  payload.LastName,
// 		Email:     payload.Email,
// 		Phone:     payload.Phone,
// 		Faculty:   payload.Faculty,
// 		Year:      payload.Year,
// 		Birthday:  time.Now(),
// 		Age:       0,
// 		GPA:       0.0,
// 	}

// 	if err := tx.Create(&student).Error; err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student profile"})
// 		return
// 	}

// 	if err := tx.Commit().Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"message": "Student registration successful"})
// }

// // ✨ 1. แก้ไข Struct สำหรับ Response ที่นี่
// type ProfileResponse struct {
// 	Student entity.Student            `json:"student"` // เปลี่ยนจาก StudentInfo -> Student และ json:"student_info" -> json:"student"
// 	Posts   []entity.StudentProfilePost `json:"posts"`
// }

// // GET /profile
// func GetMyProfile(c *gin.Context) {
// 	userID, exists := c.Get("userID")
// 	if !exists {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not identified"})
// 		return
// 	}

// 	studentProfile, err := services.GetStudentProfileByUserID(userID.(uint))
// 	if err != nil {
// 		if err == gorm.ErrRecordNotFound {
// 			c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found"})
// 			return
// 		}
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve profile"})
// 		return
// 	}

// 	studentPosts, err := services.GetStudentProfilePostsByStudentID(studentProfile.ID)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve student posts"})
// 		return
// 	}
    
// 	// ✨ 2. แก้ไขการสร้าง Response ให้ตรงกับ Struct ใหม่
// 	response := ProfileResponse{
// 		Student: *studentProfile,
// 		Posts:   studentPosts,
// 	}

// 	c.JSON(http.StatusOK, response)
// }

// student_controller.go
// student_controller.go
package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
)

func GetMyProfile(c *gin.Context) {
	// ✅ ใช้ userID จาก context
	userIDValue, ok := c.Get("userID")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in token"})
		return
	}

	userID, ok := userIDValue.(uint)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID type in context"})
		return
	}

	// ✅ ดึง student ตาม user_id
	var student entity.Student
	if err := config.DB().Preload("User").
		Where("user_id = ?", userID).
		First(&student).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found", "details": err.Error()})
		return
	}

	// ✅ ดึง posts ของ student
	var posts []entity.StudentProfilePost
	if err := config.DB().Where("student_id = ?", student.ID).Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch student posts", "details": err.Error()})
		return
	}

	// ✅ response รวม
	c.JSON(http.StatusOK, gin.H{
		"student": student,
		"posts":   posts,
	})
}