// backend/entity/comment.go
package entity

import (
	"gorm.io/gorm"
)

// Comment represents the Comment entity
type Comment struct {
	gorm.Model // Provides ID, CreatedAt, UpdatedAt, DeletedAt

	Text     string `json:"text"`
	Author   string `json:"author"`
	AuthorID string `json:"authorId"`
	Likes    int    `json:"likes"`
	IsLiked  bool   `json:"isLiked"`

	// Foreign Key to link with JobPosting
	JobPostingID uint `json:"jobPostingId"`
}