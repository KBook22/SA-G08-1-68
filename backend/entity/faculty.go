package entity

import (
	"gorm.io/gorm"
)

// Faculty struct สำหรับคณะ
type Faculty struct {
	gorm.Model
	Name        string       `gorm:"uniqueIndex;size:255;not null" json:"name"`
	Departments []Department `gorm:"foreignKey:FacultyID;constraint:OnDelete:CASCADE" json:"departments,omitempty"`
}

// FacultyResponse struct สำหรับส่งข้อมูลกลับ
type FacultyResponse struct {
	ID          uint                   `json:"id"`
	Name        string                 `json:"name"`
	Departments []DepartmentResponse   `json:"departments,omitempty"`
}
