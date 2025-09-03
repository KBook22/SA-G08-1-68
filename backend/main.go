package main

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/controller"
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
	// เชื่อมต่อฐานข้อมูล + seed data
	config.ConnectionDB()
	config.SetupDatabase()
	config.SeedDatabase()

	// สร้าง router หลัก
	r := gin.Default()
	r.Use(CORSMiddleware())

	// --------------------  Public Routes --------------------
	api := r.Group("/api")
	{
		// --- JobPosts (ดูได้ทุกคน) ---
		api.GET("/jobposts", controller.ListJobPosts)
		api.GET("/jobposts/:id", controller.GetJobPostByID)

		// --- Job Categories ---
		api.GET("/jobcategories", controller.ListJobCategories)
		api.GET("/jobcategories/:id", controller.GetJobCategoryByID)

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
	r.Run(":8080")
}
