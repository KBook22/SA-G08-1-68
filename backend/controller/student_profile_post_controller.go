// backend/controllers/student_profile_post_controller.go
package controller

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config" // ✨ เพิ่ม import config
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/KBook22/System-Analysis-and-Design/services"
	"github.com/gin-gonic/gin"
)

// POST /student-profile-posts
func CreateStudentProfilePost(c *gin.Context) {
	var post entity.StudentProfilePost
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// --- ✨ 1. ดึง userID จาก Context ที่ Middleware ตั้งค่าไว้ ---
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not identified"})
		return
	}

	// --- ✨ 2. ค้นหา Student ID จาก User ID ---
	var student entity.Student
	if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found for the logged-in user"})
		return
	}

	// --- ✨ 3. ส่ง Student ID ที่ได้เข้าไปใน Service Layer ---
	createdPost, err := services.CreateStudentProfilePost(&post, student.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student profile post"})
		return
	}
	c.JSON(http.StatusCreated, createdPost)
}

// GET /student-profile-posts
func GetStudentProfilePosts(c *gin.Context) {
    posts, err := services.GetStudentProfilePosts()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve student posts"})
        return
    }
    c.JSON(http.StatusOK, posts)
}