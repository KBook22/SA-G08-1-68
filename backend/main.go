// package main

// import (
// 	"net/http"
// 	"time"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/controller"
// 	"github.com/KBook22/System-Analysis-and-Design/middleware"
// 	"github.com/gin-contrib/cors"
// 	"github.com/gin-gonic/gin"
// )

// func main() {
// 	config.ConnectionDB()
// 	//config.SetupDatabase()
// 	config.SeedDatabase() // 1. เปิดใช้งานการ Seed ข้อมูล

// 	r := gin.Default()

// 	// --- CORS Configuration ---
// 	// แก้ไขส่วนนี้เพื่ออนุญาต Request จาก Frontend ของคุณ
// 	r.Use(cors.New(cors.Config{
// 		AllowOrigins:     []string{"http://localhost:5173"},
// 		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
// 		AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
// 		ExposeHeaders:    []string{"Content-Length"},
// 		AllowCredentials: true,
// 		MaxAge:           12 * time.Hour,
// 	}))

// 	// --- API Routes ---
// 	api := r.Group("/api")
// 	{
// 		api.GET("/jobposts", controller.ListJobPosts)
// 		api.GET("/jobposts/:id", controller.GetJobPostByID)
// 		api.GET("/reviews/scores", controller.ListRatingScores)
// 		api.GET("/payments/statuses", controller.ListPaymentStatuses)
// 		api.GET("/payments/methods", controller.ListPaymentMethods)
// 		// api.GET("/banks", controller.ListBanks)
// 		// api.GET("/genders", controller.ListGenders)

// 		protected := api.Group("")
// 		// protected.Use(middleware.Authorizes())
// 		// {
// 		// JobPost (actions)
// 		jobpostRoutes := protected.Group("/jobposts")
// 		{
// 			jobpostRoutes.POST("", controller.CreateJobPost)
// 			jobpostRoutes.PUT("/:id", controller.UpdateJobPost)
// 			jobpostRoutes.DELETE("/:id", controller.DeleteJobPost)
// 		}

// 		// Review (actions)
// 		reviewRoutes := protected.Group("/reviews")
// 		{
// 			reviewRoutes.POST("/new-rating", controller.CreateRating)
// 			reviewRoutes.GET("", controller.FindRatingsByJobPostID)
// 		}

// 		// Payment (actions)
// 		paymentRoutes := protected.Group("/payments")
// 		{
// 			paymentRoutes.POST("", controller.CreatePayment)
// 			paymentRoutes.GET("", controller.ListPayments)
// 			paymentRoutes.GET("/:id", controller.GetPaymentByID)
// 		}

// 		// Other protected routes
// 		protected.GET("/payment_reports", controller.ListPaymentReports)
// 		protected.GET("/orders", controller.ListOrders)
// 		protected.GET("/discounts", controller.ListDiscounts)
// 		protected.GET("/billable_items", controller.ListBillableItems)
// 		// } // สิ้นสุด protected.Use(middleware.Authorizes())
// 	}
// 	{
// 		// === 🌏 Public Routes (ไม่ต้อง Login) ===
// 		api.POST("/register/student", controller.RegisterStudent)
// 		api.POST("/register/employer", controller.RegisterEmployer)
// 		api.POST("/register/admin", controller.RegisterAdmin)
// 		api.POST("/login", controller.Login)
// 		api.GET("/faqs", controller.GetFAQs)
// 		api.GET("/student-profile-posts", controller.GetStudentProfilePosts)

// 		// === 🛡️ Protected Routes (ต้อง Login และส่ง Token มาด้วย) ===
// 		auth := api.Group("/")
// 		auth.Use(middleware.AuthMiddleware())
// 		{
// 			// --- Student Routes ---
// 			auth.POST("/student-profile-posts", controller.CreateStudentProfilePost)
// 			auth.GET("/profile", controller.GetMyProfile)

// 			// --- Ticket Routes (สำหรับผู้ใช้ทั่วไป) ---
// 			auth.POST("/tickets", controller.CreateRequestTicket)
// 			auth.GET("/tickets", controller.GetMyRequestTickets) // เพิ่มเส้นทางนี้
// 			auth.GET("/tickets/:id", controller.GetRequestTicketByID)
// 			auth.POST("/tickets/:id/replies", controller.CreateTicketReply)
// 		}

// 		// === 🔑 Admin Routes (ต้องมี Role Admin) ===
// 		admin := api.Group("/admin")
// 		admin.Use(middleware.AdminMiddleware())
// 		{
// 			admin.GET("/tickets", controller.GetRequestTickets)
// 			admin.PUT("/tickets/:id/status", controller.UpdateTicketStatus)
// 			admin.POST("/faqs", controller.CreateFAQ)
// 			admin.PUT("/faqs/:id", controller.UpdateFAQ)
// 			admin.DELETE("/faqs/:id", controller.DeleteFAQ)
// 		}
// 	}

