package entity

import (
    "gorm.io/gorm"
)


// RequestTicket represents the initial request submitted by a user.
type RequestTicket struct {
	gorm.Model
	Subject        string `gorm:"type:varchar(255);not null" json:"subject"`
	InitialMessage string `gorm:"type:text;not null" json:"initial_message"`
	// --- Updated Status field ---
	Status         string `gorm:"type:varchar(50);default:'Open'" json:"status"` // Can be: Open, Awaiting Confirmation, Resolved
	UserID         uint   `gorm:"not null" json:"user_id"`
	User           User   `gorm:"foreignKey:UserID" json:"user"`
	Replies        []TicketReply `gorm:"foreignKey:TicketID" json:"replies"` // One-to-Many relationship
}