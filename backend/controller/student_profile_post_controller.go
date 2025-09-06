// package controller

// import (
// 	"net/http"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/gin-gonic/gin"
// )

// // GET /student-profile-posts
// func GetStudentProfilePosts(c *gin.Context) {
// 	var posts []entity.StudentProfilePost
// 	if err := config.DB().Preload("Student").Find(&posts).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": posts})
// }

// // POST /student-profile-posts
// func CreateStudentProfilePost(c *gin.Context) {
// 	var post entity.StudentProfilePost

// 	// 1. ดึงข้อมูล student_id จาก context ที่ผ่าน middleware มา
// 	studentIDValue, ok := c.Get("student_id")
// 	if !ok {
// 		// ถ้าไม่เจอ student_id ใน context ให้ส่ง error กลับไป
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization error: Student ID not found"})
// 		return
// 	}

// 	// 2. ตรวจสอบและแปลง (Assert) type ของ student_id ให้เป็น uint
// 	studentID, ok := studentIDValue.(uint)
// 	if !ok {
// 		// ถ้าแปลง type ไม่สำเร็จ ให้ส่ง error
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid student ID type in context"})
// 		return
// 	}

// 	// 3. Bind JSON body ที่ส่งมาจาก frontend (เช่น topic, content)
// 	if err := c.ShouldBindJSON(&post); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// 4. นำ studentID ที่ได้จาก context มาใส่ใน object ที่จะบันทึกลง DB
// 	post.StudentID = studentID

// 	// 5. บันทึกข้อมูลลง Database
// 	if err := config.DB().Create(&post).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student post", "details": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"data": post})
// }

// backend/controller/student_profile_post_controller.go
// package controller

// import (
// 	"net/http"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/gin-gonic/gin"
// )

// // GET /student-profile-posts
// func GetStudentProfilePosts(c *gin.Context) {
// 	var posts []entity.StudentProfilePost
// 	if err := config.DB().Preload("Student").Find(&posts).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": posts})
// }

// // POST /student-profile-posts
// func CreateStudentProfilePost(c *gin.Context) {
// 	var post entity.StudentProfilePost

// 	// 1. ดึงข้อมูล user_id จาก context ที่ผ่าน middleware มา
// 	//    (แก้ไขจาก "student_id" เป็น "userID" ให้ตรงกับใน middleware)
// 	studentIDValue, ok := c.Get("userID")
// 	if !ok {
// 		// ถ้าไม่เจอ userID ใน context ให้ส่ง error กลับไป
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization error: User ID not found in context"})
// 		return
// 	}

// 	// 2. ตรวจสอบและแปลง (Assert) type ของ userID ให้เป็น uint
// 	studentID, ok := studentIDValue.(uint)
// 	if !ok {
// 		// ถ้าแปลง type ไม่สำเร็จ ให้ส่ง error
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID type in context"})
// 		return
// 	}

// 	// 3. Bind JSON body ที่ส่งมาจาก frontend (เช่น introduction, job_type)
// 	if err := c.ShouldBindJSON(&post); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// 4. นำ studentID ที่ได้จาก context มาใส่ใน object ที่จะบันทึกลง DB
// 	post.StudentID = studentID

// 	// 5. บันทึกข้อมูลลง Database
// 	if err := config.DB().Create(&post).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student post", "details": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"data": post})
// }

// backend/controller/student_profile_post_controller.go
// package controller

// import (
// 	"net/http"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/gin-gonic/gin"
// )

// // GET /student-profile-posts
// func GetStudentProfilePosts(c *gin.Context) {
// 	var posts []entity.StudentProfilePost
// 	// Preload("Student") คือคำสั่งสำคัญที่ดึงข้อมูลนักศึกษามาด้วย
// 	if err := config.DB().Preload("Student").Find(&posts).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": posts})
// }

// // POST /student-profile-posts
// func CreateStudentProfilePost(c *gin.Context) {
// 	var post entity.StudentProfilePost

// 	studentIDValue, ok := c.Get("userID")
// 	if !ok {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization error: User ID not found in context"})
// 		return
// 	}

// 	studentID, ok := studentIDValue.(uint)
// 	if !ok {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID type in context"})
// 		return
// 	}

// 	if err := c.ShouldBindJSON(&post); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// --- vvvv START CODE CHANGE vvvv ---
// 	// ✨ จุดแก้ไข: ใส่เครื่องหมาย & ข้างหน้า studentID ✨
// 	// เพื่อแปลงจาก uint ให้เป็น *uint (pointer to uint)
// 	post.StudentID = &studentID
// 	// --- ^^^^ END CODE CHANGE ^^^^ ---

// 	if err := config.DB().Create(&post).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student post", "details": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"data": post})
// }

// backend/controller/student_profile_post_controller.go
// backend/controller/student_profile_post_controller.go
// backend/controller/student_profile_post_controller.go
// backend/controllers/student_profile_post_controller.go
// backend/controllers/student_profile_post_controller.go
// backend/controllers/student_profile_post_controller.go
// backend/controllers/student_profile_post_controller.go
package controller

import (
    "fmt"
    "net/http"
    "strconv"
    "github.com/KBook22/System-Analysis-and-Design/config"
    "github.com/KBook22/System-Analysis-and-Design/entity"
    "github.com/gin-gonic/gin"
)

