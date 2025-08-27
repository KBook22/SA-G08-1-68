// backend/controllers/comment_controller.go
package controllers

import (
	"net/http"
	"strconv"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// POST /posts/:postId/comments
func CreateComment(c *gin.Context) {
	// Get postId from the URL parameter
	postIdStr := c.Param("postId")
	postId, err := strconv.ParseUint(postIdStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
		return
	}

	var comment entity.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set the foreign key for the comment
	comment.JobPostingID = uint(postId)

	// Set default values. This should be replaced with authenticated user data.
	comment.Author = "จอมมาร"
	comment.AuthorID = "johndoe"
	comment.Likes = 0
	comment.IsLiked = false

	if err := config.DB.Create(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, comment)
}