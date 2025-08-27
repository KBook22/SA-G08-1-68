package entity

import (
	"gorm.io/gorm"
)

// StudentProfilePost dùng để lưu thông tin bài đăng tìm việc của sinh viên
type StudentProfilePost struct {
	gorm.Model

	// --- ข้อมูลที่เกี่ยวกับโพสต์โดยตรง ---
	Introduction string `gorm:"type:text;not null" json:"introduction"`
	JobType      string `gorm:"type:varchar(100);not null" json:"job_type"`
	PortfolioURL string `gorm:"type:varchar(255)" json:"portfolio_url"`
	Skills       string `gorm:"type:text;not null" json:"skills"`
	Status       string `gorm:"type:varchar(50);default:'active'" json:"status"`

	// --- Foreign Key: สำหรับเชื่อมโยงไปยังโปรไฟล์นักศึกษา ---
	StudentID uint    `gorm:"not null" json:"student_id"`
	Student   Student `gorm:"foreignKey:StudentID" json:"student"`
}