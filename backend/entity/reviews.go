package entity

import (
	"gorm.io/gorm"
	"time"
)

type Reviews struct {
	gorm.Model

	Comment        	string        		`json:"comment"`
	Datetime       	time.Time     		`json:"datetime"`

	//FK
	JobpostID         	uint         	`json:"jobpost_id"`
	Jobpost           	*Jobpost	  	`gorm:"foreignKey: jobpost_id" json:"jobpost"`

	EmployerID     	uint        		`json:"employer_id"`
	Employer       	*Employer   		`gorm:"foreignKey: employer_id" json:"employer"`

	StudentID      	uint          		`json:"student_id"`
	Student        	*Student     		`gorm:"foreignKey: student_id" json:"student"`

	Ratingscore_ID 	uint          		`json:"ratingscore_id"`
	Ratingscore    	*Ratingscores 		`gorm:"foreignKey: ratingscore_id" json:"ratingscore"`
	
}