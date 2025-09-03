// package entity

// import (
// 	"gorm.io/gorm"
// )

// // StudentProfilePost dùng để lưu thông tin bài đăng tìm việc của sinh viên
// type StudentProfilePost struct {
// 	gorm.Model

// 	// --- ข้อมูลที่เกี่ยวกับโพสต์โดยตรง ---
// 	Introduction string `gorm:"type:text;not null" json:"introduction"`
// 	JobType      string `gorm:"type:varchar(100);not null" json:"job_type"`
// 	PortfolioURL string `gorm:"type:varchar(255)" json:"portfolio_url"`
// 	Skills       string `gorm:"type:text;not null" json:"skills"`
// 	Status       string `gorm:"type:varchar(50);default:'active'" json:"status"`

// 	// --- Foreign Key: สำหรับเชื่อมโยงไปยังโปรไฟล์นักศึกษา ---
// 	StudentID uint    `gorm:"not null" json:"student_id"`
// 	Student   Student `gorm:"foreignKey:StudentID" json:"student"`
// }
// backend/entity/student_profile_post.go

// backend/entity/student_profile_post.go
// backend/entity/student_profile_post.go
// backend/entity/student_profile_post.go
// backend/entity/student_profile_post.go
package entity

import (
    "gorm.io/gorm"
)

type StudentProfilePost struct {
    gorm.Model
    
    // ✅ ข้อมูลใหม่ที่เพิ่มเข้ามา
    Title                string  `json:"title" gorm:"type:varchar(255);not null"`
    JobType             string  `json:"job_type" gorm:"type:varchar(100);not null"`
    Skills              string  `json:"skills" gorm:"type:text;not null"`
    Availability        string  `json:"availability" gorm:"type:varchar(255);not null"`
    PreferredLocation   string  `json:"preferred_location" gorm:"type:varchar(255);not null"`
    ExpectedCompensation string `json:"expected_compensation" gorm:"type:text"`
    Content             string  `json:"content" gorm:"type:text;not null"`
    
    // ✅ ข้อมูลเก่าที่ยังใช้ได้
    Introduction        string  `json:"introduction" gorm:"type:text"`
    PortfolioURL        string  `json:"portfolio_url" gorm:"type:varchar(500)"`
    Status              string  `json:"status" gorm:"type:varchar(50);default:'active'"`
    
    // ✅ Foreign Key Relations
    StudentID           *uint   `json:"student_id" gorm:"not null"`
    Student             Student `json:"student" gorm:"foreignKey:StudentID;references:ID"`
    
    FacultyID           *uint     `json:"faculty_id"`
    Faculty             Faculty   `json:"faculty" gorm:"foreignKey:FacultyID;references:ID"`
    
    DepartmentID        *uint       `json:"department_id"`
    Department          Department  `json:"department" gorm:"foreignKey:DepartmentID;references:ID"`
}
