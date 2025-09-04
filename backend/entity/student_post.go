// backend/entity/student_post.go
package entity

import (
    "gorm.io/gorm"
)

type StudentPost struct {
    gorm.Model
    
    // ✅ ข้อมูลพื้นฐาน
    Title                 string `json:"title" gorm:"type:varchar(255);not null"`
    JobType              string `json:"job_type" gorm:"type:varchar(100);not null"`
    Skills               string `json:"skills" gorm:"type:text;not null"`
    Availability         string `json:"availability" gorm:"type:varchar(255);not null"`
    PreferredLocation    string `json:"preferred_location" gorm:"type:varchar(255);not null"`
    ExpectedCompensation string `json:"expected_compensation" gorm:"type:text"`
    Introduction         string `json:"introduction" gorm:"type:text"`
    
    // ✅ ไฟล์และลิงก์
    PortfolioURL         string `json:"portfolio_url" gorm:"type:varchar(500)"`
    AttachmentURL        string `json:"attachment_url" gorm:"type:varchar(500)"` // ✅ เพิ่มฟิลด์นี้
    AttachmentName       string `json:"attachment_name" gorm:"type:varchar(255)"` // ✅ เพิ่มฟิลด์นี้
    AttachmentType       string `json:"attachment_type" gorm:"type:varchar(50)"`  // ✅ เพิ่มฟิลด์นี้
    
    Status               string `json:"status" gorm:"type:varchar(50);default:'active'"`
    
    // ✅ Foreign Key Relations
    StudentID    *uint       `json:"student_id" gorm:"not null"`
    Student      Student     `json:"student" gorm:"foreignKey:StudentID;references:ID"`
    FacultyID    *uint       `json:"faculty_id"`
    Faculty      Faculty     `json:"faculty" gorm:"foreignKey:FacultyID;references:ID"`
    DepartmentID *uint       `json:"department_id"`
    Department   Department  `json:"department" gorm:"foreignKey:DepartmentID;references:ID"`
}

// TableName กำหนดชื่อตารางให้เป็น student_posts
func (StudentPost) TableName() string {
    return "student_posts"
}
