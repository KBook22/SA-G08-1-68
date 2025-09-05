package main

import (
	"log"
	"net/http"
	"time"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/controller"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/KBook22/System-Analysis-and-Design/middleware"
	"github.com/gin-contrib/cors"
	"github.com/KBook22/System-Analysis-and-Design/seed"
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
	}SetupDatabase
}


const PORT = "8080"

func main() {
	config.SetupDatabase()
	config.SeedDatabase()

	// สร้าง router หลัก
	r := gin.Default()
	r.Use(CORSMiddleware())

	// Seed ข้อมูลนักศึกษา 30 คน
	db := config.DB()
	seed.SeedStudents(db)
	////////////////
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


	// ✅ แก้ไข CORS configuration

	////////////////
	// --------------------  Public Routes --------------------
	api := r.Group("/api")
	{
		// --- JobPosts (ดูได้ทุกคน) ---
		api.GET("/jobposts", controller.ListJobPosts)
		api.GET("/jobposts/:id", controller.GetJobPostByID)

		// --- Job Categories ---
		api.GET("/jobcategories", controller.ListJobCategories)
		api.GET("/jobcategories/:id", controller.GetJobCategoryByID)
		api.GET("/reviews/scores", controller.ListRatingScores)
		api.GET("/payments/statuses", controller.ListPaymentStatuses)
		api.GET("/payments/methods", controller.ListPaymentMethods)
		
		// api.GET("/banks", controller.ListBanks)
		// api.GET("/genders", controller.ListGenders)
		
		


		//=====================================
		//get report status
		api.GET("/reportstatus",controller.GetReportstatus)

		api.GET("/reports", controller.GetAllReports)
		api.GET("/reports/:id", controller.GetReportByID)
		api.GET("/reports/user/:user_id", controller.GetReportByUserID)
		api.POST("/reports", controller.CreateReport)
		
		api.DELETE("/reports/:id", controller.DeleteReport)
		api.PUT("/reports/:id", controller.UpdateReport)
		
		// worklog
		api.POST("/worklogs", controller.CreateWorklog)
		api.GET("/worklogs/student/:id", controller.GetWorklogStudent)
		api.PUT("/worklogs/:id", controller.UpdateWorklogByID)
		api.DELETE("/worklogs/:id", controller.DeleteWorklogID)
		// // Extra
		// api.GET("/jobposts/:id/students", controller.GetStudentInJobpost)
		// api.GET("/users/:id", controller.GetUserByEmployerID)
	

		//=====================================


		protected := api.Group("")
		// protected.Use(middleware.Authorizes())
		// {
			// JobPost (actions)

			jobpostRoutes := protected.Group("/jobposts")
			{
				jobpostRoutes.POST("", controller.CreateJobPost)
				jobpostRoutes.PUT("/:id", controller.UpdateJobPost)
				jobpostRoutes.DELETE("/:id", controller.DeleteJobPost)
			}

		// --- Salary Type ---
		api.GET("/salarytype", controller.ListSalaryType)
		api.GET("/salarytype/:id", controller.GetSalaryTypeByID)

		// --- Employment Types ---
		api.GET("/employmenttypes", controller.ListEmploymentTypes)
		api.GET("/employmenttypes/:id", controller.GetEmploymentTypeByID)

		// --- Auth & Register ---
		api.POST("/register/student", controller.RegisterStudent)
		api.POST("/register/employer", controller.RegisterEmployer)
		api.POST("/register/admin", controller.RegisterAdmin)
		api.POST("/login", controller.Login)

		// --- FAQs & Student Profile (Public) ---
		api.GET("/faqs", controller.GetFAQs)
		api.GET("/student-profile-posts", controller.GetStudentProfilePosts)
	}
	

//==============================================



	// ✅ เพิ่ม OPTIONS handler สำหรับ preflight requests
	r.OPTIONS("/*path", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, Accept, X-Requested-With")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Status(204)
	})

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
		studentPostRoutes.GET("", controller.GetStudentPosts) // ✅ ดูโพสต์ทั้งหมด
		studentPostRoutes.GET("/:id", controller.GetStudentPostByID) // ✅ ดูโพสต์เดียว
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
		protectedStudentPostRoutes.POST("", controller.CreateStudentPost) // ✅ สร้างโพสต์ใหม่
		protectedStudentPostRoutes.PUT("/:id", controller.UpdateStudentPost) // ✅ แก้ไขโพสต์
		protectedStudentPostRoutes.DELETE("/:id", controller.DeleteStudentPost) // ✅ ลบโพสต์
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
			"status":   "healthy",
			"database": "connected",
		})
	})

	// Start the server
	log.Println("🚀 Server starting on port 8080...")
	log.Println("📚 API Documentation available at: http://localhost:8080")
	log.Println("💾 Database: SQLite (sa-project.db)")
	log.Println("🌐 CORS enabled for: http://localhost:5173")



