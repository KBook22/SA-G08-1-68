package entity

import (
	"time"
	"gorm.io/gorm"
)

// Comment represents the Comment entity
type Comment struct {
	gorm.Model

	IDComment         string    `gorm:"primaryKey;column:ID_Comment"`
	IDPost            string    `gorm:"column:ID_Post"`
	JobPosting        JobPosting `gorm:"foreignKey:IDPost"`
	UserID            string    `gorm:"column:Usr_ID"`
	User              User      `gorm:"foreignKey:UserID"`
	CommentDate       time.Time `gorm:"column:Comment_Date"`
	DescriptionComment string `gorm:"column:Description_Comment"`
}