// GET /student-profile-posts
func GetStudentProfilePosts(c *gin.Context) {
    var posts []entity.StudentProfilePost
    
    if err := config.DB().
        Preload("Student").
        Preload("Faculty").
        Preload("Department").
        Order("created_at desc").
        Find(&posts).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{"data": posts})
}

// POST /student-profile-posts
func CreateStudentProfilePost(c *gin.Context) {
    var post entity.StudentProfilePost
    
    // ดึง userID จาก middleware
    userIDValue, ok := c.Get("userID")
    if !ok {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization error: User ID not found"})
        return
    }
    
    userID, ok := userIDValue.(uint)
    if !ok {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID type"})
        return
    }
    
    // หา Student ID จาก User ID
    var student entity.Student
    if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
        fmt.Printf("Error finding student with user_id %d: %v\n", userID, err)
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Student profile not found. Please complete your profile first.",
            "details": fmt.Sprintf("No student found with user_id: %d", userID),
        })
        return
    }
    
    // Bind JSON data
    if err := c.ShouldBindJSON(&post); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    // ✅ Validation ข้อมูลใหม่
    if post.Title == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
        return
    }
    if post.JobType == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Job type is required"})
        return
    }
    if post.Skills == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Skills are required"})
        return
    }
    if post.Availability == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Availability is required"})
        return
    }
    if post.PreferredLocation == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Preferred location is required"})
        return
    }
    
    
    // ใส่ StudentID และ Status
    post.StudentID = &student.ID
    post.Status = "active"
    
    // บันทึกลงฐานข้อมูล
    if err := config.DB().Create(&post).Error; err != nil {
        fmt.Printf("Error creating post: %v\n", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student post", "details": err.Error()})
        return
    }
    
    // ดึงข้อมูลกลับมาพร้อม relations
    var createdPost entity.StudentProfilePost
    if err := config.DB().
        Preload("Student").
        Preload("Faculty").
        Preload("Department").
        First(&createdPost, post.ID).Error; err != nil {
        c.JSON(http.StatusCreated, gin.H{"data": post})
        return
    }
    
    c.JSON(http.StatusCreated, gin.H{"data": createdPost})
}

// PUT /student-profile-posts/:id
func UpdateStudentProfilePost(c *gin.Context) {
    postID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
        return
    }
    
    userIDValue, ok := c.Get("userID")
    if !ok {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not identified"})
        return
    }
    
    userID, ok := userIDValue.(uint)
    if !ok {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
        return
    }
    
    // หา student ของ user ปัจจุบัน
    var student entity.Student
    if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found"})
        return
    }
    
    // หาโพสต์ที่ต้องการแก้ไข
    var existingPost entity.StudentProfilePost
    if err := config.DB().First(&existingPost, postID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
        return
    }
    
    // ตรวจสอบเจ้าของโพสต์
    if existingPost.StudentID == nil || *existingPost.StudentID != student.ID {
        c.JSON(http.StatusForbidden, gin.H{"error": "You can only edit your own posts"})
        return
    }
    
    // รับข้อมูลใหม่
    var updateData struct {
        Title                string `json:"title"`
        JobType             string `json:"job_type"`
        Skills              string `json:"skills"`
        Availability        string `json:"availability"`
        PreferredLocation   string `json:"preferred_location"`
        ExpectedCompensation string `json:"expected_compensation"`
        Content             string `json:"content"`
        Introduction        string `json:"introduction"`
        PortfolioURL        string `json:"portfolio_url"`
    }
    
    if err := c.ShouldBindJSON(&updateData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    // อัปเดตข้อมูล
    existingPost.Title = updateData.Title
    existingPost.JobType = updateData.JobType
    existingPost.Skills = updateData.Skills
    existingPost.Availability = updateData.Availability
    existingPost.PreferredLocation = updateData.PreferredLocation
    existingPost.ExpectedCompensation = updateData.ExpectedCompensation
   
    existingPost.Introduction = updateData.Introduction
    existingPost.PortfolioURL = updateData.PortfolioURL
    
    if err := config.DB().Save(&existingPost).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
        return
    }
    
    // ดึงข้อมูลที่อัปเดตแล้ว
    var updatedPost entity.StudentProfilePost
    if err := config.DB().
        Preload("Student").
        Preload("Faculty").
        Preload("Department").
        First(&updatedPost, postID).Error; err != nil {
        c.JSON(http.StatusOK, gin.H{"data": existingPost})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{"data": updatedPost})
}

// DELETE /student-profile-posts/:id
func DeleteStudentProfilePost(c *gin.Context) {
    postID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
        return
    }
    
    userIDValue, ok := c.Get("userID")
    if !ok {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not identified"})
        return
    }
    
    userID, ok := userIDValue.(uint)
    if !ok {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
        return
    }
    
    // หา student ของ user ปัจจุบัน
    var student entity.Student
    if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found"})
        return
    }
    
    // หาโพสต์ที่ต้องการลบ
    var existingPost entity.StudentProfilePost
    if err := config.DB().First(&existingPost, postID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
        return
    }
    
    // ตรวจสอบเจ้าของโพสต์
    if existingPost.StudentID == nil || *existingPost.StudentID != student.ID {
        c.JSON(http.StatusForbidden, gin.H{"error": "You can only delete your own posts"})
        return
    }
    
    // ลบโพสต์
    if err := config.DB().Delete(&existingPost).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete post"})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{
        "message": "Post deleted successfully",
        "post_id": postID,
    })
}
