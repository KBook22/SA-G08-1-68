// controller/auth_controller.go
package controller

import (
	"net/http"
	"strings"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/KBook22/System-Analysis-and-Design/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type loginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Role     string `json:"role" binding:"required"` // "student" | "employer"
}

func Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "รูปแบบข้อมูลไม่ถูกต้อง"})
		return
	}

	roleLower := strings.ToLower(strings.TrimSpace(req.Role))
	if roleLower != "student" && roleLower != "employer" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role ไม่ถูกต้อง (ต้องเป็น student หรือ employer)"})
		return
	}

	// 1) หา user ตาม username + role (ไม่แคร์เคสของ role ใน DB)
	var user entity.User
	if err := config.DB().
		Where("username = ? AND LOWER(role) = ?", req.Username, roleLower).
		First(&user).Error; err != nil {

		// ไม่บอกว่าผิดตรงไหน เพื่อความปลอดภัย
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถเข้าสู่ระบบได้"})
		return
	}

	// 2) ตรวจรหัสผ่าน
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"})
		return
	}

	// 3) โหลดโปรไฟล์ตาม role
	var profile any
	switch roleLower {
	case "employer":
		var emp entity.Employer
		if err := config.DB().Where("user_id = ?", user.ID).First(&emp).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบนายจ้างที่เชื่อมกับผู้ใช้นี้"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "ดึงข้อมูลนายจ้างไม่สำเร็จ"})
			return
		}
		profile = emp
	case "student":
		var stu entity.Student
		if err := config.DB().Where("user_id = ?", user.ID).First(&stu).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบนักศึกษาที่เชื่อมกับผู้ใช้นี้"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "ดึงข้อมูลนักศึกษาไม่สำเร็จ"})
			return
		}
		profile = stu
	}

	// 4) สร้าง JWT (ต้องใช้ signature เดียวกับ services.JwtWrapper.GenerateToken)
	jwtWrapper := services.JwtWrapper{
		SecretKey:       "your_secret_key", // ให้ตรงกับ middleware
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}
	signedToken, err := jwtWrapper.GenerateToken(user.ID, roleLower, user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "เกิดข้อผิดพลาดในการสร้าง Token"})
		return
	}

	// (ออปชัน) เซ็ตคุกกี้ให้ด้วย เผื่อ client จะใช้แบบ cookie
	// หมายเหตุ: ถ้า front-end อยู่ที่ localhost:5173 และ fetch withCredentials: true
	// cookie domain/port นี้จะถูกส่งกลับมาที่ API (localhost:8080) ได้
	c.SetCookie(
		"auth_token",
		signedToken,
		24*60*60, // 1 วัน (วินาที)
		"/",
		"",    // domain (ว่าง = host เดิม)
		false, // secure (true ถ้าใช้ https)
		true,  // httpOnly
	)

	// 5) ตอบกลับ (อย่าใส่พาสเวิร์ด)
	c.JSON(http.StatusOK, gin.H{
		"token": signedToken,
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"role":     roleLower,
		},
		"profile": profile,
	})
}