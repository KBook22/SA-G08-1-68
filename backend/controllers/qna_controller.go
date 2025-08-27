// backend/controllers/qna_controller.go
package controllers

import (
	"net/http"
	"strconv"

	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// --- FAQ Management (For Admins) ---

// POST /faqs
func CreateFAQ(c *gin.Context) {
	var faq entity.FAQ
	if err := c.ShouldBindJSON(&faq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// In a real app, you'd get the AdminID from the logged-in user context
	faq.AdminID = 1
	if err := config.DB.Create(&faq).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create FAQ"})
		return
	}
	c.JSON(http.StatusCreated, faq)
}

// GET /faqs
func GetFAQs(c *gin.Context) {
	var faqs []entity.FAQ
	if err := config.DB.Order("created_at desc").Find(&faqs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve FAQs"})
		return
	}
	c.JSON(http.StatusOK, faqs)
}

// --- Request Ticket System ---

// POST /tickets
func CreateRequestTicket(c *gin.Context) {
	var ticket entity.RequestTicket
	if err := c.ShouldBindJSON(&ticket); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// In a real app, you'd get the UserID from the logged-in user context
	ticket.UserID = 1 // Placeholder for now
	ticket.Status = "Open"
	if err := config.DB.Create(&ticket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request ticket"})
		return
	}
	c.JSON(http.StatusCreated, ticket)
}

// GET /tickets
func GetRequestTickets(c *gin.Context) {
	var tickets []entity.RequestTicket
	// Preload User and Replies to get related data
	if err := config.DB.Preload("User").Preload("Replies.Author").Order("created_at desc").Find(&tickets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve tickets"})
		return
	}
	c.JSON(http.StatusOK, tickets)
}

// GET /tickets/:id
func GetRequestTicketByID(c *gin.Context) {
	ticketID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ticket ID"})
		return
	}

	var ticket entity.RequestTicket
	// Preload related data
	if err := config.DB.Preload("User").Preload("Replies.Author").Where("id = ?", ticketID).First(&ticket).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Ticket not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve ticket"})
		return
	}

	c.JSON(http.StatusOK, ticket)
}


// POST /tickets/:id/replies
func CreateTicketReply(c *gin.Context) {
	ticketID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ticket ID"})
		return
	}

	var reply entity.TicketReply
	if err := c.ShouldBindJSON(&reply); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	var ticket entity.RequestTicket
	if err := config.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ticket not found"})
		return
	}

	if reply.IsStaffReply {
		reply.AuthorID = 1 // Assuming Admin User has ID 1
		// --- If it's the first staff reply, change status to "In Progress" ---
		if ticket.Status == "Open" {
			ticket.Status = "In Progress"
			if err := config.DB.Save(&ticket).Error; err != nil {
				// Log error but don't block the reply
				c.Error(err)
			}
		}
	} else {
		reply.AuthorID = ticket.UserID
	}

	reply.TicketID = uint(ticketID)

	if err := config.DB.Create(&reply).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create reply"})
		return
	}

	// Preload the author to return the full reply object
	config.DB.Preload("Author").First(&reply, reply.ID)

	c.JSON(http.StatusCreated, reply)
}

// PUT /tickets/:id/status
func UpdateTicketStatus(c *gin.Context) {
	ticketID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ticket ID"})
		return
	}

	var statusUpdate struct {
		Status string `json:"status" binding:"required"`
	}

	if err := c.ShouldBindJSON(&statusUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var ticket entity.RequestTicket
	if err := config.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ticket not found"})
		return
	}

	ticket.Status = statusUpdate.Status
	if err := config.DB.Save(&ticket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update ticket status"})
		return
	}
	
	// Preload necessary data before returning
	config.DB.Preload("User").Preload("Replies.Author").First(&ticket, ticket.ID)
	c.JSON(http.StatusOK, ticket)
}