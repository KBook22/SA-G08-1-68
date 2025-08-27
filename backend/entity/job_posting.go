// backend/entity/job_posting.go
package entity

import (
	"gorm.io/gorm"
)

// JobPosting represents the JobPosting entity
type JobPosting struct {
	gorm.Model // Provides ID, CreatedAt, UpdatedAt, DeletedAt

	Author     string `json:"author"`
	AuthorID   string `json:"authorId"`
	Content    string `gorm:"column:Description" json:"content"` // Ensure frontend `content` maps to `Description` column
	Skills     string `json:"skills"`                           // Stored as a JSON string
	Image      string `json:"imageUrl"`
	ResumeFile string `json:"fileName"`
	Likes      int    `json:"likes"`
	IsLiked    bool   `json:"isLiked"`
	Privacy    string `json:"privacy"`
	UserID     string `gorm:"column:User_ID" json:"userId"` // Use userId consistently

	// Define the relationship to User. It seems UserID is a string like 'johndoe' not a foreign key to users.id
	// If UserID should be a foreign key to the users table, its type should be uint.
	// User     User      `gorm:"foreignKey:UserID"`

	// Correctly define the one-to-many relationship with Comment
	Comments []Comment `gorm:"foreignKey:JobPostingID" json:"Comments"`
}