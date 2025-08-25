package entity

import "gorm.io/gorm"

type PaymentMethods struct {
	gorm.Model
	Methodname 		string		`json:"method_name"`
}