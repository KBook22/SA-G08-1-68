package config

import (
	"log"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/KBook22/System-Analysis-and-Design/entity"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa-project.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db = database

	// ✅ AutoMigrate ตารางทั้งหมด
	err = db.AutoMigrate(
		// --- ระบบหลัก ---
		&entity.User{},
		&entity.Admin{},
		&entity.Student{},
		&entity.Employer{},
		&entity.Genders{},
		&entity.Banks{},
		&entity.Skill{},

		// --- ระบบ Job / Payment เดิม ---
		&entity.Jobpost{},
		&entity.Reviews{},
		&entity.Ratingscores{},
		&entity.Payments{},
		&entity.PaymentMethods{},
		&entity.BillableItems{},
		&entity.PaymentReports{},
		&entity.Statuses{},
		&entity.Discounts{},
		&entity.Orders{},
		&entity.AddonServices{},

		// --- ระบบ Student Post ใหม่ ---
		&entity.StudentPost{},
		&entity.StudentPostAttachment{},

		// --- ระบบ Q&A ---
		&entity.FAQ{},
		&entity.RequestTicket{},
		&entity.TicketReply{},

		// --- ระบบ Faculty & Department ---
		&entity.Faculty{},
		&entity.Department{},
	)

	if err != nil {
		panic("Failed to migrate database!")
	}
}