// 	r.GET("/", func(c *gin.Context) {
// 		c.JSON(http.StatusOK, gin.H{"message": "Backend server is running!"})
// 	})

// 	r.Run(":8080")
// }


// backend/main.go
// package main

// import (
// 	"net/http"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/controller"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/KBook22/System-Analysis-and-Design/middleware"
// 	"github.com/gin-gonic/gin"
// )

// func main() {
// 	// 1. Initialize Database Connection
// 	config.ConnectionDB()

// 	// 2. Setup Database (Migrate and Seed ALL data)
// 	entity.SetupDatabase(config.DB())

// 	// Set up Gin router
// 	r := gin.Default()

// 	// Setup CORS
// 	r.Use(func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
// 		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(204)
// 			return
// 		}
// 		c.Next()
// 	})

// 	// API Routes
// 	api := r.Group("/api")
// 	{
// 		// --- Public Routes (No Authentication Required) ---
// 		// Authentication & Registration
// 		api.POST("/register/student", controller.RegisterStudent)
// 		api.POST("/register/employer", controller.RegisterEmployer)
// 		api.POST("/register/admin", controller.RegisterAdmin)
// 		api.POST("/login", controller.Login)

// 		// Job Posts
// 		api.GET("/jobposts", controller.ListJobPosts)
// 		api.GET("/jobposts/:id", controller.GetJobPostByID)

// 		// Reviews
// 		api.GET("/reviews/scores", controller.ListRatingScores)
// 		api.GET("/reviews", controller.FindRatingsByJobPostID)

// 		// Payments Data
// 		api.GET("/payments/statuses", controller.ListPaymentStatuses)
// 		api.GET("/payments/methods", controller.ListPaymentMethods)
// 		api.GET("/payment_reports", controller.ListPaymentReports)
// 		api.GET("/orders", controller.ListOrders)
// 		api.GET("/discounts", controller.ListDiscounts)
// 		api.GET("/billable_items", controller.ListBillableItems)

// 		// FAQs
// 		api.GET("/faqs", controller.GetFAQs)

// 		// Student Profile Posts
// 		api.GET("/student-profile-posts", controller.GetStudentProfilePosts)

// 		// --- vvvv START CODE CHANGE vvvv ---
// 		// ✨ Routes สำหรับดึงข้อมูลคณะและสาขา (ที่เพิ่มเข้ามาใหม่) ✨
// 		api.GET("/faculties", controller.ListFaculties)
// 		api.GET("/faculties/:id/departments", controller.ListDepartmentsByFaculty)
// 		// --- ^^^^ END CODE CHANGE ^^^^ ---


// 		// --- Protected Routes (Authentication Required) ---
// 		protected := api.Group("")
// 		protected.Use(middleware.AuthMiddleware())
// 		{
// 			// User Profile
// 			protected.GET("/profile", controller.GetMyProfile)

// 			// Job Posts Management
// 			protected.POST("/jobposts", controller.CreateJobPost)
// 			protected.PUT("/jobposts/:id", controller.UpdateJobPost)
// 			protected.DELETE("/jobposts/:id", controller.DeleteJobPost)

// 			// Reviews Management
// 			protected.POST("/reviews/new-rating", controller.CreateRating)

// 			// Payment Management
// 			protected.POST("/payments", controller.CreatePayment)
// 			protected.GET("/payments", controller.ListPayments)
// 			protected.GET("/payments/:id", controller.GetPaymentByID)

// 			// Student Profile Post Management
// 			protected.POST("/student-profile-posts", controller.CreateStudentProfilePost)

// 			// Support Ticket System (for Users)
// 			protected.POST("/tickets", controller.CreateRequestTicket)
// 			protected.GET("/tickets", controller.GetMyRequestTickets)
// 			protected.GET("/tickets/:id", controller.GetRequestTicketByID)
// 			protected.POST("/tickets/:id/replies", controller.CreateTicketReply)

// 			// --- Admin Protected Routes ---
// 			admin := protected.Group("/admin")
// 			admin.Use(middleware.AdminMiddleware())
// 			{
// 				// Ticket Management (for Admins)
// 				admin.GET("/tickets", controller.GetRequestTickets)
// 				admin.PUT("/tickets/:id/status", controller.UpdateTicketStatus)

