package entity

import(
	"gorm.io/gorm"
	"time"
)
type Report struct{
	gorm.Model
	Title 			string			`json:"title"`
	Datetime 		time.Time		`json:"datetime"`		
	Place 			string			`json:"place"`
	Discription 	string			`json:"discription"`




	//FK
	
	UserID			uint 			`json:"user_id"`
	User			User            `gorm:"foreignKey:UserID" json:"user"`

	ReportStatusID	uint			`json:"report_status_id"`
	ReportStatus	ReportStatus    `gorm:"foreignKey:ReportStatusID" json:"report_status"`

	AdminID			uint			`json:"admin_id"`
	Admin			Admin   		`gorm:"foreignKey:AdminID" json:"adimin"`

}