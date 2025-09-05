// // backend/controllers/auth_controller.go
// package controller

// import (
// 	"net/http"
// 	"time"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/KBook22/System-Analysis-and-Design/middleware"
// 	"github.com/gin-gonic/gin"
// 	"github.com/golang-jwt/jwt/v5"
// )
// // POST /login
// func Login(c *gin.Context) {
// 	var user entity.User
// 	var foundUser entity.User

// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := config.DB().Where("username = ?", user.Username).First(&foundUser).Error; err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
// 		return
// 	}

// 	if !config.CheckPasswordHash(user.Password, foundUser.Password) {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
// 		return
// 	}

// 	// ตั้งค่าให้ Token มีอายุ 1 ปี (8760 ชั่วโมง)
// 	expirationTime := time.Now().Add(24 * 365 * time.Hour)
// 	claims := &middleware.Claims{
// 		UserID:   foundUser.ID,
// 		Username: foundUser.Username,
// 		Role:     foundUser.Role,
// 		RegisteredClaims: jwt.RegisteredClaims{
// 			ExpiresAt: jwt.NewNumericDate(expirationTime),
// 		},
// 	}

// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	tokenString, err := token.SignedString(middleware.JwtKey)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Login successful",
// 		"token":   tokenString,
// 		"user": gin.H{
// 			"id":       foundUser.ID,
// 			"username": foundUser.Username,
// 			"role":     foundUser.Role,
// 		},
// 	})
// }

// // POST /register 
// func Register(c *gin.Context) {
// 	var user entity.User
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	hashedPassword, err := config.HashPassword(user.Password)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
// 		return
// 	}
// 	user.Password = hashedPassword
// 	user.Role = entity.Stu 

// 	if err := config.DB().Create(&user).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
// }

// backend/controllers/auth_controller.go
// package controller

// import (
// 	"net/http"
// 	"time"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/KBook22/System-Analysis-and-Design/middleware"
// 	"github.com/gin-gonic/gin"
// 	"github.com/golang-jwt/jwt/v5"
// )

// type StudentRegistrationPayload struct {
// 	// User fields
// 	Username string `json:"username" binding:"required"`
// 	Password string `json:"password" binding:"required"`

// 	// Student fields
// 	FirstName string `json:"first_name" binding:"required"`
// 	LastName  string `json:"last_name" binding:"required"`
// 	Email     string `json:"email" binding:"required,email"`
// 	Phone     string `json:"phone" binding:"required"`
// 	Faculty   string `json:"faculty" binding:"required"`
// 	Year      int    `json:"year" binding:"required"`
// }

// // POST /register/student
// func RegisterStudent(c *gin.Context) {
// 	var payload StudentRegistrationPayload
// 	if err := c.ShouldBindJSON(&payload); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	tx := config.DB().Begin()

// 	hashedPassword, err := config.HashPassword(payload.Password)
// 	if err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
// 		return
// 	}

// 	user := entity.User{
// 		Username: payload.Username,
// 		Password: hashedPassword,
// 		Role:     entity.Stu,
// 	}

// 	if err := tx.Create(&user).Error; err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Username may already exist"})
// 		return
// 	}

// 	student := entity.Student{
// 		UserID:    user.ID,
// 		FirstName: payload.FirstName,
// 		LastName:  payload.LastName,
// 		Email:     payload.Email,
// 		Phone:     payload.Phone,
// 		Faculty:   payload.Faculty,
// 		Year:      payload.Year,
// 		Birthday:  time.Now(),
// 		Age:       0,
// 		GPA:       0.0,
// 	}

// 	if err := tx.Create(&student).Error; err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student profile"})
// 		return
// 	}

// 	if err := tx.Commit().Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"message": "Student registration successful"})
// }
// // POST /login
// func Login(c *gin.Context) {
// 	var user entity.User
// 	var foundUser entity.User

// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := config.DB().Where("username = ?", user.Username).First(&foundUser).Error; err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
// 		return
// 	}

// 	if !config.CheckPasswordHash(user.Password, foundUser.Password) {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
// 		return
// 	}

// 	// ตั้งค่าให้ Token มีอายุ 1 ปี (8760 ชั่วโมง)
// 	expirationTime := time.Now().Add(24 * 365 * time.Hour)
// 	claims := &middleware.Claims{
// 		UserID:   foundUser.ID,
// 		Username: foundUser.Username,
// 		Role:     foundUser.Role,
// 		RegisteredClaims: jwt.RegisteredClaims{
// 			ExpiresAt: jwt.NewNumericDate(expirationTime),
// 		},
// 	}

// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	tokenString, err := token.SignedString(middleware.JwtKey)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Login successful",
// 		"token":   tokenString,
// 		"user": gin.H{
// 			"id":       foundUser.ID,
// 			"username": foundUser.Username,
// 			"role":     foundUser.Role,
// 		},
// 	})
// }

