// backend/entity/student_post.go
package entity

import (
	"gorm.io/gorm"
)

// StudentPost ใช้สำหรับเก็บโพสต์ทั่วไปของนักศึกษา
type StudentPost struct {
	gorm.Model
	Content   string  `gorm:"type:text"`
	ImageURL  string  `gorm:"type:varchar(255)"`
	FileUrl   string  `gorm:"type:varchar(255)"`

	// Foreign Key
	StudentID *uint
	Student   Student `gorm:"references:ID"`
}