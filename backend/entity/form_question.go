// backend/entity/form_question.go
package entity

import (
	"time"
	"gorm.io/gorm"
)

// FormQuestion represents the entity for user-submitted requests/complaints
type FormQuestion struct {
	gorm.Model // Provides ID, CreatedAt, UpdatedAt, DeletedAt automatically

	// Fields from the form
	Name        string `json:"name"`
	Lastname    string `json:"lastname"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	ContactType string `json:"contact_type"`
	Title       string `json:"title"`
	Details     string `json:"details"`

	// Server-side fields
	UserID      string    `json:"userId"` // Placeholder for logged-in user ID
	Status      string    `gorm:"default:'pending'" json:"status"`
	SubmittedAt time.Time `json:"submittedAt"`
}