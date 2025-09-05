package entity

import "gorm.io/gorm"

type BillableItems struct {
	gorm.Model
	Description string `json:"description"`
	Amount      float64   `json:"amount"`
}