package controller

import (
	"fmt"
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// POST /jobposts
// สร้างประกาศงานใหม่
// func CreateJobPost(c *gin.Context) {
// 	var jobpost entity.Jobpost
// 	if err := c.ShouldBindJSON(&jobpost); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := config.DB().Create(&jobpost).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusCreated, gin.H{"data": jobpost})
// }
// POST /jobposts
func CreateJobPost(c *gin.Context) {
    // ✅ ดึง employerID จาก context ที่ middleware set ไว้
    employerID, ok := c.Get("employerID")
    if !ok {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }

    var jobpost entity.Jobpost
    if err := c.ShouldBindJSON(&jobpost); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // บังคับใช้ employerID จาก JWT
    jobpost.EmployerID = employerID.(uint)

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
	// if err := config.DB().Preload("Employer").Find(&jobposts).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	if err := config.DB().
    Preload("Employer").
	Preload("Employer.User").
    Preload("JobCategory").
    Preload("EmploymentType").
    Preload("SalaryType").
    Find(&jobposts).Error; err != nil {
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

    // ตรวจสอบว่าโพสต์มีอยู่จริงไหม
    var jobpost entity.Jobpost
    if err := config.DB().First(&jobpost, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบโพสต์นี้"})
        return
    }

    // ลบโพสต์
    if err := config.DB().Delete(&jobpost).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ลบโพสต์ไม่สำเร็จ"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "ลบโพสต์เรียบร้อยแล้ว"})
}


// GET /api/employer/myposts
func GetEmployerPosts(c *gin.Context) {
    // userID, exists := c.Get("userID")
	// employerID, exists := c.Get("employerID")
    // if !exists {
    //     c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
    //     return
    // }

    // var employer entity.Employer
    // if err := config.DB().Where("user_id = ?", userID).Preload("User").First(&employer).Error; err != nil {
    //     c.JSON(http.StatusNotFound, gin.H{"error": "Employer not found"})
    //     return
    // }

    // var jobposts []entity.Jobpost
    // if err := config.DB().
    //     Preload("Employer.User").
    //     Where("employer_id = ?", employerID).
    //     Find(&jobposts).Error; err != nil {
    //     c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    //     return
    // }

	// fmt.Println("🔹 userID:", userID)
	// fmt.Println("🔹 employer.ID:", employer.ID)
	// fmt.Println("🔹 employer.user_id:", employer.UserID)
	// fmt.Println("🔹 count jobposts:", len(jobposts))

    // c.JSON(http.StatusOK, gin.H{"data": jobposts})
	// GET /api/employer/myposts

    // ✅ ดึงค่า employerID จาก context โดยตรง
    employerID, ok := c.Get("employerID")
    if !ok {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }

    // ✅ ดึง jobposts ตาม employerID ที่ login อยู่
    var jobposts []entity.Jobpost
    if err := config.DB().
        Preload("Employer.User").
        Where("employer_id = ?", employerID).
        Find(&jobposts).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    fmt.Println("🔹 employerID:", employerID)
    fmt.Println("🔹 count jobposts:", len(jobposts))

    c.JSON(http.StatusOK, gin.H{"data": jobposts})

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


