package entity

import "gorm.io/gorm"

type AddonServices struct {
	gorm.Model
	AddonServicesName string `json:"addon_service_name"`
	Description       string `json:"description"`
	Price             uint   `json:"price"`
	ValidFrom        string `json:"valid_from"`
	ValidUntil          string `json:"valid_until"`
}