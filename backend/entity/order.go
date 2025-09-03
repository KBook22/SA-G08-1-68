package entity

import (
	"gorm.io/gorm"
	"time"
)

type Orders struct {
	gorm.Model
	OrderName          string         `gorm:"uniqueIndex" json:"order_name"`
	Description        string         `json:"description"`
	OrderDate          time.Time      `json:"order_date"`
	Amount             uint           `json:"amount"`
	Service_Start_Date time.Time      `json:"service_start_date"`
	Service_End_Date   time.Time      `json:"service_end_date"`
	AddonServicesID    uint           `json:"addon_services_id"`
	AddonServices      *AddonServices `gorm:"foreignKey: addon_services_id" json:"addon_services"`
	


	
	BillableItemID     uint           `json:"billable_item_id"`
	BillableItem       *BillableItems `gorm:"foreignKey: billable_item_id" json:"billable_item"`


	//FK

	EmployerID         uint           `json:"employer_id"`
	Employer           *Employer    `gorm:"foreignKey: employer_id" json:"employer"`
}