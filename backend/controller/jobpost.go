package controller

import (
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
	
)

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

// GET /jobposts/:id
// ดึงข้อมูลประกาศงานตาม ID
func GetJobPostByID(c *gin.Context) {
	var jobpost entity.Jobpost
	id := c.Param("id")
	if err := config.DB().Preload("Employer").First(&jobpost, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job post not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": jobpost})
}

// GET /jobposts
// ดึงข้อมูลประกาศงานทั้งหมด
func ListJobPosts(c *gin.Context) {
	var jobposts []entity.Jobpost
	if err := config.DB().Preload("Employer").Find(&jobposts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": jobposts})
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

// POST /jobposts/upload-portfolio/:id
// อัพโหลดไฟล์ Portfolio และอัปเดตใน Jobpost
func UploadPortfolio(c *gin.Context) {
    id := c.Param("id") // รับ id ของ jobpost ที่จะอัพเดต

    file, err := c.FormFile("portfolio")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบไฟล์"})
        return
    }

    filename := file.Filename
    savePath := "./uploads/" + filename

    if err := c.SaveUploadedFile(file, savePath); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถบันทึกไฟล์ได้"})
        return
    }

    // อัปเดตใน DB
    var jobpost entity.Jobpost
    if err := config.DB().First(&jobpost, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Job post not found"})
        return
    }

    jobpost.PortfolioRequired = &savePath
    if err := config.DB().Save(&jobpost).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถอัปเดต jobpost ได้"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message":  "อัพโหลดสำเร็จ",
        "filePath": savePath,
        "data":     jobpost,
    })
}

// GET /employer/myposts/:employer_id
// ดึงประกาศงานทั้งหมดที่สร้างโดย employer_id นั้น
func GetEmployerPosts(c *gin.Context) {
    employerID := c.Param("employer_id")
    var jobposts []entity.Jobpost

    if err := config.DB().
        Preload("Employer").
        Where("employer_id = ?", employerID).
        Find(&jobposts).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": jobposts})
}
