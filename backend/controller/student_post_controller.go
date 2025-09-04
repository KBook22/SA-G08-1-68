// backend/controller/student_post_controller.go
package controller

import (
    "net/http"
    "strconv"
    "github.com/KBook22/System-Analysis-and-Design/config"
    "github.com/KBook22/System-Analysis-and-Design/entity"
    "github.com/gin-gonic/gin"
)

// CreateStudentPostRequest struct สำหรับรับข้อมูล
type CreateStudentPostRequest struct {
    Title                 string `json:"title" binding:"required"`
    JobType              string `json:"job_type" binding:"required"`
    Skills               string `json:"skills" binding:"required"`
    Availability         string `json:"availability" binding:"required"`
    PreferredLocation    string `json:"preferred_location" binding:"required"`
    ExpectedCompensation string `json:"expected_compensation"`
    Introduction         string `json:"introduction"`
    PortfolioURL         string `json:"portfolio_url"`
    // ✅ เพิ่มฟิลด์สำหรับไฟล์แนบ
    AttachmentURL        string `json:"attachment_url"`
    AttachmentName       string `json:"attachment_name"`
    AttachmentType       string `json:"attachment_type"`
    FacultyID           *uint  `json:"faculty_id"`
    DepartmentID        *uint  `json:"department_id"`
}

// UpdateStudentPostRequest struct สำหรับอัปเดต
type UpdateStudentPostRequest struct {
    Title                 *string `json:"title"`
    JobType              *string `json:"job_type"`
    Skills               *string `json:"skills"`
    Availability         *string `json:"availability"`
    PreferredLocation    *string `json:"preferred_location"`
    ExpectedCompensation *string `json:"expected_compensation"`
    Introduction         *string `json:"introduction"`
    PortfolioURL         *string `json:"portfolio_url"`
    // ✅ เพิ่มฟิลด์สำหรับไฟล์แนบ
    AttachmentURL        *string `json:"attachment_url"`
    AttachmentName       *string `json:"attachment_name"`
    AttachmentType       *string `json:"attachment_type"`
    Status               *string `json:"status"`
    FacultyID           *uint   `json:"faculty_id"`
    DepartmentID        *uint   `json:"department_id"`
}

// GET /student-posts - ดูโพสต์ทั้งหมด (Public)
func GetStudentPosts(c *gin.Context) {
    var posts []entity.StudentPost
    
    // Query parameters สำหรับ filter
    jobType := c.Query("job_type")
    facultyID := c.Query("faculty_id")
    departmentID := c.Query("department_id")
    status := c.Query("status")
    
    query := config.DB().
        Preload("Student").
        Preload("Faculty").
        Preload("Department")
    
    // Default status filter
    if status == "" {
        query = query.Where("status = ?", "active")
    } else {
        query = query.Where("status = ?", status)
    }
    
    // Apply additional filters
    if jobType != "" {
        query = query.Where("job_type = ?", jobType)
    }
    
    if facultyID != "" {
        query = query.Where("faculty_id = ?", facultyID)
    }
    
    if departmentID != "" {
        query = query.Where("department_id = ?", departmentID)
    }
    
    if err := query.Order("created_at DESC").Find(&posts).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error":   "Failed to fetch student posts",
            "details": err.Error(),
        })
        return
    }
    
    c.JSON(http.StatusOK, gin.H{
        "data":  posts,
        "count": len(posts),
    })
}

// GET /student-posts/:id - ดูโพสต์โดย ID (Public)
func GetStudentPostByID(c *gin.Context) {
    postID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid post ID",
        })
        return
    }
    
    var post entity.StudentPost
    if err := config.DB().
        Preload("Student").
        Preload("Faculty").
        Preload("Department").
        First(&post, postID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Post not found",
        })
        return
    }
    
    c.JSON(http.StatusOK, gin.H{
        "data": post,
    })
}

