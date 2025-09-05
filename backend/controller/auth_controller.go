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
	"github.com/KBook22/System-Analysis-and-Design/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type StudentRegistrationPayload struct {
	// User fields
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	// Student fields
	FirstName       string  `json:"first_name" binding:"required"`
	LastName        string  `json:"last_name" binding:"required"`
	Email           string  `json:"email" binding:"required,email"`
	Phone           string  `json:"phone" binding:"required"`
	Faculty         string  `json:"faculty" binding:"required"`
	Year            int     `json:"year" binding:"required"`
	GPA             float32 `json:"gpa"`
	GenderID        uint    `json:"gender_id"`
	Birthday        string  `json:"birthday"`
	Department      string  `json:"department"`
	ProfileImageURL string  `json:"profile_image_url"` // ✅ ฟิลด์สำหรับรูป
}

// POST /register/student
func RegisterStudent(c *gin.Context) {
	var payload StudentRegistrationPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบ username ซ้ำ
	var existingUser entity.User
	if err := config.DB().Where("username = ?", payload.Username).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": fmt.Sprintf("Username '%s' is already taken", payload.Username)})
		return
	}

	tx := config.DB().Begin()

	// hash password
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// parse birthday
	var birthday time.Time
	if payload.Birthday != "" {
		if parsed, err := time.Parse(time.RFC3339, payload.Birthday); err == nil {
			birthday = parsed
		} else {
			birthday = time.Now()
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
		GPA:             payload.GPA,
		GenderID:        payload.GenderID,
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

// ================== LOGIN ==================

type loginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Role     string `json:"role" binding:"required"` // "student" | "employer"
}

func Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	roleLower := strings.ToLower(strings.TrimSpace(req.Role))
	if roleLower != "student" && roleLower != "employer" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role must be student or employer"})
		return
	}

	// หา user ตาม username + role
	var user entity.User
	if err := config.DB().Where("username = ? AND LOWER(role) = ?", req.Username, roleLower).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// ตรวจรหัสผ่าน
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// โหลดโปรไฟล์
	var profile any
	if roleLower == "employer" {
		var emp entity.Employer
		if err := config.DB().Where("user_id = ?", user.ID).First(&emp).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Employer profile not found"})
			return
		}
		profile = emp
	} else {
		var stu entity.Student
		if err := config.DB().Where("user_id = ?", user.ID).First(&stu).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Student profile not found"})
			return
		}
		profile = stu
	}

	// สร้าง JWT
	jwtWrapper := services.JwtWrapper{
		SecretKey:       "your_secret_key",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}
	signedToken, err := jwtWrapper.GenerateToken(user.ID, roleLower, user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// ตั้งค่า cookie (optional)
	c.SetCookie("auth_token", signedToken, 24*60*60, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   signedToken,
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"role":     roleLower,
		},
		"profile": profile,
	})
}

// ================== REGISTER (ทั่วไป) ==================

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

	if err := config.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}
