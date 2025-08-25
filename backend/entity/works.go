package entity

import (
	"gorm.io/gorm"
	"time"
)

type Work struct {
	gorm.Model
	Workname		string		`json:"workname"`
	Description		string		`json:"description"`
	Postdate		time.Time	`json:"postdate"`
	Duedate			time.Time	`json:"duedate"`
	Required_Skills	string		`json:"required_skills"`
	Budget			uint		`json:"budget"`
	BillableItemID	uint		`json:"billable_item_id"`
	BillableItem	*BillableItems `gorm:"foreignKey: billable_item_id" json:"billable_item"`

	//FK
	EmployerID		uint		`json:"employer_id"`
	Employer		*Employer	`gorm:"foreignKey: employer_id" json:"employer"`

	StudentID		uint		`json:"student_id"`
	Student			*Student	`gorm:"foreignKey: student_id" json:"student"`
}