//==============================================


	// -------------------- 🔐 Protected Routes (ต้องล็อกอิน) --------------------
	auth := api.Group("/")
	auth.Use(middleware.AuthMiddleware()) // ต้องมี JWT Token
	{
		// --- JobPosts (สร้าง/แก้ไข/ลบ) ---
		auth.POST("/jobposts", controller.CreateJobPost)
		auth.PUT("/jobposts/:id", controller.UpdateJobPost)
		auth.DELETE("/jobposts/:id", controller.DeleteJobPost)
		auth.POST("/jobposts/upload-portfolio/:id", controller.UploadPortfolio)

		// --- Employer: My Posts ---
		auth.GET("/employer/myposts", controller.GetEmployerPosts)

		// --- Student Profile ---
		auth.POST("/student-profile-posts", controller.CreateStudentProfilePost)
		auth.GET("/profile", controller.GetMyProfile)

		// --- Job Applications ---
		auth.GET("/jobapplications/init/:id", controller.InitJobApplication)
		auth.POST("/jobapplications", controller.CreateJobApplication)
		auth.GET("/jobapplications/me", controller.GetMyApplications)



		// --- Tickets ---
		auth.POST("/tickets", controller.CreateRequestTicket)
		auth.GET("/tickets", controller.GetMyRequestTickets)
		auth.GET("/tickets/:id", controller.GetRequestTicketByID)
		auth.POST("/tickets/:id/replies", controller.CreateTicketReply)

		// --- Reviews ---
		auth.POST("/reviews/new-rating", controller.CreateRating)
		auth.GET("/reviews", controller.FindRatingsByJobPostID)

		// --- Payments ---
		auth.POST("/payments", controller.CreatePayment)
		auth.GET("/payments", controller.ListPayments)
		auth.GET("/payments/:id", controller.GetPaymentByID)
		auth.GET("/payment_reports", controller.ListPaymentReports)
		auth.GET("/orders", controller.ListOrders)
		auth.GET("/discounts", controller.ListDiscounts)
		auth.GET("/billable_items", controller.ListBillableItems)
	}

	// -------------------- 🛡️ Admin Routes --------------------
	admin := api.Group("/admin")
	admin.Use(middleware.AdminMiddleware()) // ✅ ต้องเป็นแอดมินเท่านั้น
	{
		admin.GET("/tickets", controller.GetRequestTickets)
		admin.PUT("/tickets/:id/status", controller.UpdateTicketStatus)
		admin.POST("/faqs", controller.CreateFAQ)
		admin.PUT("/faqs/:id", controller.UpdateFAQ)
		admin.DELETE("/faqs/:id", controller.DeleteFAQ)
	}

	// -------------------- 📂 Static & Files --------------------
	// ตรวจสอบว่า Backend ทำงาน
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Backend server is running!"})
	})

	// API สำหรับดาวน์โหลดไฟล์
	r.GET("/download/:filename", func(c *gin.Context) {
		filename := c.Param("filename")
		filepath := "./uploads/" + filename
		c.FileAttachment(filepath, filename) // ✅ บังคับดาวน์โหลดไฟล์
	})

	// ให้เข้าถึงโฟลเดอร์ uploads โดยตรง
	r.Static("/uploads", "./uploads")

	// Run server
//==============================================


	r.Run(":8080")
	r.Run("localhost:"+ PORT)
}


