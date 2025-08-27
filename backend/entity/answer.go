// backend/entity/answer.go
package entity

import "gorm.io/gorm"

// Answer represents the Answer entity
type Answer struct {
	gorm.Model // Use gorm.Model for standard fields

	// Assuming UserID is a string for now.
	UserID string `json:"user_id"`
	// User     User   `gorm:"foreignKey:UserID"`

	Text string `json:"answer_text"` // Renamed to avoid conflict with struct name

	// Foreign key to Question
	QuestionID uint `json:"question_id"`
}