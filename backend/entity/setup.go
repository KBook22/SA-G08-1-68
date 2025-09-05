package entity

import (
	"errors"
	"log"
	"gorm.io/gorm"
)

// SetupDatabase ทำหน้าที่สร้างตารางทั้งหมดในฐานข้อมูลและเพิ่มข้อมูลเริ่มต้น
func SetupDatabase(db *gorm.DB) {
	log.Println("🔧 Setting up database entities...")

	// AutoMigrate จะทำการตรวจสอบและสร้างตารางสำหรับ Schema ที่ระบุไว้
	// หากตารางมีการเปลี่ยนแปลง (เช่น เพิ่มคอลัมน์) GORM จะทำการอัปเดตให้
	err := db.AutoMigrate(
		// User Management
		&User{},
		&Admin{},
		&Student{},
		&Employer{},
		&Genders{},
		&Banks{},

		// ✅ Faculty และ Department ต้องมี
		&Faculty{},
		&Department{},

		// Student Profile & Posts
		&StudentProfilePost{},
		&StudentPost{},

		// Skills (ถ้ามี)
		&Skill{},

		// Job Posting & Application
		&Jobpost{},
		&JobCategory{},
		&EmploymentType{},
		&SalaryType{},
		&Location{},
		&JobApplication{},
		&ResumeFile{},

		// Reviews
		&Reviews{},
		&Ratingscores{},

		// Payment System
		&Payments{},
		&PaymentMethods{},
		&Statuses{},
		&Orders{},
		&AddonServices{},
		&Discounts{},
		&BillableItems{},
		&PaymentReports{},

		// Q&A and Support
		&FAQ{},
		&RequestTicket{},
		&TicketReply{},

		// Reporting
		&Report{},
		&ReportStatus{},

		// Other systems
		&Interview{},
		&Worklog{},
		&ChatRoom{},
		&ChatHistory{},
	)

	if err != nil {
		log.Fatalf("❌ Failed to migrate database: %v", err)
	}

	log.Println("✅ Database entities migration completed!")

	// เรียกใช้ฟังก์ชันสำหรับเพิ่มข้อมูลเริ่มต้น
	seedGenders(db)                     // เพิ่มข้อมูลเพศ
	seedFacultiesAndDepartments(db)     // เพิ่มข้อมูลคณะและสาขาวิชา

	log.Println("✅ Entity seeding completed!")
}

// seedGenders เพิ่มข้อมูลเพศเริ่มต้นเข้าไปในฐานข้อมูล
func seedGenders(db *gorm.DB) {
	log.Println("👥 Seeding Genders...")

	// ตรวจสอบว่ามีข้อมูลเพศอยู่แล้วหรือไม่
	var count int64
	db.Model(&Genders{}).Count(&count)
	
	if count == 0 {
		genders := []Genders{
			{Gender: "ชาย"},
			{Gender: "หญิง"},
			{Gender: "ไม่ระบุ"},
		}

		for _, gender := range genders {
			if err := db.Create(&gender).Error; err != nil {
				log.Printf("❌ Error creating gender '%s': %v", gender.Gender, err)
			} else {
				log.Printf("✅ Created gender: %s", gender.Gender)
			}
		}
		
		log.Printf("🎉 Genders seeding completed! Total: 3")
	} else {
		log.Printf("⚠️ Genders already exist, skipping seeding. Total: %d", count)
	}
}

