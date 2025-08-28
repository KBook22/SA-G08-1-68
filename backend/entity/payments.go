package entity

import (
	"gorm.io/gorm"
	"time"
)

type Payments struct {
	gorm.Model
	
	Proof_of_Payment string          `json:"proof_of_payment"`
	Amount           float32         `json:"amount"`
	Datetime         time.Time       `json:"datetime"`

	//FK
	BillableItemID   uint            `json:"billable_item_id"`
	BillableItem     *BillableItems  `gorm:"foreignKey: billable_item_id" json:"billable_item"`

	PaymentMethodID  uint            `json:"payment_method_id"`
	PaymentMethods   *PaymentMethods `gorm:"foreignKey: payment_method_id" json:"payment_method"`

	StatusID         uint            `json:"status_id"`
	Status           *Statuses       `gorm:"foreignKey: status_id" json:"status"`

	PaymentReportID  uint            `json:"payment_report_id"`
	PaymentReport    *PaymentReports `gorm:"foreignKey: payment_report_id" json:"payment_report"`
}