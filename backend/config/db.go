package config

import (
	"time"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"golang.org/x/crypto/bcrypt"
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
		&entity.Genders{},
	)
}

func SeedDatabase() {
	// Gender
	gender := []entity.Genders{
		{Model: gorm.Model{ID: 1}, Gender: "ชาย"},
		{Model: gorm.Model{ID: 2}, Gender: "หญิง"},
		{Model: gorm.Model{ID: 3}, Gender: "ไม่ระบุ"},
	}
	for _, g := range gender {
		db.FirstOrCreate(&g, g.ID)
	}
	// Rating Score
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
	// Bank
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
	// Status
	paymentStatuses := []entity.Statuses {
		{Model: gorm.Model{ID: 1}, StatusName: "ค้างชำระ"},
		{Model: gorm.Model{ID: 2}, StatusName: "รอตรวจสอบ"},
		{Model: gorm.Model{ID: 3}, StatusName: "สำเร็จ"},
		{Model: gorm.Model{ID: 4}, StatusName: "ล้มเหลว"},
	}
	for _, ps := range paymentStatuses {
		db.FirstOrCreate(&ps, ps.ID)
	}
	// Discount
	discounts := []entity.Discounts{
		{
			Model:         gorm.Model{ID: 1},
			DiscountName:  "10% off for first time on August",
			DiscountValue: 10,
			Discounttype:  "percentage",
			ValidFrom:     time.Date(2024, 8, 1, 0, 0, 0, 0, time.UTC),
			ValidUntil:    time.Date(2024, 8, 31, 0, 0, 0, 0, time.UTC),
		},
		{
			Model:         gorm.Model{ID: 2},
			DiscountName:  "10% off for first time on September",
			DiscountValue: 10,
			Discounttype:  "percentage",
			ValidFrom:     time.Date(2024, 9, 1, 0, 0, 0, 0, time.UTC),
			ValidUntil:    time.Date(2024, 9, 30, 0, 0, 0, 0, time.UTC),
		},
	}
	for _, d := range discounts {
		db.FirstOrCreate(&d, d.ID)
	}
	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	
	userForEmployer := entity.User{
		Model:    gorm.Model{ID: 1},
		Username: "hormok_hr",
		Password: string(password),
		Role: "Employer",
	}
	db.FirstOrCreate(&userForEmployer, userForEmployer.ID)

	birthday, _ := time.Parse("2006-01-02", "1990-05-15")
	employer := entity.Employer{
		Model:         gorm.Model{ID: 1},
		Firstname:     "พรศิริ",
		Lasttname:     "ถาบุญศรี", // Note: Struct has a typo 'Lasttname'
		Email:         "hr@hormok.co.th",
		CompanyName:   "ห่อหมก สตูดิโอ",
		ContactPerson: "คุณพรศิริ ถาบุญศรี",
		Birthday:      birthday,
		Phone:         "081-234-5678",
		Address:       "123 มทส. ประตู 4 ตำบลสุรนารี อำเภอเมืองนครราชสีมา จังหวัดนครราชสีมา",
		UserID:        userForEmployer.ID,
		GenderID:      gender[0].ID,
	}
	db.FirstOrCreate(&employer, employer.ID)

	jobposts := []entity.Jobpost{
		{Model: gorm.Model{ID: 1}, Title: "Content Creator (ฝึกงาน)", Status: "เปิดรับสมัคร", EmployerID: employer.ID, Salary: 18000},
		{Model: gorm.Model{ID: 2}, Title: "ผู้ช่วยช่างภาพ (Part-time)", Status: "อนุมัติ", EmployerID: employer.ID, Salary: 15000},
		{Model: gorm.Model{ID: 3}, Title: "พิสูจน์อักษร (ฟรีแลนซ์)", Status: "เสร็จสิ้น", EmployerID: employer.ID, Salary: 22000},
	}
	for _, jp := range jobposts {
		db.FirstOrCreate(&jp, jp.ID)
	}

	billableItems := []entity.BillableItems{
		{Model: gorm.Model{ID: 1}, Description: "ค่าจ้าง", Amount: 15000},
		{Model: gorm.Model{ID: 2}, Description: "ค่าบริการแพลตฟอร์ม", Amount: 500},
	}
	for _, bi := range billableItems {
		db.FirstOrCreate(&bi, bi.ID)
	}

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