package entity

import(
	"gorm.io/gorm"
)
type Admin struct{
	gorm.Model
	Firstname 	string	`json:"first_name"`
	Lasttname 	string	`json:"last_name"`
	Email		string  `json:"email"`
	Phone		string	`json:"phone"`
	Password    string  `json:"-"`

	UserID    *uint // 👈 เพิ่มบรรทัดนี้
    User      User  `gorm:"references:id"` 


	Report 	[]Report    `gorm:"foreignKey:AdminID"`

}