// POST /student-posts - สร้างโพสต์ใหม่ (Protected)
func CreateStudentPost(c *gin.Context) {
    var request CreateStudentPostRequest
    
    // ดึง userID จาก middleware
    userIDValue, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{
            "error": "Authorization required",
        })
        return
    }
    
    userID, ok := userIDValue.(uint)
    if !ok {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Invalid user ID format",
        })
        return
    }
    
    // หา Student profile
    var student entity.Student
    if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Student profile not found. Please complete your profile first.",
        })
        return
    }
    
    // Bind request data
    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error":   "Invalid request data",
            "details": err.Error(),
        })
        return
    }
    
    // Validate Faculty และ Department ถ้ามี
    if request.FacultyID != nil {
        var faculty entity.Faculty
        if err := config.DB().First(&faculty, *request.FacultyID).Error; err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "Invalid faculty ID",
            })
            return
        }
    }
    
    if request.DepartmentID != nil {
        var department entity.Department
        if err := config.DB().First(&department, *request.DepartmentID).Error; err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "Invalid department ID",
            })
            return
        }
    }
    
    // สร้าง StudentPost
    post := entity.StudentPost{
        Title:                 request.Title,
        JobType:              request.JobType,
        Skills:               request.Skills,
        Availability:         request.Availability,
        PreferredLocation:    request.PreferredLocation,
        ExpectedCompensation: request.ExpectedCompensation,
        Introduction:         request.Introduction,
        PortfolioURL:         request.PortfolioURL,
        // ✅ เพิ่มข้อมูลไฟล์แนบ
        AttachmentURL:        request.AttachmentURL,
        AttachmentName:       request.AttachmentName,
        AttachmentType:       request.AttachmentType,
        Status:               "active",
        StudentID:           &student.ID,
        FacultyID:           request.FacultyID,
        DepartmentID:        request.DepartmentID,
    }
    
    // บันทึกลงฐานข้อมูล
    if err := config.DB().Create(&post).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error":   "Failed to create student post",
            "details": err.Error(),
        })
        return
    }
    
    // ดึงข้อมูลที่สร้างแล้วพร้อม relations
    var createdPost entity.StudentPost
    if err := config.DB().
        Preload("Student").
        Preload("Faculty").
        Preload("Department").
        First(&createdPost, post.ID).Error; err != nil {
        // ถ้า preload ไม่สำเร็จ ก็ส่งข้อมูลพื้นฐาน
        c.JSON(http.StatusCreated, gin.H{
            "message": "Student post created successfully",
            "data":    post,
        })
        return
    }
    
    c.JSON(http.StatusCreated, gin.H{
        "message": "Student post created successfully",
        "data":    createdPost,
    })
}

