package main

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/controller"
	"github.com/KBook22/System-Analysis-and-Design/middleware"
	"github.com/gin-contrib/cors"
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
	config.ConnectionDB()
	config.SetupDatabase()
	config.SeedDatabase() // 1. เปิดใช้งานการ Seed ข้อมูล

	r := gin.Default()
	r.Use(cors.Default())

	// --- API Routes ---
	api := r.Group("/api")
	{
		api.GET("/jobposts", controller.ListJobPosts)
		api.GET("/jobposts/:id", controller.GetJobPostByID)
		api.GET("/reviews/scores", controller.ListRatingScores)
		api.GET("/payments/statuses", controller.ListPaymentStatuses)
		api.GET("/payments/methods", controller.ListPaymentMethods)
		// api.GET("/banks", controller.ListBanks)
		// api.GET("/genders", controller.ListGenders)

		protected := api.Group("")
		// protected.Use(middleware.Authorizes())
		// {
		// JobPost (actions)
		jobpostRoutes := protected.Group("/jobposts")
		{
			jobpostRoutes.POST("", controller.CreateJobPost)
			jobpostRoutes.PUT("/:id", controller.UpdateJobPost)
			jobpostRoutes.DELETE("/:id", controller.DeleteJobPost)
			// เพิ่มตรงนี้
			jobpostRoutes.POST("/upload-portfolio/:id", controller.UploadPortfolio)

		}

		// Review (actions)
		reviewRoutes := protected.Group("/reviews")
		{
			reviewRoutes.POST("/new-rating", controller.CreateRating)
			reviewRoutes.GET("", controller.FindRatingsByJobPostID)
		}

		// Payment (actions)
		paymentRoutes := protected.Group("/payments")
		{
			paymentRoutes.POST("", controller.CreatePayment)
			paymentRoutes.GET("", controller.ListPayments)
			paymentRoutes.GET("/:id", controller.GetPaymentByID)
		}

		// Other protected routes
		protected.GET("/payment_reports", controller.ListPaymentReports)
		protected.GET("/orders", controller.ListOrders)
		protected.GET("/discounts", controller.ListDiscounts)
		protected.GET("/billable_items", controller.ListBillableItems)
	}
	{
		// === 🌏 Public Routes (ไม่ต้อง Login) ===
		api.POST("/register/student", controller.RegisterStudent)
		api.POST("/register/employer", controller.RegisterEmployer)
		api.POST("/register/admin", controller.RegisterAdmin)
		api.POST("/login", controller.Login)
		api.GET("/faqs", controller.GetFAQs)
		api.GET("/student-profile-posts", controller.GetStudentProfilePosts)

		// === 🛡️ Protected Routes (ต้อง Login และส่ง Token มาด้วย) ===
		auth := api.Group("/")
		auth.Use(middleware.AuthMiddleware())
		{
			// --- Student Routes ---
			auth.POST("/student-profile-posts", controller.CreateStudentProfilePost)
			auth.GET("/profile", controller.GetMyProfile)

			// --- Ticket Routes (สำหรับผู้ใช้ทั่วไป) ---
			auth.POST("/tickets", controller.CreateRequestTicket)
			auth.GET("/tickets", controller.GetMyRequestTickets) // เพิ่มเส้นทางนี้
			auth.GET("/tickets/:id", controller.GetRequestTicketByID)
			auth.POST("/tickets/:id/replies", controller.CreateTicketReply)
		}

		// === 🔑 Admin Routes (ต้องมี Role Admin) ===
		admin := api.Group("/admin")
		admin.Use(middleware.AdminMiddleware())
		{
			admin.GET("/tickets", controller.GetRequestTickets)
			admin.PUT("/tickets/:id/status", controller.UpdateTicketStatus)
			admin.POST("/faqs", controller.CreateFAQ)
			admin.PUT("/faqs/:id", controller.UpdateFAQ)
			admin.DELETE("/faqs/:id", controller.DeleteFAQ)
		}
	}

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Backend server is running!"})
	})

	r.GET("/download/:filename", func(c *gin.Context) {
		filename := c.Param("filename")
		filepath := "./uploads/" + filename
		c.FileAttachment(filepath, filename) // บังคับโหลดไฟล์แทนแสดง
	})
	// add by Netnaphat
	r.GET("/api/jobcategories", controller.ListJobCategories)
	r.GET("/api/jobcategories/:id", controller.GetJobCategoryByID)

	// add by Netnaphat
	r.GET("/api/salarytype", controller.ListSalaryType)
	r.GET("/api/salarytype/:id", controller.GetSalaryTypeByID)

	// add by Netnaphat
	r.GET("/api/employmenttypes", controller.ListEmploymentTypes)
	r.GET("/api/employmenttypes/:id", controller.GetEmploymentTypeByID)
	// เปิดให้เข้าถึงไฟล์ในโฟลเดอร์ uploads
	r.Static("/uploads", "./uploads")

	r.Run(":8080")
}
