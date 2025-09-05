package controller

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

type CreateStudentPostRequest struct {
	Title                 string   `json:"title" binding:"required"`
	JobType              string   `json:"job_type" binding:"required"`
	Skills               []string `json:"skills" binding:"required"`  // ✅ รับเป็น array
	Availability         string   `json:"availability" binding:"required"`
	PreferredLocation    string   `json:"preferred_location" binding:"required"`
	ExpectedCompensation string   `json:"expected_compensation"`
	Introduction         string   `json:"introduction"`
	PortfolioURL         string   `json:"portfolio_url"`
	AttachmentURL        string   `json:"attachment_url"`
	AttachmentName       string   `json:"attachment_name"`
	AttachmentType       string   `json:"attachment_type"`
	FacultyID            *uint    `json:"faculty_id"`
	DepartmentID         *uint    `json:"department_id"`
}

type UpdateStudentPostRequest struct {
	Title                 *string   `json:"title"`
	JobType              *string   `json:"job_type"`
	Skills               *[]string `json:"skills"`  // ✅ รับเป็น array pointer
	Availability         *string   `json:"availability"`
	PreferredLocation    *string   `json:"preferred_location"`
	ExpectedCompensation *string   `json:"expected_compensation"`
	Introduction         *string   `json:"introduction"`
	PortfolioURL         *string   `json:"portfolio_url"`
	AttachmentURL        *string   `json:"attachment_url"`
	AttachmentName       *string   `json:"attachment_name"`
	AttachmentType       *string   `json:"attachment_type"`
	Status               *string   `json:"status"`
	FacultyID            *uint     `json:"faculty_id"`
	DepartmentID         *uint     `json:"department_id"`
}

// GET /student-posts - ดูโพสต์ทั้งหมด (Public)
func GetStudentPosts(c *gin.Context) {
	var posts []entity.StudentPost
	
	// Query parameters
	jobType := c.Query("job_type")
	facultyID := c.Query("faculty_id")
	departmentID := c.Query("department_id")
	status := c.Query("status")

	query := config.DB().
		Preload("Student").
		Preload("Faculty").
		Preload("Department").
		Preload("Attachments").
		Preload("Skills")  // ✅ เพิ่ม Preload Skills

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
			"error": "Failed to fetch student posts",
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
		return
	}

	var post entity.StudentPost
	if err := config.DB().
		Preload("Student").
		Preload("Faculty").
		Preload("Department").
		Preload("Attachments").
		Preload("Skills").  // ✅ เพิ่ม Preload Skills
		First(&post, postID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": post})
}

// POST /student-posts - สร้างโพสต์ใหม่ (Protected)
func CreateStudentPost(c *gin.Context) {
	var request CreateStudentPostRequest

	userIDValue, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization required"})
		return
	}

	userID := userIDValue.(uint)

	var student entity.Student
	if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Student profile not found. Please complete your profile first.",
		})
		return
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request data",
			"details": err.Error(),
		})
		return
	}

	// Validate Faculty และ Department
	if request.FacultyID != nil {
		var faculty entity.Faculty
		if err := config.DB().First(&faculty, *request.FacultyID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid faculty ID"})
			return
		}
	}

	if request.DepartmentID != nil {
		var department entity.Department
		if err := config.DB().First(&department, *request.DepartmentID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid department ID"})
			return
		}
	}

	// ✅ ค้นหา/สร้าง Skills
	var skills []entity.Skill
	for _, skillName := range request.Skills {
		skillName = strings.TrimSpace(skillName)
		if skillName == "" {
			continue
		}

		var skill entity.Skill
		result := config.DB().Where("skill_name = ?", skillName).First(&skill)
		if result.Error != nil {
			// สร้าง skill ใหม่ถ้าไม่พบ
			skill = entity.Skill{SkillName: skillName}
			if err := config.DB().Create(&skill).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to create skill: " + skillName,
				})
				return
			}
		}
		skills = append(skills, skill)
	}

	// เริ่ม Transaction
	tx := config.DB().Begin()

	// สร้าง StudentPost
	post := entity.StudentPost{
		Title:                request.Title,
		JobType:             request.JobType,
		Availability:        request.Availability,
		PreferredLocation:   request.PreferredLocation,
		ExpectedCompensation: request.ExpectedCompensation,
		Introduction:        request.Introduction,
		PortfolioURL:        request.PortfolioURL,
		Status:              "active",
		StudentID:           &student.ID,
		FacultyID:          request.FacultyID,
		DepartmentID:       request.DepartmentID,
	}

	if err := tx.Create(&post).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create student post",
		})
		return
	}

	// ✅ เชื่อมโยง Skills กับ Post
	if len(skills) > 0 {
		if err := tx.Model(&post).Association("Skills").Append(skills); err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to associate skills",
			})
			return
		}
	}

	// สร้าง Attachment ถ้ามี
	if request.AttachmentURL != "" {
		attachment := entity.StudentPostAttachment{
			URL:           request.AttachmentURL,
			Name:          request.AttachmentName,
			Type:          request.AttachmentType,
			StudentPostID: post.ID,
		}

		if err := tx.Create(&attachment).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create attachment",
			})
			return
		}
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save post",
		})
		return
	}

	// ดึงข้อมูลที่สร้างแล้วพร้อม relations
	var createdPost entity.StudentPost
	config.DB().
		Preload("Student").
		Preload("Faculty").
		Preload("Department").
		Preload("Attachments").
		Preload("Skills").  // ✅ เพิ่ม Preload Skills
		First(&createdPost, post.ID)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Student post created successfully",
		"data":    createdPost,
	})
}

