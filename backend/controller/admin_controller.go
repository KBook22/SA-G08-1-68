// // backend/controllers/admin_controller.go
// package controller

// import (
// 	"net/http"
// 	"github.com/KBook22/System-Analysis-and-Design/config"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"github.com/gin-gonic/gin"
// )

// type AdminRegistrationPayload struct {
// 	Username  string `json:"username" binding:"required"`
// 	Password  string `json:"password" binding:"required"`
// 	FirstName string `json:"first_name" binding:"required"`
// 	LastName  string `json:"last_name" binding:"required"`
// 	Email     string `json:"email" binding:"required,email"`
// 	Phone     string `json:"phone" binding:"required"`
// }

// // POST /register/admin
// func RegisterAdmin(c *gin.Context) {
// 	var payload AdminRegistrationPayload
// 	if err := c.ShouldBindJSON(&payload); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	tx := config.DB().Begin()

// 	hashedPassword, err := config.HashPassword(payload.Password)
// 	if err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
// 		return
// 	}

// 	user := entity.User{
// 		Username: payload.Username,
// 		Password: hashedPassword,
// 		Role:     entity.RoleAdmin, // <-- 🔄 แก้ไขชื่อตรงนี้
// 	}

// 	if err := tx.Create(&user).Error; err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Username may already exist"})
// 		return
// 	}

// 	admin := entity.Admin{
// 		Firstname: payload.FirstName,
// 		Lasttname: payload.LastName,
// 		Email:     payload.Email,
// 		Phone:     payload.Phone,
// 		Password:  hashedPassword,
// 	}

// 	if err := tx.Create(&admin).Error; err != nil {
// 		tx.Rollback()
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin profile"})
// 		return
// 	}

// 	if err := tx.Commit().Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"message": "Admin registration successful"})
// }
package controller

import (
	"log"
	"net/http"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
)

// AdminRegistrationPayload defines the structure for admin registration data
type AdminRegistrationPayload struct {
	Username  string `json:"username" binding:"required"`
	Password  string `json:"password" binding:"required"`
	FirstName string `json:"first_name" binding:"required"`
	LastName  string `json:"last_name" binding:"required"`
	Email     string `json:"email" binding:"required,email"`
	Phone     string `json:"phone" binding:"required"`
}

// POST /api/register/admin
// Handles the registration of a new admin user.
func RegisterAdmin(c *gin.Context) {
	var payload AdminRegistrationPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx := config.DB().Begin()

	hashedPassword, err := config.HashPassword(payload.Password)
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// 1. Create User record first
	user := entity.User{
		Username: payload.Username,
		Password: hashedPassword,
		Role:     "admin",
	}

	if err := tx.Create(&user).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Username may already exist"})
		return
	}

	// 2. Create Admin record and link it to the newly created User
	admin := entity.Admin{
		Firstname: payload.FirstName,
		Lasttname: payload.LastName,
		Email:     payload.Email,
		Phone:     payload.Phone,
		Password:  hashedPassword,
		UserID:    &user.ID,
	}

	// ✅ FIX: Changed the assignment operator (=) to a comparison operator (!=)
	if err := tx.Create(&admin).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin profile"})
		return
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Admin registration successful"})
}

// GET /api/admin/tickets
// Retrieves all request tickets for the admin dashboard.
func AdminGetRequestTickets(c *gin.Context) {
	var tickets []entity.RequestTicket
	db := config.DB()

	// Step 1: Fetch all tickets first without any preloading.
	if err := db.Order("created_at desc").Find(&tickets).Error; err != nil {
		log.Printf("Database error fetching tickets: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve tickets from database"})
		return
	}

	// Step 2: Manually fetch the related User data for each ticket.
	if len(tickets) > 0 {
		// Collect all unique user IDs from the tickets.
		userIDs := make([]uint, 0)
		for _, ticket := range tickets {
			// Check if UserID is not zero to avoid querying for non-existent users.
			if ticket.UserID != 0 {
				userIDs = append(userIDs, ticket.UserID)
			}
		}

		// Fetch all necessary users in a single, efficient database query.
		if len(userIDs) > 0 {
			var users []entity.User
			if err := db.Where("id IN ?", userIDs).Find(&users).Error; err != nil {
				log.Printf("Database error fetching users for tickets: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user data"})
				return
			}

			// Create a map for quick lookups (user.ID -> user object).
			userMap := make(map[uint]entity.User)
			for _, user := range users {
				userMap[user.ID] = user
			}

			// Assign the fetched user data back to the corresponding ticket's User field.
			for i := range tickets {
				if user, ok := userMap[tickets[i].UserID]; ok {
					tickets[i].User = user
				}
			}
		}
	}

	c.JSON(http.StatusOK, tickets)
}

// PUT /api/admin/tickets/:id/status
// Updates the status of a specific request ticket.
func AdminUpdateTicketStatus(c *gin.Context) {
	ticketID := c.Param("id")

	var body struct {
		Status string `json:"status" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var ticket entity.RequestTicket
	db := config.DB()

	if err := db.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ticket not found"})
		return
	}

	ticket.Status = body.Status
	if err := db.Save(&ticket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update ticket status"})
		return
	}

	c.JSON(http.StatusOK, ticket)
}

