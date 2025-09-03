package entity

import "gorm.io/gorm"

type Banks struct {
	gorm.Model
	Bankname string `gorm:"uniqueIndex" json:"bank_name"`
}