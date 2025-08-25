package entity

import (
	"time"
	"gorm.io/gorm"
)

type ChatHistory struct {
	gorm.Model
	MessageType string `json:"Message_Type"`
	Message string `json:"Message"`
	ImageURL string `json:"Image_URL"`
	TimeStampSend time.Time `json:"Time_Stamp_Send"`

	ChatRoomID uint
	ChatRoom *ChatRoom `gorm:"foreignKey:ChatRoomID" json:"Chat_Room_ID"`
}
