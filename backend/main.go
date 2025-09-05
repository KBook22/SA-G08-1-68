package main

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/controller"
	"github.com/KBook22/System-Analysis-and-Design/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"log"
	"net/http"
	"os"
	"time"
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
	if err := os.MkdirAll("./static/payment_evidence", 0o755); err != nil {
		log.Fatal(err)
	}
	r.Static("/static", "./static")

	corsCfg := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // เปลี่ยนตาม origin ของ frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length", "Set-Cookie"},
		AllowCredentials: true,
		MaxAge:           12 * time.Minute,
	}
	r.Use(cors.New(corsCfg))

	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	// --- API Routes ---
	api := r.Group("/api")
	{
		protected := api.Group("")
		protected.Use(middleware.Authorizes())
		{
			jobpost := protected.Group("/jobposts")
			{
				jobpost.GET("", controller.ListJobPosts)
				jobpost.GET("/:id", controller.GetJobPostByID)
				jobpost.GET("/employer/:id", controller.ListJobPostsByEmployerID)
				jobpost.POST("", controller.CreateJobPost)
				jobpost.PUT("/:id", controller.UpdateJobPost)
				jobpost.DELETE("/:id", controller.DeleteJobPost)
			}

			review := protected.Group("/reviews")
			{
				review.GET("/scores", controller.ListRatingScores)
				review.GET("/job/:jobId", controller.FindRatingsByJobPostID)
				review.POST("", controller.CreateReview)
			}

			payment := protected.Group("/payments")
			{
				payment.POST("", controller.CreatePayment)
				payment.GET("", controller.ListPayments)
				payment.GET("/:id", controller.GetPaymentByID)

				payment.GET("/job/:jobId", controller.GetPaymentByJobId)
				payment.GET("/job/:jobId/student-info", controller.FindStudentPayInfoByJobID)
				payment.GET("/billable/:id", controller.GetPaymentByBillable)
				payment.GET("/employer/:employerId", controller.ListPaymentsByEmployerID)
				payment.POST("/:id/evidence", controller.UploadEvidence)
			}

			order := protected.Group("/orders")
			{
				order.GET("", controller.ListOrders)
				order.GET("/jobpost/:jobId", controller.GetOrderByJobPostID)
			}

			report := protected.Group("/payment-reports")
			{
				report.GET("", controller.ListPaymentReports)
				report.GET("/me", controller.ListMyPaymentReports)
				report.GET("/employer/:id", controller.ListPaymentReportsByEmployerID)
				report.POST("/upload", controller.UploadPaymentReport)
			}

			discount := protected.Group("/discounts")
			{
				discount.GET("/used", controller.DiscountUsedByEmployer)
				discount.GET("/:id/usage", controller.CheckDiscountUsage)
			}
			// Other protected routes
			// protected.GET("/discounts", controller.ListDiscounts)
			// protected.GET("/billable_items", controller.ListBillableItems)
		}
		{
			// chompoo added these routes
			api.GET("/payments/statuses", controller.ListPaymentStatuses)
			api.GET("/payments/methods", controller.ListPaymentMethods)
			// billable items
			api.POST("/billable_items", controller.CreateBillableItem)
			// discounts
			api.GET("/discounts", controller.ListDiscounts)
			api.GET("/discounts/applicable", controller.ListApplicableDiscounts)
			api.POST("/discounts", controller.CreateDiscount)

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

		r.Run(":8080")
	}
}
