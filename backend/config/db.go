
// backend/config/db.go
package config

import (
	"golang.org/x/crypto/bcrypt"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"time"
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
}

func SetupDatabase() {
	// Migrate the schema
	db.AutoMigrate(
		&entity.User{},
		&entity.Genders{},
		&entity.Employer{},
		&entity.Student{},
		&entity.Jobpost{},
		&entity.Reviews{},
		&entity.Ratingscores{},
		&entity.Payments{},
		&entity.PaymentMethods{},
		&entity.BillableItems{},
		&entity.PaymentReports{},
		&entity.Statuses{},
		&entity.Banks{},
		&entity.Discounts{},
		&entity.Orders{},
		&entity.AddonServices{},
	)
}

func SeedDatabase() {
	// --- Master Data (ข้อมูลหลัก) ---

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

	// Statuses
	paymentStatuses := []entity.Statuses{
		{Model: gorm.Model{ID: 1}, StatusName: "ค้างชำระ"},
		{Model: gorm.Model{ID: 2}, StatusName: "รอตรวจสอบ"},
		{Model: gorm.Model{ID: 3}, StatusName: "สำเร็จ"},
		{Model: gorm.Model{ID: 4}, StatusName: "ล้มเหลว"},
	}
	for _, ps := range paymentStatuses {
		db.FirstOrCreate(&ps, ps.ID)
	}

	// Discounts
	discounts := []entity.Discounts{
		{
			Model:         gorm.Model{ID: 1},
			DiscountName:  "ส่วนลด 10%",
			DiscountValue: 10,
			Discounttype:  "percentage",
			ValidFrom:     time.Date(2024, 8, 1, 0, 0, 0, 0, time.UTC),
			ValidUntil:    time.Date(2024, 8, 31, 0, 0, 0, 0, time.UTC),
		},
		{
			Model:         gorm.Model{ID: 2},
			DiscountName:  "ส่วนลด 15%",
			DiscountValue: 10,
			Discounttype:  "percentage",
			ValidFrom:     time.Date(2024, 9, 1, 0, 0, 0, 0, time.UTC),
			ValidUntil:    time.Date(2024, 9, 30, 0, 0, 0, 0, time.UTC),
		},
	}
	for _, d := range discounts {
		db.FirstOrCreate(&d, d.ID)
	}

	// Billable Items
	billableItems := []entity.BillableItems{
		{Model: gorm.Model{ID: 1}, Description: "ค่าจ้างพาร์ทไทม์ร้านชาบู", Amount: 250},
		{Model: gorm.Model{ID: 2}, Description: "ค่าบริการแพลตฟอร์ม", Amount: 50},
	}
	for _, bi := range billableItems {
		db.FirstOrCreate(&bi, bi.ID)
	}

	passwordEmp, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	passwordStd, _ := bcrypt.GenerateFromPassword([]byte("777777"), 14)

	users := []entity.User{
		{Model: gorm.Model{ID: 1}, Username: "hormok_hr", Password: string(passwordEmp), Role: "Employer"},
		{Model: gorm.Model{ID: 2}, Username: "panida_t", Password: string(passwordStd), Role: "Student"},
	}
	for _, u := range users {
		db.FirstOrCreate(&u, u.ID)
	}

	birthdayEmp, _ := time.Parse("2006-01-02", "1990-05-15")
	employer := entity.Employer{
		Model:         gorm.Model{ID: 1},
		Firstname:     "พรศิริ",
		Lasttname:     "ถาบุญศรี",
		Email:         "hr@hormok.co.th",
		CompanyName:   "ห่อหมก สตูดิโอ",
		ContactPerson: "คุณพรศิริ ถาบุญศรี",
		Birthday:      birthdayEmp,
		Phone:         "081-234-5678",
		Address:       "123 มทส. ประตู 4 ต.สุรนารี อ.เมือง จ.นครราชสีมา",
		UserID:        users[0].ID,
		GenderID:      genders[0].ID,
	}
	db.FirstOrCreate(&employer, employer.ID)

	birthdayStd, _ := time.Parse("2006-01-02", "2004-12-31")
	student := entity.Student{
		Model:       gorm.Model{ID: 1},
		Email:       "panida.t@gmail.com",
		FirstName:   "พนิดา",
		LastName:    "โต๊ะเหลือ",
		Birthday:    birthdayStd,
		Age:         20,
		GPA:         3.5,
		Year:        3,
		Faculty:     "วิศวกรรมศาสตร์",
		Phone:       "081-234-2154",
		Skills:      "เคยทำงานพาร์ทไทม์ร้านชาบู",
		UserID:      users[1].ID,
		GenderID:    genders[1].ID,
		BankAccount: "8630211849",
		BankID:      banks[3].ID,
	}
	db.FirstOrCreate(&student, student.ID)

	jobposts := []entity.Jobpost{
		{
			Model:       gorm.Model{ID: 1},
			Title:       "พาร์ทไทม์ร้านบ้านชาบู",
			Description: "ทำงานช่วงเย็น 17.00 - 20.00 น.",
			Status:      "เปิดรับสมัคร",
			Salary:      250,
			EmployerID:  employer.ID,
		},
		{
			Model:       gorm.Model{ID: 2},
			Title:       "ผู้ช่วยช่างภาพ",
			Description: "ถ่ายภาพสินค้าสำหรับลงเพจ",
			Status:      "อนุมัติ",
			Salary:      600,
			EmployerID:  employer.ID,
		},
	}
	for _, jp := range jobposts {
		db.FirstOrCreate(&jp, jp.ID)
	}

	// Payment
	payment1 := entity.Payments{
		Model:            gorm.Model{ID: 1},
		Proof_of_Payment: "proof_01.jpg",
		Amount:           billableItems[0].Amount,
		Datetime:         time.Now().Add(-24 * time.Hour),
		BillableItemID:   billableItems[0].ID,
		PaymentMethodID:  paymentMethod.ID,
		StatusID:         paymentStatuses[1].ID,
	}
	db.FirstOrCreate(&payment1, payment1.ID)
}

func ConnectDB() {
	database, err := gorm.Open(sqlite.Open("system_analysis.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	// ✨ เพิ่ม Entity ที่จำเป็นทั้งหมดเข้าไปที่นี่ ✨
	err = database.AutoMigrate(
		// --- ระบบหลัก ---
		&entity.User{},
		&entity.Admin{},
		&entity.Student{},
		&entity.Employer{}, // 👈 เพิ่มตารางนายจ้าง
		&entity.Genders{},
		&entity.Banks{},
		&entity.Admin{},

		// --- ระบบโพสต์ของนักศึกษา ---
		&entity.StudentProfilePost{},

		// --- ระบบ Q&A ---
		&entity.FAQ{},
		&entity.RequestTicket{},
		&entity.TicketReply{},
	)
	if err != nil {
		panic("Failed to migrate database!")
	}

	db = database
}
