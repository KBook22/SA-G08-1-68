// backend/controllers/post_controller.go
package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// GET /posts
func GetPosts(c *gin.Context) {
	var posts []entity.JobPosting
	// Preload Comments to include them in the response, ordered by creation time
	if err := config.DB.Preload("Comments").Order("created_at desc").Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, posts)
}

// POST /posts
func CreatePost(c *gin.Context) {
	var post entity.JobPosting
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set default values for the new post.
	// In a real application, this should come from the authenticated user's context.
	post.Author = "จอมมาร"
	post.AuthorID = "johndoe"
	post.UserID = "johndoe" // Assuming this is the intended value
	post.Likes = 0
	post.IsLiked = false

	if err := config.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, post)
}