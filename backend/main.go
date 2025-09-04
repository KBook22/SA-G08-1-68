package main

import (
	"log"
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/controller"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/KBook22/System-Analysis-and-Design/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// ✅ 1. เชื่อมต่อฐานข้อมูลก่อน
	config.ConnectionDB()

	// ✅ 2. เรียก entity.SetupDatabase() สำหรับ Faculty และ Department
	entity.SetupDatabase(config.DB())

	// ✅ 3. เรียก config.SeedDatabase() สำหรับ Skills และข้อมูลอื่นๆ
	config.SeedDatabase()

	// ✅ 4. ตรวจสอบจำนวนข้อมูลในฐานข้อมูล
	var skillCount, facultyCount, deptCount int64
	config.DB().Model(&entity.Skill{}).Count(&skillCount)
	config.DB().Model(&entity.Faculty{}).Count(&facultyCount)
	config.DB().Model(&entity.Department{}).Count(&deptCount)
	log.Printf("🎯 Total skills in database: %d", skillCount)
	log.Printf("🏫 Total faculties in database: %d", facultyCount)
	log.Printf("🏛️ Total departments in database: %d", deptCount)

	// ✅ 5. ตั้งค่า Gin router
	r := gin.Default()

	// Setup CORS using middleware for better handling
	configCORS := cors.DefaultConfig()
	configCORS.AllowOrigins = []string{"http://localhost:5173"}
	configCORS.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"}
	configCORS.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	configCORS.AllowCredentials = true
	r.Use(cors.New(configCORS))

	// API Routes
	api := r.Group("/api")

	// === PUBLIC ROUTES (No Authentication Required) ===

	// Authentication & Registration
	authRoutes := api.Group("/")
	{
		authRoutes.POST("/register/student", controller.RegisterStudent)
		authRoutes.POST("/register/employer", controller.RegisterEmployer)
		authRoutes.POST("/register/admin", controller.RegisterAdmin)
		authRoutes.POST("/login", controller.Login)
	}

	// File Upload (for registration)
	api.POST("/upload", controller.UploadToSupabase)
	

	// Job Posts (Public viewing)
	jobRoutes := api.Group("/jobposts")
	{
		jobRoutes.GET("", controller.ListJobPosts)
		jobRoutes.GET("/:id", controller.GetJobPostByID)
	}

	// Student Posts (Public viewing)
	studentPostRoutes := api.Group("/student-posts")
	{
		studentPostRoutes.GET("", controller.GetStudentPosts)           // ✅ ดูโพสต์ทั้งหมด
		studentPostRoutes.GET("/:id", controller.GetStudentPostByID)   // ✅ ดูโพสต์เดียว
	}

	// Reviews (Public viewing)
	reviewRoutes := api.Group("/reviews")
	{
		reviewRoutes.GET("/scores", controller.ListRatingScores)
		reviewRoutes.GET("", controller.FindRatingsByJobPostID)
	}

	// Payment Data (Public viewing)
	paymentDataRoutes := api.Group("/")
	{
		paymentDataRoutes.GET("/payments/statuses", controller.ListPaymentStatuses)
		paymentDataRoutes.GET("/payments/methods", controller.ListPaymentMethods)
		paymentDataRoutes.GET("/payment_reports", controller.ListPaymentReports)
		paymentDataRoutes.GET("/orders", controller.ListOrders)
		paymentDataRoutes.GET("/discounts", controller.ListDiscounts)
		paymentDataRoutes.GET("/billable_items", controller.ListBillableItems)
	}

	// FAQs (Public viewing)
	api.GET("/faqs", controller.GetFAQs)

	// Master Data for Forms (Faculties, Departments, Genders, Skills)
	masterDataRoutes := api.Group("/")
	{
		masterDataRoutes.GET("/faculties", controller.ListFaculties)
		masterDataRoutes.GET("/faculties/:id/departments", controller.ListDepartmentsByFaculty)
		masterDataRoutes.GET("/genders", controller.ListGenders)
	}

	// Skills Routes (Public)
	skillRoutes := api.Group("/skills")
	{
		skillRoutes.GET("", controller.GetSkills)
		skillRoutes.POST("", controller.CreateSkill)
		skillRoutes.GET("/search", controller.SearchSkills)
		skillRoutes.GET("/:id", controller.GetSkillByID)
	}

	// === PROTECTED ROUTES (Authentication Required) ===
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware())

	// User Profile Management
	profileRoutes := protected.Group("/")
	{
		profileRoutes.GET("/profile", controller.GetMyProfile)
	}

	// Job Posts Management (For Employers)
	protectedJobRoutes := protected.Group("/jobposts")
	{
		protectedJobRoutes.POST("", controller.CreateJobPost)
		protectedJobRoutes.PUT("/:id", controller.UpdateJobPost)
		protectedJobRoutes.DELETE("/:id", controller.DeleteJobPost)
	}

	// Student Posts Management (For Students)
	protectedStudentPostRoutes := protected.Group("/student-posts")
	{
		protectedStudentPostRoutes.POST("", controller.CreateStudentPost)         // ✅ สร้างโพสต์ใหม่
		protectedStudentPostRoutes.PUT("/:id", controller.UpdateStudentPost)     // ✅ แก้ไขโพสต์
		protectedStudentPostRoutes.DELETE("/:id", controller.DeleteStudentPost)  // ✅ ลบโพสต์
	}

	// My Posts (ดูโพสต์ของตัวเอง)
	protected.GET("/my-posts", controller.GetMyStudentPosts) // ✅ ดูโพสต์ของตัวเอง

	// Reviews Management
	reviewManagementRoutes := protected.Group("/reviews")
	{
		reviewManagementRoutes.POST("/new-rating", controller.CreateRating)
	}

	// Payment Management
	paymentRoutes := protected.Group("/payments")
	{
		paymentRoutes.POST("", controller.CreatePayment)
		paymentRoutes.GET("", controller.ListPayments)
		paymentRoutes.GET("/:id", controller.GetPaymentByID)
	}

	// Support Ticket System (For Users)
	ticketRoutes := protected.Group("/tickets")
	{
		ticketRoutes.POST("", controller.CreateRequestTicket)
		ticketRoutes.GET("", controller.GetMyRequestTickets)
		ticketRoutes.GET("/:id", controller.GetRequestTicketByID)
		ticketRoutes.POST("/:id/replies", controller.CreateTicketReply)
	}

	// === ADMIN PROTECTED ROUTES ===
	admin := protected.Group("/admin")
	admin.Use(middleware.AdminMiddleware())

	// Admin Ticket Management
	adminTicketRoutes := admin.Group("/tickets")
	{
		adminTicketRoutes.GET("", controller.AdminGetRequestTickets)
		adminTicketRoutes.PUT("/:id/status", controller.AdminUpdateTicketStatus)
	}

	// Admin FAQ Management
	adminFAQRoutes := admin.Group("/faqs")
	{
		adminFAQRoutes.POST("", controller.CreateFAQ)
		adminFAQRoutes.PUT("/:id", controller.UpdateFAQ)
		adminFAQRoutes.DELETE("/:id", controller.DeleteFAQ)
	}

	// === ROOT ENDPOINT ===
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Welcome to SUT Career API!",
			"version": "v1.0.0",
			"status":  "running",
		})
	})

	// Health Check Endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "healthy",
			"database": "connected",
		})
	})

	// Start the server
	log.Println("🚀 Server starting on port 8080...")
	log.Println("📚 API Documentation available at: http://localhost:8080")
	log.Println("💾 Database: SQLite (sa-project.db)")
	log.Println("🌐 CORS enabled for: http://localhost:5173")
	
	r.Run(":8080")
}
