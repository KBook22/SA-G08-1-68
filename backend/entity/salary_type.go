package entity

import "gorm.io/gorm"

// สร้าง enum สำหรับประเภทเงินเดือน
type SalaryTypeNameEnum string

const (
	Monthly   		SalaryTypeNameEnum = "รายเดือน"
	Hourly    		SalaryTypeNameEnum = "รายชั่วโมง"
	Daily     		SalaryTypeNameEnum = "รายวัน"
	ProjectBased   	SalaryTypeNameEnum = "รายตามโปรเจค"
)

type SalaryType struct {
	gorm.Model
	SalaryTypeName SalaryTypeNameEnum `gorm:"type:varchar(100);not null;unique" json:"salary_type_name"`
}