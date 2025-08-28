package entity

import "gorm.io/gorm"

type BillableItems struct {
	gorm.Model
	Description string `json:"description"`
	Amount      float32   `json:"amount"`
	JobpostID	*uint	`json:"jobpost_id"`
	Jobpost		*Jobpost `gorm:"foreignKey: jobpost_id" json:"jobpost,omitempty"`
	OrderID		*uint	`json:"order_id"`
	Order		*Orders `gorm:"foreignKey: order_id" json:"order,omitempty"`
}