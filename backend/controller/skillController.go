package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// GetSkills ดึงรายการทักษะทั้งหมด
func GetSkills(c *gin.Context) {
	search := c.Query("search")

	var skills []entity.Skill
	query := config.DB()

	if search != "" {
		query = query.Where("skill_name LIKE ?", "%"+search+"%")
	}

	query = query.Order("skill_name ASC")

	if err := query.Find(&skills).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch skills",
			"message": err.Error(),
		})
		return
	}

	var response []entity.SkillResponse
	for _, skill := range skills {
		response = append(response, entity.SkillResponse{
			ID:        skill.ID,
			SkillName: skill.SkillName,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    response,
		"count":   len(response),
	})
}

// CreateSkill เพิ่มทักษะใหม่
func CreateSkill(c *gin.Context) {
	var req entity.SkillRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid input",
			"message": err.Error(),
		})
		return
	}

	skillName := strings.TrimSpace(req.SkillName)
	if skillName == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Skill name cannot be empty",
		})
		return
	}

	// ตรวจสอบว่ามีทักษะนี้อยู่แล้วหรือไม่
	var existingSkill entity.Skill
	if err := config.DB().Where("LOWER(skill_name) = LOWER(?)", skillName).First(&existingSkill).Error; err == nil {
		// มีอยู่แล้ว ส่งกลับ ID เดิม
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Skill already exists",
			"data": gin.H{
				"id":     existingSkill.ID,
				"name":   existingSkill.SkillName,
				"is_new": false,
			},
		})
		return
	}

	// เพิ่มทักษะใหม่
	newSkill := entity.Skill{
		SkillName: skillName,
	}

	if err := config.DB().Create(&newSkill).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to create skill",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Skill created successfully",
		"data": gin.H{
			"id":     newSkill.ID,
			"name":   newSkill.SkillName,
			"is_new": true,
		},
	})
}

// GetSkillByID ดึงทักษะตาม ID
func GetSkillByID(c *gin.Context) {
	id := c.Param("id")

	var skill entity.Skill
	if err := config.DB().First(&skill, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Skill not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": entity.SkillResponse{
			ID:        skill.ID,
			SkillName: skill.SkillName,
		},
	})
}

// SearchSkills ค้นหาทักษะ (สำหรับ autocomplete)
func SearchSkills(c *gin.Context) {
	search := c.Query("q")
	limitStr := c.DefaultQuery("limit", "20")

	if search == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Search query is required",
		})
		return
	}

	limit, err := strconv.Atoi(limitStr)
	if err != nil {
		limit = 20
	}

	var skills []entity.Skill

	// ✅ แก้ไข: ใช้ Raw SQL แทน Order() ที่มี arguments
	orderSQL := fmt.Sprintf("CASE WHEN skill_name LIKE '%s%%' THEN 1 ELSE 2 END, skill_name ASC", search)

	if err := config.DB().
		Where("skill_name LIKE ?", "%"+search+"%").
		Order(orderSQL).
		Limit(limit).
		Find(&skills).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to search skills",
		})
		return
	}

	var response []entity.SkillResponse
	for _, skill := range skills {
		response = append(response, entity.SkillResponse{
			ID:        skill.ID,
			SkillName: skill.SkillName,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    response,
		"count":   len(response),
	})
}
