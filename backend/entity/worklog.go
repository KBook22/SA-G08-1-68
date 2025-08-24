package entity

import(

	"gorm.io/gorm"
	"time"
)

type Worklog struct{
	gorm.Model


	Description 	string		`json:"description"`
	Lasttname 		string		`json:"last_name"`
	Email			string 		`json:"email"`
	Phone			string		`json:"phone"`
	Time			time.Time 	`json:"time"`
	Hours			int			`json:"hours"`

	// foreign key student
	StudentID  		uint 		`json:"student_id"`
	Student			Student		`grom:"foreignKey:jobpost" json:"student"`
	// foreign key jobpost
	JobpostID		uint 		`json:"jobpost_id"`
	Jobpost     	Jobpost		`gorm:"foreignKey:JobpostID" json:"jopost"` 

	// fropush
	
}