// // POST /register 
// func Register(c *gin.Context) {
// 	var user entity.User
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	hashedPassword, err := config.HashPassword(user.Password)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
// 		return
// 	}
// 	user.Password = hashedPassword
// 	user.Role = entity.Stu 

// 	if err := config.DB().Create(&user).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
// }

// backend/controllers/auth_controller.go
// backend/controllers/auth_controller.go

package controller

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/KBook22/System-Analysis-and-Design/middleware"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type StudentRegistrationPayload struct {
	// User fields
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	// Student fields
	FirstName        string `json:"first_name" binding:"required"`
	LastName         string `json:"last_name" binding:"required"`
	Email            string `json:"email" binding:"required,email"`
	Phone            string `json:"phone" binding:"required"`
	Faculty          string `json:"faculty" binding:"required"`
	Year             int    `json:"year" binding:"required"`
	GPA              float32 `json:"gpa"`
	GenderID         uint   `json:"gender_id"`
	Birthday         string `json:"birthday"`
	Department       string `json:"department"`
	// ✅ เพิ่มฟิลด์สำหรับรับข้อมูลรูปภาพ
	ProfileImageURL  string `json:"profile_image_url"`
}

// POST /register/student
func RegisterStudent(c *gin.Context) {
	var payload StudentRegistrationPayload
	
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ✅ ตรวจสอบ username ซ้ำก่อน
	var existingUser entity.User
	if err := config.DB().Where("username = ?", payload.Username).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{
			"error": fmt.Sprintf("Username '%s' is already taken. Please choose a different username.", payload.Username),
		})
		return
	}

	tx := config.DB().Begin()
	
	hashedPassword, err := config.HashPassword(payload.Password)
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user := entity.User{
		Username: payload.Username,
		Password: hashedPassword,
		Role:     entity.Stu,
	}

	if err := tx.Create(&user).Error; err != nil {
		tx.Rollback()
		// ✅ ปรับปรุง error message
		if strings.Contains(err.Error(), "UNIQUE constraint failed: users.username") {
			c.JSON(http.StatusConflict, gin.H{
				"error": fmt.Sprintf("Username '%s' is already taken. Please choose a different username.", payload.Username),
			})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user account"})
		}
		return
	}

	// ✅ แปลง birthday string เป็น time.Time
	var birthday time.Time
	if payload.Birthday != "" {
		if parsedTime, err := time.Parse(time.RFC3339, payload.Birthday); err == nil {
			birthday = parsedTime
		} else {
			birthday = time.Now() // fallback
		}
	} else {
		birthday = time.Now()
	}

	student := entity.Student{
		UserID:          user.ID,
		FirstName:       payload.FirstName,
		LastName:        payload.LastName,
		Email:           payload.Email,
		Phone:           payload.Phone,
		Faculty:         payload.Faculty,
		Year:            payload.Year,
		Birthday:        birthday,
		Age:             0,
		GPA:             payload.GPA,
		GenderID:        payload.GenderID,
		// ✅ บันทึกข้อมูลรูปภาพ
		ProfileImageURL: payload.ProfileImageURL,
	}

	if err := tx.Create(&student).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student profile"})
		return
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Student registration successful"})
}

// POST /login
func Login(c *gin.Context) {

	var user entity.User // รับค่าที่ user ส่งมา (username, password)
	var foundUser entity.User // เก็บค่าที่หาเจอจาก DB

// รับ request body แล้ว map เข้ามาที่ struct user
// ถ้ารูปแบบไม่ถูกต้อง เช่น ไม่มี field username จะ return 400 Bad Request
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
// ไป query ใน DB ว่ามี username นี้ไหม
// ถ้าไม่เจอ  return 401 Unauthorized
	if err := config.DB().Where("username = ?", user.Username).First(&foundUser).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	if !config.CheckPasswordHash(user.Password, foundUser.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// ตั้งค่าให้ Token มีอายุ 1 ปี (8760 ชั่วโมง) 1วันก็พอแล้ว 1ปีจะเอาเยอะไปไหน
	expirationTime := time.Now().Add(24 * 1 * time.Hour)
	claims := &middleware.Claims{
		UserID:   foundUser.ID,
		Username: foundUser.Username,
		Role:     foundUser.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(middleware.JwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   tokenString,
		"user": gin.H{
			"id":       foundUser.ID,
			"username": foundUser.Username,
			"role":     foundUser.Role,
		},
	})
}

// POST /register (สำหรับ register ทั่วไป)
func Register(c *gin.Context) {
	var user entity.User
	
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := config.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user.Password = hashedPassword
	user.Role = entity.Stu

	if err := config.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}
