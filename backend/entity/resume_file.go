package entity

import (
	"time"
	"gorm.io/gorm"
)

type ResumeFile struct {
	gorm.Model
	Filename        string          `gorm:"type:varchar(100);not null" json:"filename"`
	UploadedDate    time.Time       `gorm:"not null" json:"uploaded_date"`
	

	//FK
	JobApplicationID uint           `gorm:"not null" json:"job_application_id"`
	JobApplication   JobApplication `gorm:"foreignKey:JobApplicationID" json:"job_application"`
	//	ลบ student ออกนะทุกคนมันไม่ได้เชื่อมตามความเป็นจริงอยากออกแบบให้เชื่อมกับ jobappมากกว่า

}