// PUT /student-posts/:id - อัปเดตโพสต์ (Protected)
func UpdateStudentPost(c *gin.Context) {
    postID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid post ID",
        })
        return
    }
    
    // ตรวจสอบ authorization
    userIDValue, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{
            "error": "Authorization required",
        })
        return
    }
    
    userID := userIDValue.(uint)
    
    // หา Student profile
    var student entity.Student
    if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Student profile not found",
        })
        return
    }
    
    // หาโพสต์ที่ต้องการแก้ไข
    var existingPost entity.StudentPost
    if err := config.DB().First(&existingPost, postID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Post not found",
        })
        return
    }
    
    // ตรวจสอบสิทธิ์ (เฉพาะเจ้าของโพสต์)
    if existingPost.StudentID == nil || *existingPost.StudentID != student.ID {
        c.JSON(http.StatusForbidden, gin.H{
            "error": "You can only edit your own posts",
        })
        return
    }
    
    // Bind update data
    var request UpdateStudentPostRequest
    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error":   "Invalid request data",
            "details": err.Error(),
        })
        return
    }
    
    // อัปเดตเฉพาะฟิลด์ที่ส่งมา
    if request.Title != nil {
        existingPost.Title = *request.Title
    }
    
    if request.JobType != nil {
        existingPost.JobType = *request.JobType
    }
    
    if request.Skills != nil {
        existingPost.Skills = *request.Skills
    }
    
    if request.Availability != nil {
        existingPost.Availability = *request.Availability
    }
    
    if request.PreferredLocation != nil {
        existingPost.PreferredLocation = *request.PreferredLocation
    }
    
    if request.ExpectedCompensation != nil {
        existingPost.ExpectedCompensation = *request.ExpectedCompensation
    }
    
    if request.Introduction != nil {
        existingPost.Introduction = *request.Introduction
    }
    
    if request.PortfolioURL != nil {
        existingPost.PortfolioURL = *request.PortfolioURL
    }
    
    // ✅ อัปเดตข้อมูลไฟล์แนบ
    if request.AttachmentURL != nil {
        existingPost.AttachmentURL = *request.AttachmentURL
    }
    
    if request.AttachmentName != nil {
        existingPost.AttachmentName = *request.AttachmentName
    }
    
    if request.AttachmentType != nil {
        existingPost.AttachmentType = *request.AttachmentType
    }
    
    if request.Status != nil {
        existingPost.Status = *request.Status
    }
    
    if request.FacultyID != nil {
        existingPost.FacultyID = request.FacultyID
    }
    
    if request.DepartmentID != nil {
        existingPost.DepartmentID = request.DepartmentID
    }
    
    // บันทึกการเปลี่ยนแปลง
    if err := config.DB().Save(&existingPost).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error":   "Failed to update post",
            "details": err.Error(),
        })
        return
    }
    
    // ดึงข้อมูลที่อัปเดตแล้วพร้อม relations
    var updatedPost entity.StudentPost
    config.DB().
        Preload("Student").
        Preload("Faculty").
        Preload("Department").
        First(&updatedPost, existingPost.ID)
        
    c.JSON(http.StatusOK, gin.H{
        "message": "Post updated successfully",
        "data":    updatedPost,
    })
}

// DELETE /student-posts/:id - ลบโพสต์ (Protected)
func DeleteStudentPost(c *gin.Context) {
    postID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid post ID",
        })
        return
    }
    
    // ตรวจสอบ authorization
    userIDValue, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{
            "error": "Authorization required",
        })
        return
    }
    
    userID := userIDValue.(uint)
    
    // หา Student profile
    var student entity.Student
    if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Student profile not found",
        })
        return
    }
    
    // หาโพสต์ที่ต้องการลบ
    var post entity.StudentPost
    if err := config.DB().First(&post, postID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Post not found",
        })
        return
    }
    
    // ตรวจสอบสิทธิ์ (เฉพาะเจ้าของโพสต์)
    if post.StudentID == nil || *post.StudentID != student.ID {
        c.JSON(http.StatusForbidden, gin.H{
            "error": "You can only delete your own posts",
        })
        return
    }
    
    // ลบโพสต์ (Soft Delete เนื่องจากใช้ gorm.Model)
    if err := config.DB().Delete(&post).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error":   "Failed to delete post",
            "details": err.Error(),
        })
        return
    }
    
    c.JSON(http.StatusOK, gin.H{
        "message": "Post deleted successfully",
    })
}

// GET /my-posts - ดูโพสต์ของตัวเอง (Protected)
func GetMyStudentPosts(c *gin.Context) {
    userIDValue, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{
            "error": "Authorization required",
        })
        return
    }
    
    userID := userIDValue.(uint)
    
    // หา Student profile
    var student entity.Student
    if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Student profile not found",
        })
        return
    }
    
    // ดึงโพสต์ของ student นี้
    var posts []entity.StudentPost
    if err := config.DB().
        Preload("Faculty").
        Preload("Department").
        Where("student_id = ?", student.ID).
        Order("created_at DESC").
        Find(&posts).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error":   "Failed to fetch your posts",
            "details": err.Error(),
        })
        return
    }
    
    c.JSON(http.StatusOK, gin.H{
        "data":  posts,
        "count": len(posts),
    })
}
