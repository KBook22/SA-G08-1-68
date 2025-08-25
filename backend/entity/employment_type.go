package entity

import "gorm.io/gorm"

type EmploymentTypeEnum string

const (
	FullTime     EmploymentTypeEnum = "FullTime"
	PartTime     EmploymentTypeEnum = "PartTime"
	Freelance    EmploymentTypeEnum = "Freelance"
	Contract     EmploymentTypeEnum = "Contract"
)

type EmploymentType struct {
	gorm.Model
	EmploymentTypeName EmploymentTypeEnum `gorm:"type:varchar(50);unique;not null" json:"employment_type_name"`
}