// PUT /student-posts/:id - อัปเดตโพสต์ (Protected)
func UpdateStudentPost(c *gin.Context) {
	postID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
		return
	}

	userIDValue, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization required"})
		return
	}

	userID := userIDValue.(uint)

	var student entity.Student
	if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found"})
		return
	}

	var existingPost entity.StudentPost
	if err := config.DB().
		Preload("Attachments").
		Preload("Skills").  // ✅ Preload existing skills
		First(&existingPost, postID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	// ตรวจสอบสิทธิ์
	if existingPost.StudentID == nil || *existingPost.StudentID != student.ID {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You can only edit your own posts",
		})
		return
	}

	var request UpdateStudentPostRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	tx := config.DB().Begin()

	// อัปเดตข้อมูลพื้นฐาน
	if request.Title != nil {
		existingPost.Title = *request.Title
	}
	if request.JobType != nil {
		existingPost.JobType = *request.JobType
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
	if request.Status != nil {
		existingPost.Status = *request.Status
	}
	if request.FacultyID != nil {
		existingPost.FacultyID = request.FacultyID
	}
	if request.DepartmentID != nil {
		existingPost.DepartmentID = request.DepartmentID
	}

	if err := tx.Save(&existingPost).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
		return
	}

	// ✅ อัปเดต Skills ถ้ามีการส่งมา
	if request.Skills != nil {
		// ลบ skills เดิมทั้งหมด
		if err := tx.Model(&existingPost).Association("Skills").Clear(); err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to clear existing skills",
			})
			return
		}

		// เพิ่ม skills ใหม่
		var newSkills []entity.Skill
		for _, skillName := range *request.Skills {
			skillName = strings.TrimSpace(skillName)
			if skillName == "" {
				continue
			}

			var skill entity.Skill
			result := tx.Where("skill_name = ?", skillName).First(&skill)
			if result.Error != nil {
				// สร้าง skill ใหม่ถ้าไม่พบ
				skill = entity.Skill{SkillName: skillName}
				if err := tx.Create(&skill).Error; err != nil {
					tx.Rollback()
					c.JSON(http.StatusInternalServerError, gin.H{
						"error": "Failed to create skill: " + skillName,
					})
					return
				}
			}
			newSkills = append(newSkills, skill)
		}

		if len(newSkills) > 0 {
			if err := tx.Model(&existingPost).Association("Skills").Append(newSkills); err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to associate new skills",
				})
				return
			}
		}
	}

	// จัดการ Attachment ใหม่
	if request.AttachmentURL != nil {
		// ลบ attachment เดิม
		if err := tx.Where("student_post_id = ?", existingPost.ID).Delete(&entity.StudentPostAttachment{}).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to update attachments",
			})
			return
		}

		// เพิ่ม attachment ใหม่ (ถ้า URL ไม่ว่าง)
		if *request.AttachmentURL != "" {
			attachment := entity.StudentPostAttachment{
				URL:           *request.AttachmentURL,
				Name:          *request.AttachmentName,
				Type:          *request.AttachmentType,
				StudentPostID: existingPost.ID,
			}

			if err := tx.Create(&attachment).Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to create new attachment",
				})
				return
			}
		}
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update post",
		})
		return
	}

	// ดึงข้อมูลที่อัปเดตแล้วพร้อม relations
	var updatedPost entity.StudentPost
	config.DB().
		Preload("Student").
		Preload("Faculty").
		Preload("Department").
		Preload("Attachments").
		Preload("Skills").  // ✅ เพิ่ม Preload Skills
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
		return
	}

	userIDValue, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization required"})
		return
	}

	userID := userIDValue.(uint)

	var student entity.Student
	if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found"})
		return
	}

	var post entity.StudentPost
	if err := config.DB().First(&post, postID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	// ตรวจสอบสิทธิ์
	if post.StudentID == nil || *post.StudentID != student.ID {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You can only delete your own posts",
		})
		return
	}

	tx := config.DB().Begin()

	// ลบ skills associations
	if err := tx.Model(&post).Association("Skills").Clear(); err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to clear skills associations",
		})
		return
	}

	// ลบ attachments
	if err := tx.Where("student_post_id = ?", post.ID).Delete(&entity.StudentPostAttachment{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete attachments",
		})
		return
	}

	// ลบโพสต์
	if err := tx.Delete(&post).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete post",
		})
		return
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete post",
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
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization required"})
		return
	}

	userID := userIDValue.(uint)

	var student entity.Student
	if err := config.DB().Where("user_id = ?", userID).First(&student).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found"})
		return
	}

	var posts []entity.StudentPost
	if err := config.DB().
		Preload("Faculty").
		Preload("Department").
		Preload("Attachments").
		Preload("Skills").  // ✅ เพิ่ม Preload Skills
		Where("student_id = ?", student.ID).
		Order("created_at DESC").
		Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch your posts",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  posts,
		"count": len(posts),
	})
}
