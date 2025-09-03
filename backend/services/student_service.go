// backend/services/student_service.go

package services

import (
	"gorm.io/gorm"
	"github.com/KBook22/System-Analysis-and-Design/entity" // ❗ โปรดตรวจสอบ Path นี้ให้ตรงกับโปรเจกต์ของคุณ
)

type StudentService interface {
	GetStudentByID(id uint) (*entity.Student, error)
    // เพิ่มฟังก์ชันอื่นๆ ที่จำเป็นตามการใช้งานของคุณ
}

type studentService struct {
	db *gorm.DB
}

func NewStudentService(db *gorm.DB) StudentService {
	return &studentService{db: db}
}

func (s *studentService) GetStudentByID(id uint) (*entity.Student, error) {
	var student entity.Student
	
	// ✨ นี่คือส่วนที่แก้ไข ✨
	// ใช้ .Preload() เพื่อดึงข้อมูลที่เกี่ยวข้องมาพร้อมกันในครั้งเดียว
	err := s.db.
		Preload("User").                  // ดึงข้อมูล User
		Preload("Reviews.Rating_score").   // ดึงข้อมูล Review และ Rating_score ที่อยู่ข้างใน
		Preload("StudentProfilePosts").    // ดึงข้อมูล Posts
		First(&student, id).Error

	if err != nil {
		return nil, err
	}
	return &student, nil
}