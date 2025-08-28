// backend/main.go
package main

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/controllers"
	"github.com/KBook22/System-Analysis-and-Design/middleware"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	r := gin.Default()
	r.Use(CORSMiddleware())
	config.ConnectDB()

	api := r.Group("/api")
	{
		// === 🌏 Public Routes (ไม่ต้อง Login) ===
		api.POST("/register/student", controllers.RegisterStudent)
		api.POST("/register/employer", controllers.RegisterEmployer)
		api.POST("/register/admin", controllers.RegisterAdmin)
		api.POST("/login", controllers.Login)
		api.GET("/faqs", controllers.GetFAQs)
		api.GET("/student-profile-posts", controllers.GetStudentProfilePosts)

		// === 🛡️ Protected Routes (ต้อง Login และส่ง Token มาด้วย) ===
		auth := api.Group("/")
		auth.Use(middleware.AuthMiddleware())
		{
			// --- Student Routes ---
			auth.POST("/student-profile-posts", controllers.CreateStudentProfilePost)
			auth.GET("/profile", controllers.GetMyProfile)

			// --- Ticket Routes (สำหรับผู้ใช้ทั่วไป) ---
			auth.POST("/tickets", controllers.CreateRequestTicket)
			auth.GET("/tickets", controllers.GetMyRequestTickets) // เพิ่มเส้นทางนี้
			auth.GET("/tickets/:id", controllers.GetRequestTicketByID)
			auth.POST("/tickets/:id/replies", controllers.CreateTicketReply)
		}

		// === 🔑 Admin Routes (ต้องมี Role Admin) ===
		admin := api.Group("/admin")
		admin.Use(middleware.AdminMiddleware())
		{
			admin.GET("/tickets", controllers.GetRequestTickets)
			admin.PUT("/tickets/:id/status", controllers.UpdateTicketStatus)
			admin.POST("/faqs", controllers.CreateFAQ)
			admin.PUT("/faqs/:id", controllers.UpdateFAQ)
			admin.DELETE("/faqs/:id", controllers.DeleteFAQ)
		}
	}

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Backend server is running!"})
	})

	r.Run()
}