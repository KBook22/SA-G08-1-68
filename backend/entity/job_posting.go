package entity

import (
	"time"
	"gorm.io/gorm"
)
// JobPosting represents the Job Posting entity
type JobPosting struct {
	gorm.Model

	IDPost       string    `gorm:"primaryKey;column:ID_Post"`
	UserID       string    `gorm:"column:User_ID"`
	User         User      `gorm:"foreignKey:UserID"`
	Description  string    `gorm:"column:Description"`
	Image        string    `gorm:"column:Image"`
	ResumeFile   string    `gorm:"column:ResumeFile"`
	PostDate     time.Time `gorm:"column:PostDate"`
	
	Comments     []Comment `gorm:"foreignKey:IDPost"`
}