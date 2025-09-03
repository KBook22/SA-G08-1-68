package entity

import (
	"gorm.io/gorm"
)

// Department struct สำหรับสาขาวิชา
type Department struct {
	gorm.Model
	Name      string   `gorm:"size:255;not null" json:"name"`
	FacultyID *uint    `gorm:"not null" json:"faculty_id"`
	Faculty   *Faculty `gorm:"constraint:OnDelete:CASCADE" json:"faculty,omitempty"`
}

// DepartmentResponse struct สำหรับส่งข้อมูลกลับ
type DepartmentResponse struct {
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	FacultyID uint   `json:"faculty_id"`
}
