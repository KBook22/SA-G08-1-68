package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// POST /new-review
func CreateRating(c *gin.Context) {
	var review entity.Reviews

	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "created successful"})
}

// GET /reviews
func FindRatingsByJobPostID(c *gin.Context) {
	var reviews []entity.Reviews
	jobpostID := c.Query("jobpost_id")

	if jobpostID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "jobpost_id is required"})
		return
	}

	if err := config.DB().Preload("Student").Preload("Employer").Preload("Ratingscore").Where("jobpost_id = ?", jobpostID).Find(&reviews).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, reviews)
}

// GET /rating_scores
func ListRatingScores(c *gin.Context) {
	var scores []entity.Ratingscores
	if err := config.DB().Find(&scores).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Could not list rating scores"})
		return
	}
	c.JSON(http.StatusOK, scores)
}