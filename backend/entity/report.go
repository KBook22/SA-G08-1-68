package entity

import(
	"gorm.io/gorm"
	"time"
)
type Report struct{
	gorm.Model
	Date 			time.Time		`json:"date"`
	Discription 	string			`json:"discription"`
	Hours			int  			`json:"hours"`



	//FK
	
	UserID			uint 			`json:"user_id"`
	User			User            `gorm:"foreignKey:UserID" json:"user"`

	ReportStatusID	uint			`json:"report_status_id"`
	ReportStatus	ReportStatus    `gorm:"foreignKey:ReportStatusID" json:"report"`

	AdminID			uint			`json:"admin_id"`
	Admin			Admin   		`gorm:"foreignKey:AdminID" json:"adimin"`

}