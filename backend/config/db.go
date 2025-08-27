// backend/config/db.go
package config

import (
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	database, err := gorm.Open(sqlite.Open("system_analysis.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	// ลบ Entity เก่าของ Q&A และเพิ่ม Entity ใหม่เข้าไป
	err = database.AutoMigrate(
		&entity.User{},
		&entity.JobPosting{},
		&entity.Comment{},
		&entity.StudentProfilePost{},

		// --- vvvv เพิ่ม Entities ใหม่สำหรับระบบ Q&A vvvv ---
		&entity.FAQ{},
		&entity.RequestTicket{},
		&entity.TicketReply{},
		// --- ^^^^ สิ้นสุดการเพิ่ม ^^^^ ---
	)
	if err != nil {
		panic("Failed to migrate database!")
	}

	DB = database
}