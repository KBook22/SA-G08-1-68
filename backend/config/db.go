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

	// ✨ เพิ่ม Entity ที่จำเป็นทั้งหมดเข้าไปที่นี่ ✨
	err = database.AutoMigrate(
		// --- ระบบหลัก ---
		&entity.User{},
		&entity.Admin{},
		&entity.Student{},
		&entity.Employer{}, // 👈 เพิ่มตารางนายจ้าง
		&entity.Genders{},
		&entity.Banks{},
		&entity.Admin{},

		// --- ระบบโพสต์ของนักศึกษา ---
		&entity.StudentProfilePost{},

		// --- ระบบ Q&A ---
		&entity.FAQ{},
		&entity.RequestTicket{},
		&entity.TicketReply{},
	)
	if err != nil {
		panic("Failed to migrate database!")
	}

	DB = database
}