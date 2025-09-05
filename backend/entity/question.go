// backend/entity/question.go
package entity

import "gorm.io/gorm"

// Question represents a simplified FAQ entry
type Question struct {
	gorm.Model
}
