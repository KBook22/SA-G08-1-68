// backend/services/qna_service.go
package services

import (
	"github.com/KBook22/System-Analysis-and-Design/config"
	"github.com/KBook22/System-Analysis-and-Design/entity"
)

// --- FAQ Services ---

func GetFAQs() ([]entity.FAQ, error) {
	var faqs []entity.FAQ
	if err := config.DB.Order("created_at desc").Find(&faqs).Error; err != nil {
		return nil, err
	}
	return faqs, nil
}

// --- Ticket Services ---

// ในไฟล์ backend/services/qna_service.go
func CreateTicket(ticket *entity.RequestTicket, userID uint) (*entity.RequestTicket, error) { // 👈 รับ userID เพิ่ม
	ticket.UserID = userID // 👈 ใช้ userID ที่รับมา
	ticket.Status = "Open"

	if err := config.DB.Create(ticket).Error; err != nil {
		return nil, err
	}
	return ticket, nil
}

func GetTickets() ([]entity.RequestTicket, error) {
	var tickets []entity.RequestTicket
	if err := config.DB.Preload("User").Preload("Replies.Author").Order("created_at desc").Find(&tickets).Error; err != nil {
		return nil, err
	}
	return tickets, nil
}

func GetTicketByID(id uint) (*entity.RequestTicket, error) {
	var ticket entity.RequestTicket
	if err := config.DB.Preload("User").Preload("Replies.Author").First(&ticket, id).Error; err != nil {
		return nil, err
	}
	return &ticket, nil
}