func SeedDatabase() {
	// ✅ ลบตารางเก่าออก (ถ้ามี)
	if db.Migrator().HasTable("student_profile_posts") {
		log.Println("🗑️ Dropping old student_profile_posts table...")
		db.Migrator().DropTable("student_profile_posts")
	}

	if db.Migrator().HasTable("student_profile_posts_backup") {
		log.Println("🗑️ Dropping backup table...")
		db.Migrator().DropTable("student_profile_posts_backup")
	}

	// Genders
	genders := []entity.Genders{
		{Model: gorm.Model{ID: 1}, Gender: "ชาย"},
		{Model: gorm.Model{ID: 2}, Gender: "หญิง"},
		{Model: gorm.Model{ID: 3}, Gender: "ไม่ระบุ"},
	}

	for _, g := range genders {
		db.FirstOrCreate(&g, g.ID)
	}

	// Rating Scores
	ratingScores := []entity.Ratingscores{
		{Model: gorm.Model{ID: 1}, Ratingscorename: "แย่มาก"},
		{Model: gorm.Model{ID: 2}, Ratingscorename: "แย่"},
		{Model: gorm.Model{ID: 3}, Ratingscorename: "พอใช้"},
		{Model: gorm.Model{ID: 4}, Ratingscorename: "ดี"},
		{Model: gorm.Model{ID: 5}, Ratingscorename: "ยอดเยี่ยม"},
	}

	for _, rs := range ratingScores {
		db.FirstOrCreate(&rs, rs.ID)
	}

	// Payment Method
	paymentMethod := entity.PaymentMethods{
		Model:      gorm.Model{ID: 1},
		Methodname: "คิวอาร์โค้ด พร้อมเพย์",
	}
	db.FirstOrCreate(&paymentMethod, paymentMethod.ID)

	// Banks
	banks := []entity.Banks{
		{Model: gorm.Model{ID: 1}, Bankname: "ธนาคารกรุงเทพ"},
		{Model: gorm.Model{ID: 2}, Bankname: "ธนาคารออมสิน"},
		{Model: gorm.Model{ID: 3}, Bankname: "ธนาคารกสิกรไทย"},
		{Model: gorm.Model{ID: 4}, Bankname: "ธนาคารกรุงไทย"},
		{Model: gorm.Model{ID: 5}, Bankname: "ธนาคารทหารไทยธนชาต"},
		{Model: gorm.Model{ID: 6}, Bankname: "ธนาคารไทยพาณิชย์"},
	}

	for _, b := range banks {
		db.FirstOrCreate(&b, b.ID)
	}

	// Payment Statuses
	paymentStatuses := []entity.Statuses{
		{Model: gorm.Model{ID: 1}, StatusName: "ค้างชำระ"},
		{Model: gorm.Model{ID: 2}, StatusName: "รอตรวจสอบ"},
		{Model: gorm.Model{ID: 3}, StatusName: "สำเร็จ"},
		{Model: gorm.Model{ID: 4}, StatusName: "ล้มเหลว"},
	}

	for _, ps := range paymentStatuses {
		db.FirstOrCreate(&ps, ps.ID)
	}

	// Billable Items
	billableItems := []entity.BillableItems{
		{Model: gorm.Model{ID: 1}, Description: "ค่าจ้างพาร์ทไทม์ร้านชาบู", Amount: 250},
		{Model: gorm.Model{ID: 2}, Description: "ค่าบริการแพลตฟอร์ม", Amount: 50},
	}

	for _, bi := range billableItems {
		db.FirstOrCreate(&bi, bi.ID)
	}

	// ✅ Skills - ปรับปรุงรายการทักษะให้ครบถ้วนยิ่งขึ้น
	skills := []entity.Skill{
		// งานบริการและขาย
		{SkillName: "การให้บริการลูกค้า"},
		{SkillName: "การขาย"},
		{SkillName: "การรับออเดอร์"},
		{SkillName: "การทำงานร้านอาหาร"},
		{SkillName: "การชงกาแฟ"},
		{SkillName: "แคชเชียร์"},
		{SkillName: "การจัดของบนชั้น"},
		{SkillName: "การเสิร์ฟ"},
		{SkillName: "การทำความสะอาด"},
		// งานออฟฟิศพื้นฐาน
		{SkillName: "Microsoft Office"},
		{SkillName: "การพิมพ์เร็ว"},
		{SkillName: "Excel พื้นฐาน"},
		{SkillName: "PowerPoint"},
		{SkillName: "การจัดเอกสาร"},
		{SkillName: "การป้อนข้อมูล"},
		{SkillName: "การใช้โปรแกรมคอมพิวเตอร์"},
		// งานออนไลน์และโซเชียล
		{SkillName: "Facebook Marketing"},
		{SkillName: "Instagram Marketing"},
		{SkillName: "TikTok Marketing"},
		{SkillName: "การถ่ายภาพสินค้า"},
		{SkillName: "การแก้ไขรูป Canva"},
		{SkillName: "การเขียน Content"},
		{SkillName: "การทำคลิปวิดีโอ"},
		{SkillName: "การจัดการ Social Media"},
		// ภาษาและการสื่อสาร
		{SkillName: "ภาษาอังกฤษพื้นฐาน"},
		{SkillName: "ภาษาอังกฤษสนทนา"},
		{SkillName: "การแปลภาษา"},
		{SkillName: "การเขียนภาษาไทย"},
		{SkillName: "การนำเสนอ"},
		{SkillName: "ภาษาจีน"},
		{SkillName: "ภาษาญี่ปุ่น"},
		// งานสอนและติว
		{SkillName: "สอนคณิต"},
		{SkillName: "สอนภาษาอังกฤษ"},
		{SkillName: "สอนภาษาไทย"},
		{SkillName: "สอนวิทยาศาสตร์"},
		{SkillName: "ติวเตอร์"},
		{SkillName: "ดูแลเด็ก"},
		// ทักษะเทคนิค
		{SkillName: "HTML/CSS"},
		{SkillName: "JavaScript"},
		{SkillName: "Python"},
		{SkillName: "PHP"},
		{SkillName: "การออกแบบกราฟิก"},
		{SkillName: "Photoshop"},
		{SkillName: "Illustrator"},
		// ทักษะทั่วไป
		{SkillName: "การทำงานเป็นทีม"},
		{SkillName: "การแก้ไขปัญหา"},
		{SkillName: "ความรับผิดชอบ"},
		{SkillName: "การจัดการเวลา"},
		{SkillName: "ความคิดสร้างสรรค์"},
	}

	for _, skill := range skills {
		var existingSkill entity.Skill
		result := db.Where("skill_name = ?", skill.SkillName).First(&existingSkill)
		if result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				db.Create(&skill)
				log.Printf("✅ Created skill: %s", skill.SkillName)
			}
		}
	}

	// Users + Employer + Student (ตัวอย่าง)
	passwordEmp, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	passwordStd, _ := bcrypt.GenerateFromPassword([]byte("777777"), 14)
	passwordAdmin, _ := bcrypt.GenerateFromPassword([]byte("admin123"), 14)

	users := []entity.User{
		{Model: gorm.Model{ID: 1}, Username: "hormok_hr", Password: string(passwordEmp), Role: "Employer"},
		{Model: gorm.Model{ID: 2}, Username: "panida_t", Password: string(passwordStd), Role: "Student"},
		{Model: gorm.Model{ID: 3}, Username: "admin", Password: string(passwordAdmin), Role: "admin"},
	}

	for _, u := range users {
		db.FirstOrCreate(&u, u.ID)
	}

	// Employer
	birthdayEmp, _ := time.Parse("2006-01-02", "1990-05-15")
	employer := entity.Employer{
		Model:       gorm.Model{ID: 1},
		Firstname:   "พรศิริ",
		Lasttname:   "ถาบุญศรี",
		Email:       "hr@hormok.co.th",
		CompanyName: "ห่อหมก สตูดิโอ",
		ContactPerson: "คุณพรศิริ ถาบุญศรี",
		Birthday:    birthdayEmp,
		Phone:       "081-234-5678",
		Address:     "123 มทส. ประตู 4 ต.สุรนารี อ.เมือง จ.นครราชสีมา",
		UserID:      users[0].ID,
		GenderID:    genders[0].ID,
	}
	db.FirstOrCreate(&employer, employer.ID)

	// Student
	birthdayStd, _ := time.Parse("2006-01-02", "2004-12-31")
	student := entity.Student{
		Model:      gorm.Model{ID: 1},
		Email:      "panida.t@gmail.com",
		FirstName:  "พนิดา",
		LastName:   "โต๊ะเหลือ",
		Birthday:   birthdayStd,
		Age:        20,
		GPA:        3.5,
		Year:       3,
		Faculty:    "วิศวกรรมศาสตร์",
		Department: "วิศวกรรมคอมพิวเตอร์",
		Phone:      "081-234-2154",
		Skills:     "เคยทำงานพาร์ทไทม์ร้านชาบู, การใช้โปรแกรมคอมพิวเตอร์",
		UserID:     users[1].ID,
		GenderID:   genders[1].ID,
		BankAccount: "8630211849",
		BankID:     banks[3].ID,
	}
	db.FirstOrCreate(&student, student.ID)

	log.Println("✅ Database seeded successfully!")
}
