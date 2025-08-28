// backend/controllers/question_controller.go
package controllers

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// --- FAQ and General Questions ---

// GET /questions (For FAQs)
func GetQuestions(c *gin.Context) {
	var questions []entity.Question
	if err := config.DB.Order("created_at desc").Find(&questions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve questions"})
		return
	}
	c.JSON(http.StatusOK, questions)
}

// POST /questions (For creating FAQs by admin, etc.)
func CreateQuestion(c *gin.Context) {
	var question entity.Question
	if err := c.ShouldBindJSON(&question); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&question).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create question"})
		return
	}
	c.JSON(http.StatusCreated, question)
}