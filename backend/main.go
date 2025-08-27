// backend/main.go
package main

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/controllers"
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
		// Authentication
		api.POST("/register/student", controllers.RegisterStudent)
		api.POST("/login", controllers.Login)

		// --- Routes เดิม (ที่ไม่เกี่ยวกับ Q&A) ---
		api.GET("/posts", controllers.GetPosts)
		api.POST("/posts", controllers.CreatePost)
		api.POST("/posts/:postId/comments", controllers.CreateComment)
		api.POST("/student-profile-posts", controllers.CreateStudentProfilePost)
		api.GET("/student-profile-posts", controllers.GetStudentProfilePosts)
		
		// --- vvvv ลบ Routes เก่าของ Q&A ออก vvvv ---
		// api.GET("/questions", controllers.GetQuestions)
		// api.POST("/questions", controllers.CreateQuestion)
		// api.POST("/requests", controllers.CreateFormQuestion)
		// api.GET("/requests", controllers.GetFormQuestions) 
		// api.GET("/users/:userId/requests", controllers.GetFormQuestionsByUser)
		// --- ^^^^ สิ้นสุดการลบ ^^^^ ---

		// --- vvvv เพิ่ม Routes ใหม่สำหรับระบบ Q&A vvvv ---
		// FAQ Routes
		api.GET("/faqs", controllers.GetFAQs)
		api.POST("/faqs", controllers.CreateFAQ)
		// (เพิ่ม PUT, DELETE สำหรับ FAQ ได้ในอนาคต)

		// Request Ticket Routes
		api.GET("/tickets", controllers.GetRequestTickets)
		api.POST("/tickets", controllers.CreateRequestTicket)
		api.GET("/tickets/:id", controllers.GetRequestTicketByID) // <-- 👇 เพิ่ม Route ใหม่ตรงนี้ 👇
		api.POST("/tickets/:id/replies", controllers.CreateTicketReply)
		// --- Add new route for status update ---
		api.PUT("/tickets/:id/status", controllers.UpdateTicketStatus)
		// --- ^^^^ สิ้นสุดการเพิ่ม ^^^^ ---
	}

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Backend server is running!"})
	})

	r.Run()
}