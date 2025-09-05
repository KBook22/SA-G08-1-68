package entity

import(

	"gorm.io/gorm"
	"time"
)

type Worklog struct{
	gorm.Model


	Description 	string		`json:"description"`
	DateTime		time.Time 	`json:"time"`
	Hours			float64		`json:"hours"`

	// foreign key student
	StudentID  		uint 		`json:"student_id"`
	Student			Student		`grom:"foreignKey:jobpost" json:"student"`
	// foreign key jobpost
	JobpostID		uint 		`json:"jobpost_id"`
	Jobpost     	Jobpost		`gorm:"foreignKey:JobpostID" json:"jobpost"` 

	// fropush
	
}