// 				// FAQ Management (for Admins)
// 				admin.POST("/faqs", controller.CreateFAQ)
// 				admin.PUT("/faqs/:id", controller.UpdateFAQ)
// 				admin.DELETE("/faqs/:id", controller.DeleteFAQ)
// 			}
// 		}
// 	}

// 	// Simple GET endpoint for root
// 	r.GET("/", func(c *gin.Context) {
// 		c.JSON(http.StatusOK, gin.H{"message": "Welcome to SUT Career API!"})
// 	})

// 	// Start the server
// 	r.Run(":8080")
// }

// backend/main.go
// package main

// import (
// 	"net/http"

// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/controller"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/KBook22/System-Analysis-and-Design/middleware"
// 	"github.com/gin-gonic/gin"
// )

// func main() {
// 	// 1. Initialize Database Connection
// 	config.ConnectionDB()

// 	// 2. Setup Database (Migrate and Seed ALL data)
// 	entity.SetupDatabase(config.DB())

// 	// Set up Gin router
// 	r := gin.Default()

// 	// Setup CORS
// 	r.Use(func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
// 		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(204)
// 			return
// 		}
// 		c.Next()
// 	})

// 	// API Routes
// 	api := r.Group("/api")
// 	{
// 		// --- Public Routes (No Authentication Required) ---
// 		// Authentication & Registration
// 		api.POST("/register/student", controller.RegisterStudent)
// 		api.POST("/register/employer", controller.RegisterEmployer)
// 		api.POST("/register/admin", controller.RegisterAdmin)
// 		api.POST("/login", controller.Login)

// 		// Job Posts
// 		api.GET("/jobposts", controller.ListJobPosts)
// 		api.GET("/jobposts/:id", controller.GetJobPostByID)

// 		// Reviews
// 		api.GET("/reviews/scores", controller.ListRatingScores)
// 		api.GET("/reviews", controller.FindRatingsByJobPostID)

// 		// Payments Data
// 		api.GET("/payments/statuses", controller.ListPaymentStatuses)
// 		api.GET("/payments/methods", controller.ListPaymentMethods)
// 		api.GET("/payment_reports", controller.ListPaymentReports)
// 		api.GET("/orders", controller.ListOrders)
// 		api.GET("/discounts", controller.ListDiscounts)
// 		api.GET("/billable_items", controller.ListBillableItems)

// 		// FAQs
// 		api.GET("/faqs", controller.GetFAQs)

// 		// Student Profile Posts
// 		api.GET("/student-profile-posts", controller.GetStudentProfilePosts)
		
// 		// Data for Forms (Faculties, Departments, Genders)
// 		api.GET("/faculties", controller.ListFaculties)
// 		api.GET("/faculties/:id/departments", controller.ListDepartmentsByFaculty)
		
// 		// --- vvvv START CODE CHANGE vvvv ---
// 		// ✨ Route สำหรับดึงข้อมูลเพศ (ที่เพิ่มเข้ามาใหม่) ✨
// 		api.GET("/genders", controller.ListGenders)
// 		// --- ^^^^ END CODE CHANGE ^^^^ ---


// 		// --- Protected Routes (Authentication Required) ---
// 		protected := api.Group("")
// 		protected.Use(middleware.AuthMiddleware())
// 		{
// 			// User Profile
// 			protected.GET("/profile", controller.GetMyProfile)

// 			// Job Posts Management
// 			protected.POST("/jobposts", controller.CreateJobPost)
// 			protected.PUT("/jobposts/:id", controller.UpdateJobPost)
// 			protected.DELETE("/jobposts/:id", controller.DeleteJobPost)

// 			// Reviews Management
// 			protected.POST("/reviews/new-rating", controller.CreateRating)

// 			// Payment Management
// 			protected.POST("/payments", controller.CreatePayment)
// 			protected.GET("/payments", controller.ListPayments)
// 			protected.GET("/payments/:id", controller.GetPaymentByID)

// 			// Student Profile Post Management
// 			protected.POST("/student-profile-posts", controller.CreateStudentProfilePost)

// 			// Support Ticket System (for Users)
// 			protected.POST("/tickets", controller.CreateRequestTicket)
// 			protected.GET("/tickets", controller.GetMyRequestTickets)
// 			protected.GET("/tickets/:id", controller.GetRequestTicketByID)
// 			protected.POST("/tickets/:id/replies", controller.CreateTicketReply)

// 			// --- Admin Protected Routes ---
// 			admin := protected.Group("/admin")
// 			admin.Use(middleware.AdminMiddleware())
// 			{
// 				// Ticket Management (for Admins)
// 				admin.GET("/tickets", controller.GetRequestTickets)
// 				admin.PUT("/tickets/:id/status", controller.UpdateTicketStatus)

