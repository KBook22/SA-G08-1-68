 package entity

 import(
	"gorm.io/gorm"
)
type ReportStatus struct{
	gorm.Model
	
	Statusname 	string	`json:"status_name"`
	


	//FK
	Report 	[]Report    `gorm:"foreignKey: ReportStatusID" json:"report"`

	

	
}