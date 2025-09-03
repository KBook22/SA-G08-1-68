package entity

import (
	"time"
	"gorm.io/gorm"
)
type InterviewScheduling struct {
	gorm.Model
	DateAndTime time.Time `json:"Date_And_Time"`
	Status string `json:"Status"`
	Description string `gorm:"type:text" json:"Description"`

	//FK

	EmployerID uint
	Employer *Employer `gorm:"foreignKey:EmployerID" json:"Employer_ID"`

	Interview []Interview `gorm:"foreignKey:InterviewSchedulingID"`
}