package entity

import (
	"gorm.io/gorm"
)

// Skill struct สำหรับ skills table
type Skill struct {
	gorm.Model
	SkillName string `gorm:"size:100;uniqueIndex;not null" json:"skill_name"`
}

// SkillRequest struct สำหรับรับข้อมูลจาก API
type SkillRequest struct {
	SkillName string `json:"skill_name" binding:"required,min=2,max=100"`
}

// SkillResponse struct สำหรับส่งข้อมูลกลับ
type SkillResponse struct {
	ID        uint   `json:"id"`
	SkillName string `json:"name"`
}
