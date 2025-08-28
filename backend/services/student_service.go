package services

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
)

// GetStudentProfileByUserID ค้นหาโปรไฟล์นักศึกษาจาก User ID
func GetStudentProfileByUserID(userID uint) (*entity.Student, error) {
	var studentProfile entity.Student
	// ใช้ .Preload("User") เพื่อดึงข้อมูลจากตาราง User มาด้วย (เช่น username)
	if err := config.DB.Preload("User").Where("user_id = ?", userID).First(&studentProfile).Error; err != nil {
		return nil, err
	}
	return &studentProfile, nil
}