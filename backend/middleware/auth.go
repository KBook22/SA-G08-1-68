// backend/middleware/auth.go
package middleware

import (
	"net/http"
	"strings"

	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var JwtKey = []byte("your_very_secret_and_long_key_that_no_one_knows")

// Claims คือข้อมูลที่เราจะฝังไว้ใน Token
type Claims struct {
	Username string          `json:"username"`
	UserID   uint            `json:"user_id"`
	Role     entity.RoleEnum `json:"role"` // เพิ่ม Role เข้าไปใน Claims
	jwt.RegisteredClaims
}

// AuthMiddleware คือฟังก์ชันด่านตรวจของเรา
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		claims := &Claims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return JwtKey, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("userID", claims.UserID)
		c.Set("username", claims.Username)
		c.Set("role", claims.Role) // ส่ง Role ไปกับ context ด้วย

		c.Next()
	}
}

// AdminMiddleware ตรวจสอบทั้ง Token และ Role ของ Admin
func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// ตรวจสอบ Token ก่อน
		AuthMiddleware()(c)
		if c.IsAborted() {
			return
		}

		// ตรวจสอบ Role
		role, exists := c.Get("role")
		if !exists || role.(entity.RoleEnum) != entity.RoleAdmin { // <-- 🔄 แก้ไขชื่อตรงนี้
			c.JSON(http.StatusForbidden, gin.H{"error": "Admin access required"})
			c.Abort()
			return
		}

		c.Next()
	}
}