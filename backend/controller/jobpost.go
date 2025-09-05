package controller

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// GET /jobposts
// ดึงข้อมูลประกาศงานทั้งหมด
func ListJobPosts(c *gin.Context) {
	var jobposts []entity.Jobpost
	if err := config.DB().Find(&jobposts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": jobposts})
}

// GET /jobposts/:id
// ดึงข้อมูลประกาศงานตาม ID
func GetJobPostByID(c *gin.Context) {
	var jobpost entity.Jobpost
	id := c.Param("id")
	if err := config.DB().First(&jobpost, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job post not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": jobpost})
}

// GET /jobposts/employer/:id
func ListJobPostsByEmployerID(c *gin.Context) {
	var jobposts []entity.Jobpost
	id := c.Param("id") 
	if err := config.DB().Where("employer_id = ?", id).Find(&jobposts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": jobposts})
}
// POST /jobposts
// สร้างประกาศงานใหม่
func CreateJobPost(c *gin.Context) {
	var jobpost entity.Jobpost
	if err := c.ShouldBindJSON(&jobpost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB().Create(&jobpost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": jobpost})
}

// PUT /jobposts/:id
// อัปเดตข้อมูลประกาศงาน
func UpdateJobPost(c *gin.Context) {
	var jobpost entity.Jobpost
	id := c.Param("id")
	if err := config.DB().First(&jobpost, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job post not found"})
		return
	}
	if err := c.ShouldBindJSON(&jobpost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB().Save(&jobpost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": jobpost})
}

// DELETE /jobposts/:id
// ลบประกาศงาน
func DeleteJobPost(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Exec("DELETE FROM jobposts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job post not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Job post deleted successfully"})
}