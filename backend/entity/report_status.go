 package entity

 import(
	"gorm.io/gorm"
)
type ReportStatus struct{
	gorm.Model
	
	Firstname 	string	`json:"first_name"`
	Lasttname 	string	`json:"last_name"`
	Phone		string	`json:"phone"`
	Email		string  `json:"email"`


	//FK
	Report 	[]Report    `gorm:"foreignKey: ReportStatusID"`

	

	
}