// 				// FAQ Management (for Admins)
// 				admin.POST("/faqs", controller.CreateFAQ)
// 				admin.PUT("/faqs/:id", controller.UpdateFAQ)
// 				admin.DELETE("/faqs/:id", controller.DeleteFAQ)
// 			}
// 		}
// 	}

// 	// Simple GET endpoint for root
// 	r.GET("/", func(c *gin.Context) {
// 		c.JSON(http.StatusOK, gin.H{"message": "Welcome to SUT Career API!"})
// 	})

// 	// Start the server
// 	r.Run(":8080")
// }

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
	{
		// --- Public Routes (No Authentication Required) ---
		// Authentication & Registration
		api.POST("/register/student", controller.RegisterStudent)
		api.POST("/register/employer", controller.RegisterEmployer)
		api.POST("/register/admin", controller.RegisterAdmin)
		api.POST("/login", controller.Login)

		// Job Posts
		api.GET("/jobposts", controller.ListJobPosts)
		api.GET("/jobposts/:id", controller.GetJobPostByID)

		// Reviews
		api.GET("/reviews/scores", controller.ListRatingScores)
		api.GET("/reviews", controller.FindRatingsByJobPostID)

		// Payments Data
		api.GET("/payments/statuses", controller.ListPaymentStatuses)
		api.GET("/payments/methods", controller.ListPaymentMethods)
		api.GET("/payment_reports", controller.ListPaymentReports)
		api.GET("/orders", controller.ListOrders)
		api.GET("/discounts", controller.ListDiscounts)
		api.GET("/billable_items", controller.ListBillableItems)

		// FAQs
		api.GET("/faqs", controller.GetFAQs)

		// Student Profile Posts (Public - สำหรับดูโพสต์ทั้งหมด)
		api.GET("/student-profile-posts", controller.GetStudentProfilePosts)

		// ✅ Data for Forms (Faculties, Departments, Genders, Skills)
		api.GET("/faculties", controller.ListFaculties)
		api.GET("/faculties/:id/departments", controller.ListDepartmentsByFaculty)
		api.GET("/genders", controller.ListGenders)

		// Skills Routes
		api.GET("/skills", controller.GetSkills)           // ดึงทักษะทั้งหมด
		api.POST("/skills", controller.CreateSkill)        // เพิ่มทักษะใหม่  
		api.GET("/skills/search", controller.SearchSkills) // ค้นหาทักษะ
		api.GET("/skills/:id", controller.GetSkillByID)    // ดึงทักษะตาม ID

		// --- Protected Routes (Authentication Required) ---
		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			// User Profile
			protected.GET("/profile", controller.GetMyProfile)

			// Job Posts Management
			protected.POST("/jobposts", controller.CreateJobPost)
			protected.PUT("/jobposts/:id", controller.UpdateJobPost)
			protected.DELETE("/jobposts/:id", controller.DeleteJobPost)

			// Reviews Management
			protected.POST("/reviews/new-rating", controller.CreateRating)

			// Payment Management
			protected.POST("/payments", controller.CreatePayment)
			protected.GET("/payments", controller.ListPayments)
			protected.GET("/payments/:id", controller.GetPaymentByID)

			// Student Profile Post Management
			protected.POST("/student-profile-posts", controller.CreateStudentProfilePost)
			protected.PUT("/student-profile-posts/:id", controller.UpdateStudentProfilePost)
			protected.DELETE("/student-profile-posts/:id", controller.DeleteStudentProfilePost)

			// Support Ticket System (for Users)
			protected.POST("/tickets", controller.CreateRequestTicket)
			protected.GET("/tickets", controller.GetMyRequestTickets)
			protected.GET("/tickets/:id", controller.GetRequestTicketByID)
			protected.POST("/tickets/:id/replies", controller.CreateTicketReply)

			// --- Admin Protected Routes ---
			admin := protected.Group("/admin")
			admin.Use(middleware.AdminMiddleware())
			{
				// Ticket Management (for Admins)
				admin.GET("/tickets", controller.AdminGetRequestTickets)
				admin.PUT("/tickets/:id/status", controller.AdminUpdateTicketStatus)

				// FAQ Management (for Admins)
				admin.POST("/faqs", controller.CreateFAQ)
				admin.PUT("/faqs/:id", controller.UpdateFAQ)
				admin.DELETE("/faqs/:id", controller.DeleteFAQ)
			}
		}
	}

	// Simple GET endpoint for root
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to SUT Career API!"})
	})

	// Start the server
	log.Println("🚀 Server starting on port 8080...")
	r.Run(":8080")
}
