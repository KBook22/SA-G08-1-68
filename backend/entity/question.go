package entity

import "gorm.io/gorm"

type Question struct {
	gorm.Model
	TitleID        string `gorm:"primaryKey;column:Title_ID"`
	UserID         string `gorm:"column:User_ID"`
	User           User   `gorm:"foreignKey:UserID"`
	Title          string `gorm:"column:Title"`
	DescriptionQ   string `gorm:"column:Description_Q"`
	CommentUser    string `gorm:"column:Comment_User"`
	StatusQuestion int    `gorm:"column:Status_Question"`

	Answers        []Answer `gorm:"foreignKey:TitleID"`
}