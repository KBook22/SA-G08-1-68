package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// POST /student-profile-posts
func CreateStudentProfilePost(c *gin.Context) {
	var post entity.StudentProfilePost
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post.StudentID = 1 

	if err := config.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student profile post"})
		return
	}

	c.JSON(http.StatusCreated, post)
}

// GET /student-profile-posts
func GetStudentProfilePosts(c *gin.Context) {
    var posts []entity.StudentProfilePost
    if err := config.DB.Preload("Student").Find(&posts).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve student posts"})
        return
    }
    c.JSON(http.StatusOK, posts)
}