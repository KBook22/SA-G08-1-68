package main

import (
	"github.com/KBook22/System-Analysis-and-Design/controller"
	"github.com/KBook22/System-Analysis-and-Design/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
		api.GET("/jobposts", controllers.ListJobPosts)
		api.GET("/jobposts/:id", controllers.GetJobPostByID)
		api.GET("/reviews/scores", controllers.ListRatingScores)
		api.GET("/payments/statuses", controllers.ListPaymentStatuses)
		api.GET("/payments/methods", controllers.ListPaymentMethods)
		// api.GET("/banks", controllers.ListBanks)
		// api.GET("/genders", controllers.ListGenders)

		protected := api.Group("")
		// protected.Use(middleware.Authorizes())
		// {
			// JobPost (actions)
			jobpostRoutes := protected.Group("/jobposts")
			{
				jobpostRoutes.POST("", controllers.CreateJobPost)
				jobpostRoutes.PUT("/:id", controllers.UpdateJobPost)
				jobpostRoutes.DELETE("/:id", controllers.DeleteJobPost)
			}

			// Review (actions)
			reviewRoutes := protected.Group("/reviews")
			{
				reviewRoutes.POST("/new-rating", controllers.CreateRating)
				reviewRoutes.GET("", controllers.FindRatingsByJobPostID)
			}
			
			// Payment (actions)
			paymentRoutes := protected.Group("/payments")
			{
				paymentRoutes.POST("", controllers.CreatePayment)
				paymentRoutes.GET("", controllers.ListPayments)
				paymentRoutes.GET("/:id", controllers.GetPaymentByID)
			}

			// Other protected routes
			protected.GET("/payment_reports", controllers.ListPaymentReports)
			protected.GET("/orders", controllers.ListOrders)
			protected.GET("/discounts", controllers.ListDiscounts)
			protected.GET("/billable_items", controllers.ListBillableItems)
		}
	// }
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

	r.Run(":8080")
}