// seedFacultiesAndDepartments เพิ่มข้อมูลคณะและสาขาวิชาเริ่มต้นเข้าไปในฐานข้อมูล
func seedFacultiesAndDepartments(db *gorm.DB) {
	log.Println("🏫 Seeding Faculties and Departments...")

	// ตรวจสอบว่ามีข้อมูลคณะอยู่แล้วหรือไม่
	var facultyCount int64
	db.Model(&Faculty{}).Count(&facultyCount)
	
	if facultyCount > 0 {
		log.Printf("⚠️ Faculties already exist, skipping seeding. Total: %d", facultyCount)
		return
	}

	facultiesData := []struct {
		Name        string
		Departments []string
	}{
		{
			Name: "สำนักวิชาวิศวกรรมศาสตร์",
			Departments: []string{
				"วิศวกรรมคอมพิวเตอร์", "วิศวกรรมไฟฟ้า", "วิศวกรรมโทรคมนาคม", "วิศวกรรมอิเล็กทรอนิกส์",
				"วิศวกรรมพอลิเมอร์", "วิศวกรรมเครื่องกล", "วิศวกรรมอากาศยาน", "วิศวกรรมยานยนต์",
				"วิศวกรรมอุตสาหการ", "วิศวกรรมการผลิต", "วิศวกรรมโยธา", "วิศวกรรมธรณี",
				"วิศวกรรมสิ่งแวดล้อม", "วิศวกรรมเคมี", "วิศวกรรมเซรามิก",
			},
		},
		{
			Name: "สำนักวิชาเทคโนโลยีสังคม",
			Departments: []string{
				"เทคโนโลยีการจัดการ",
			},
		},
		{
			Name: "สำนักวิชาเทคโนโลยีการเกษตร",
			Departments: []string{
				"เทคโนโลยีการผลิตพืช", "เทคโนโลยีและนวัตกรรมทางสัตว์", "เทคโนโลยีอาหาร",
			},
		},
		{
			Name: "สำนักวิชาวิทยาศาสตร์",
			Departments: []string{
				"เคมี", "คณิตศาสตร์", "ฟิสิกส์", "วิทยาศาสตร์การกีฬา", "ชีววิทยา", "จุลชีววิทยา",
			},
		},
		{
			Name: "สำนักวิชาแพทยศาสตร์",
			Departments: []string{
				"แพทยศาสตรบัณฑิต",
			},
		},
		{
			Name: "สำนักวิชาพยาบาลศาสตร์",
			Departments: []string{
				"พยาบาลศาสตรบัณฑิต",
			},
		},
		{
			Name: "สำนักวิชาทันตแพทยศาสตร์",
			Departments: []string{
				"ทันตแพทยศาสตรบัณฑิต",
			},
		},
		{
			Name: "สำนักวิชาสาธารณสุขศาสตร์",
			Departments: []string{
				"อนามัยสิ่งแวดล้อม", "อาชีวอนามัยและความปลอดภัย", "สาธารณสุขชุมชน",
			},
		},
	}

	// ใช้ transaction เพื่อ performance และ data consistency
	err := db.Transaction(func(tx *gorm.DB) error {
		createdFaculties := 0
		createdDepartments := 0

		for _, facultyData := range facultiesData {
			// สร้างคณะ
			faculty := Faculty{Name: facultyData.Name}
			if err := tx.Create(&faculty).Error; err != nil {
				log.Printf("❌ Error creating faculty '%s': %v", facultyData.Name, err)
				return err
			}
			createdFaculties++
			log.Printf("✅ Created faculty: %s", facultyData.Name)

			// สร้าง departments ภายใต้คณะ
			for _, deptName := range facultyData.Departments {
				dept := Department{
					Name:      deptName,
					FacultyID: &faculty.ID,
				}
				if err := tx.Create(&dept).Error; err != nil {
					log.Printf("❌ Error creating department '%s': %v", deptName, err)
					return err
				}
				createdDepartments++
				log.Printf("✅ Created department: %s in %s", deptName, facultyData.Name)
			}
		}

		log.Printf("🎉 Faculties and Departments seeding completed! Faculties: %d, Departments: %d", 
			createdFaculties, createdDepartments)
		return nil
	})

	if err != nil {
		log.Printf("❌ Error seeding faculties and departments: %v", err)
	}
}

// createFacultyWithDepartments เป็นฟังก์ชันช่วยในการสร้างข้อมูลคณะพร้อมกับสาขาวิชา
// (เก็บไว้เพื่อ backward compatibility ถ้ามีการใช้งานที่อื่น)
func createFacultyWithDepartments(db *gorm.DB, facultyName string, departmentNames []string) {
	var faculty Faculty

	// ตรวจสอบว่ามีคณะนี้อยู่แล้วหรือไม่ ถ้ายังไม่มีให้สร้างใหม่
	if err := db.Where("name = ?", facultyName).First(&faculty).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			faculty = Faculty{Name: facultyName}
			if err := db.Create(&faculty).Error; err != nil {
				log.Printf("❌ Error creating faculty '%s': %v", facultyName, err)
				return
			}
			log.Printf("✅ Created faculty: %s", facultyName)
		} else {
			log.Printf("❌ Database error: %v", err)
			return
		}
	}

	// วนลูปเพื่อสร้างสาขาวิชาภายใต้คณะนั้นๆ
	for _, deptName := range departmentNames {
		var dept Department
		// ตรวจสอบว่ามีสาขาวิชานี้ในคณะนี้แล้วหรือไม่ ถ้ายังไม่มีให้สร้างใหม่
		if err := db.Where("name = ? AND faculty_id = ?", deptName, faculty.ID).First(&dept).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				dept = Department{Name: deptName, FacultyID: &faculty.ID}
				if err := db.Create(&dept).Error; err != nil {
					log.Printf("❌ Error creating department '%s': %v", deptName, err)
				} else {
					log.Printf("✅ Created department: %s in %s", deptName, facultyName)
				}
			}
		}
	}
}
