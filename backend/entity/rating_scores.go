package entity

import "gorm.io/gorm"

type Ratingscores struct {
	gorm.Model
	Ratingscorename		string 	`json:"rating_score_name"`
}