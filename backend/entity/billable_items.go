package entity

import "gorm.io/gorm"

type BillableItems struct {
	gorm.Model
	Description string `json:"description"`
	Amount      uint   `json:"amount"`
}