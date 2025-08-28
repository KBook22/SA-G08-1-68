package main

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/controller"
	// "github.com/KBook22/System-Analysis-and-Design/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

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

	r.Run(":8080")
}
