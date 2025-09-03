// backend/services/student_post_service.go
package services

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
)

// ✨ 1. แก้ไขฟังก์ชันให้รับ studentID เพิ่มเข้ามา
func CreateStudentProfilePost(post *entity.StudentProfilePost, studentID uint) (*entity.StudentProfilePost, error) {
	// ✨ 2. กำหนด StudentID ของโพสต์จากค่าที่ได้รับมา
	post.StudentID = &studentID

	// ดึงข้อมูล Student มา Preload เพื่อให้ Response ที่ส่งกลับไปมีข้อมูลครบถ้วน
	if err := config.DB().Create(post).Error; err != nil {
		return nil, err
	}
	
	// Preload Student data to include it in the response
	if err := config.DB().Preload("Student").First(&post, post.ID).Error; err != nil {
		return nil, err
	}

	return post, nil
}

func GetStudentProfilePosts() ([]entity.StudentProfilePost, error) {
	var posts []entity.StudentProfilePost
	// เพิ่ม .Order("created_at desc") เพื่อให้โพสต์ล่าสุดอยู่บนสุด
	if err := config.DB().Preload("Student").Order("created_at desc").Find(&posts).Error; err != nil {
		return nil, err
	}
	return posts, nil
}

func GetStudentProfilePostsByStudentID(studentID uint) ([]entity.StudentProfilePost, error) {
	var posts []entity.StudentProfilePost
	if err := config.DB().Where("student_id = ?", studentID).Order("created_at desc").Find(&posts).Error; err != nil {
		return nil, err
	}
	return posts, nil
}