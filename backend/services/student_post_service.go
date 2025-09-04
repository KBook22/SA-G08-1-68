// backend/services/student_post_service.go
package services

import (
    "github.com/KBook22/System-Analysis-and-Design/config"
    "github.com/KBook22/System-Analysis-and-Design/entity"
)

func CreateStudentPost(post *entity.StudentPost, studentID uint) (*entity.StudentPost, error) {
    post.StudentID = &studentID
    
    if err := config.DB().Create(post).Error; err != nil {
        return nil, err
    }
    
    // Preload Student data
    if err := config.DB().Preload("Student").First(&post, post.ID).Error; err != nil {
        return nil, err
    }
    
    return post, nil
}

func GetStudentPosts() ([]entity.StudentPost, error) {
    var posts []entity.StudentPost
    
    if err := config.DB().
        Preload("Student").
        Order("created_at desc").
        Find(&posts).Error; err != nil {
        return nil, err
    }
    
    return posts, nil
}

func GetStudentPostsByStudentID(studentID uint) ([]entity.StudentPost, error) {
    var posts []entity.StudentPost
    
    if err := config.DB().
        Where("student_id = ?", studentID).
        Order("created_at desc").
        Find(&posts).Error; err != nil {
        return nil, err
    }
    
    return posts, nil
}

func GetStudentPostByID(postID uint) (*entity.StudentPost, error) {
    var post entity.StudentPost
    
    if err := config.DB().
        Preload("Student").
        First(&post, postID).Error; err != nil {
        return nil, err
    }
    
    return &post, nil
}

func UpdateStudentPost(postID uint, updateData *entity.StudentPost) (*entity.StudentPost, error) {
    var post entity.StudentPost
    
    if err := config.DB().First(&post, postID).Error; err != nil {
        return nil, err
    }
    
    if err := config.DB().Model(&post).Updates(updateData).Error; err != nil {
        return nil, err
    }
    
    // ดึงข้อมูลที่อัปเดตแล้ว
    if err := config.DB().Preload("Student").First(&post, postID).Error; err != nil {
        return nil, err
    }
    
    return &post, nil
}

func DeleteStudentPost(postID uint) error {
    return config.DB().Delete(&entity.StudentPost{}, postID).Error
}
