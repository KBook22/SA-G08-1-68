
// // backend/config/db.go
// package config

// import (
// 	"golang.org/x/crypto/bcrypt"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"gorm.io/driver/sqlite"
// 	"gorm.io/gorm"
// 	"time"
// )
// var db *gorm.DB

// func DB() *gorm.DB {
// 	return db
// }
// func ConnectionDB() {
// 	database, err := gorm.Open(sqlite.Open("sa-project.db"), &gorm.Config{})
// 	if err != nil {
// 		panic("failed to connect database")
// 	}
// 	db = database
// }

// func SetupDatabase() {
// 	// Migrate the schema
// 	db.AutoMigrate(
// 		&entity.User{},
// 		&entity.Genders{},
// 		&entity.Employer{},
// 		&entity.Student{},
// 		&entity.Jobpost{},
// 		&entity.Reviews{},
// 		&entity.Ratingscores{},
// 		&entity.Payments{},
// 		&entity.PaymentMethods{},
// 		&entity.BillableItems{},
// 		&entity.PaymentReports{},
// 		&entity.Statuses{},
// 		&entity.Banks{},
// 		&entity.Discounts{},
// 		&entity.Orders{},
// 		&entity.AddonServices{},
// 	)
// }

// func SeedDatabase() {
// 	// --- Master Data (ข้อมูลหลัก) ---

// 	// Genders
// 	genders := []entity.Genders{
// 		{Model: gorm.Model{ID: 1}, Gender: "ชาย"},
// 		{Model: gorm.Model{ID: 2}, Gender: "หญิง"},
// 		{Model: gorm.Model{ID: 3}, Gender: "ไม่ระบุ"},
// 	}
// 	for _, g := range genders {
// 		db.FirstOrCreate(&g, g.ID)
// 	}

// 	// Rating Scores
// 	ratingScores := []entity.Ratingscores{
// 		{Model: gorm.Model{ID: 1}, Ratingscorename: "แย่มาก"},
// 		{Model: gorm.Model{ID: 2}, Ratingscorename: "แย่"},
// 		{Model: gorm.Model{ID: 3}, Ratingscorename: "พอใช้"},
// 		{Model: gorm.Model{ID: 4}, Ratingscorename: "ดี"},
// 		{Model: gorm.Model{ID: 5}, Ratingscorename: "ยอดเยี่ยม"},
// 	}
// 	for _, rs := range ratingScores {
// 		db.FirstOrCreate(&rs, rs.ID)
// 	}

// 	// Payment Method
// 	paymentMethod := entity.PaymentMethods{
// 		Model:      gorm.Model{ID: 1},
// 		Methodname: "คิวอาร์โค้ด พร้อมเพย์",
// 	}
// 	db.FirstOrCreate(&paymentMethod, paymentMethod.ID)

// 	// Banks
// 	banks := []entity.Banks{
// 		{Model: gorm.Model{ID: 1}, Bankname: "ธนาคารกรุงเทพ"},
// 		{Model: gorm.Model{ID: 2}, Bankname: "ธนาคารออมสิน"},
// 		{Model: gorm.Model{ID: 3}, Bankname: "ธนาคารกสิกรไทย"},
// 		{Model: gorm.Model{ID: 4}, Bankname: "ธนาคารกรุงไทย"},
// 		{Model: gorm.Model{ID: 5}, Bankname: "ธนาคารทหารไทยธนชาต"},
// 		{Model: gorm.Model{ID: 6}, Bankname: "ธนาคารไทยพาณิชย์"},
// 	}
// 	for _, b := range banks {
// 		db.FirstOrCreate(&b, b.ID)
// 	}

// 	// Statuses
// 	paymentStatuses := []entity.Statuses{
// 		{Model: gorm.Model{ID: 1}, StatusName: "ค้างชำระ"},
// 		{Model: gorm.Model{ID: 2}, StatusName: "รอตรวจสอบ"},
// 		{Model: gorm.Model{ID: 3}, StatusName: "สำเร็จ"},
// 		{Model: gorm.Model{ID: 4}, StatusName: "ล้มเหลว"},
// 	}
// 	for _, ps := range paymentStatuses {
// 		db.FirstOrCreate(&ps, ps.ID)
// 	}

// 	// Discounts
// 	discounts := []entity.Discounts{
// 		{
// 			Model:         gorm.Model{ID: 1},
// 			DiscountName:  "ส่วนลด 10%",
// 			DiscountValue: 10,
// 			Discounttype:  "percentage",
// 			ValidFrom:     time.Date(2024, 8, 1, 0, 0, 0, 0, time.UTC),
// 			ValidUntil:    time.Date(2024, 8, 31, 0, 0, 0, 0, time.UTC),
// 		},
// 		{
// 			Model:         gorm.Model{ID: 2},
// 			DiscountName:  "ส่วนลด 15%",
// 			DiscountValue: 10,
// 			Discounttype:  "percentage",
// 			ValidFrom:     time.Date(2024, 9, 1, 0, 0, 0, 0, time.UTC),
// 			ValidUntil:    time.Date(2024, 9, 30, 0, 0, 0, 0, time.UTC),
// 		},
// 	}
// 	for _, d := range discounts {
// 		db.FirstOrCreate(&d, d.ID)
// 	}

// 	// Billable Items
// 	billableItems := []entity.BillableItems{
// 		{Model: gorm.Model{ID: 1}, Description: "ค่าจ้างพาร์ทไทม์ร้านชาบู", Amount: 250},
// 		{Model: gorm.Model{ID: 2}, Description: "ค่าบริการแพลตฟอร์ม", Amount: 50},
// 	}
// 	for _, bi := range billableItems {
// 		db.FirstOrCreate(&bi, bi.ID)
// 	}

// 	passwordEmp, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
// 	passwordStd, _ := bcrypt.GenerateFromPassword([]byte("777777"), 14)

// 	users := []entity.User{
// 		{Model: gorm.Model{ID: 1}, Username: "hormok_hr", Password: string(passwordEmp), Role: "Employer"},
// 		{Model: gorm.Model{ID: 2}, Username: "panida_t", Password: string(passwordStd), Role: "Student"},
// 	}
// 	for _, u := range users {
// 		db.FirstOrCreate(&u, u.ID)
// 	}

// 	birthdayEmp, _ := time.Parse("2006-01-02", "1990-05-15")
// 	employer := entity.Employer{
// 		Model:         gorm.Model{ID: 1},
// 		Firstname:     "พรศิริ",
// 		Lasttname:     "ถาบุญศรี",
// 		Email:         "hr@hormok.co.th",
// 		CompanyName:   "ห่อหมก สตูดิโอ",
// 		ContactPerson: "คุณพรศิริ ถาบุญศรี",
// 		Birthday:      birthdayEmp,
// 		Phone:         "081-234-5678",
// 		Address:       "123 มทส. ประตู 4 ต.สุรนารี อ.เมือง จ.นครราชสีมา",
// 		UserID:        users[0].ID,
// 		GenderID:      genders[0].ID,
// 	}
// 	db.FirstOrCreate(&employer, employer.ID)

// 	birthdayStd, _ := time.Parse("2006-01-02", "2004-12-31")
// 	student := entity.Student{
// 		Model:       gorm.Model{ID: 1},
// 		Email:       "panida.t@gmail.com",
// 		FirstName:   "พนิดา",
// 		LastName:    "โต๊ะเหลือ",
// 		Birthday:    birthdayStd,
// 		Age:         20,
// 		GPA:         3.5,
// 		Year:        3,
// 		Faculty:     "วิศวกรรมศาสตร์",
// 		Phone:       "081-234-2154",
// 		Skills:      "เคยทำงานพาร์ทไทม์ร้านชาบู",
// 		UserID:      users[1].ID,
// 		GenderID:    genders[1].ID,
// 		BankAccount: "8630211849",
// 		BankID:      banks[3].ID,
// 	}
// 	db.FirstOrCreate(&student, student.ID)

// 	jobposts := []entity.Jobpost{
// 		{
// 			Model:       gorm.Model{ID: 1},
// 			Title:       "พาร์ทไทม์ร้านบ้านชาบู",
// 			Description: "ทำงานช่วงเย็น 17.00 - 20.00 น.",
// 			Status:      "เปิดรับสมัคร",
// 			Salary:      250,
// 			EmployerID:  employer.ID,
// 		},
// 		{
// 			Model:       gorm.Model{ID: 2},
// 			Title:       "ผู้ช่วยช่างภาพ",
// 			Description: "ถ่ายภาพสินค้าสำหรับลงเพจ",
// 			Status:      "อนุมัติ",
// 			Salary:      600,
// 			EmployerID:  employer.ID,
// 		},
// 	}
// 	for _, jp := range jobposts {
// 		db.FirstOrCreate(&jp, jp.ID)
// 	}

// 	// Payment
// 	payment1 := entity.Payments{
// 		Model:            gorm.Model{ID: 1},
// 		Proof_of_Payment: "proof_01.jpg",
// 		Amount:           billableItems[0].Amount,
// 		Datetime:         time.Now().Add(-24 * time.Hour),
// 		BillableItemID:   billableItems[0].ID,
// 		PaymentMethodID:  paymentMethod.ID,
// 		StatusID:         paymentStatuses[1].ID,
// 	}
// 	db.FirstOrCreate(&payment1, payment1.ID)
// }

// func ConnectDB() {
// 	database, err := gorm.Open(sqlite.Open("system_analysis.db"), &gorm.Config{})
// 	if err != nil {
// 		panic("Failed to connect to database!")
// 	}

// 	// ✨ เพิ่ม Entity ที่จำเป็นทั้งหมดเข้าไปที่นี่ ✨
// 	err = database.AutoMigrate(
// 		// --- ระบบหลัก ---
// 		&entity.User{},
// 		&entity.Admin{},
// 		&entity.Student{},
// 		&entity.Employer{}, // 👈 เพิ่มตารางนายจ้าง
// 		&entity.Genders{},
// 		&entity.Banks{},
// 		&entity.Admin{},

// 		// --- ระบบโพสต์ของนักศึกษา ---
// 		&entity.StudentProfilePost{},

// 		// --- ระบบ Q&A ---
// 		&entity.FAQ{},
// 		&entity.RequestTicket{},
// 		&entity.TicketReply{},
// 	)
// 	if err != nil {
// 		panic("Failed to migrate database!")
// 	}

// 	db = database
// }



// backend/config/db.go
// package config

// import (
// 	"golang.org/x/crypto/bcrypt"
// 	"github.com/KBook22/System-Analysis-and-Design/entity"
// 	"gorm.io/driver/sqlite"
// 	"gorm.io/gorm"
// 	"time"
// )

// var db *gorm.DB

// func DB() *gorm.DB {
// 	return db
// }

// // ใช้ sa-project.db เพียงไฟล์เดียว
// func ConnectionDB() {
// 	database, err := gorm.Open(sqlite.Open("sa-project.db"), &gorm.Config{})
// 	if err != nil {
// 		panic("failed to connect database")
// 	}

// 	db = database

// 	// ✅ เพิ่ม Skills entity ใน AutoMigrate
// 	err = db.AutoMigrate(
// 		// --- ระบบหลัก ---
// 		&entity.User{},
// 		&entity.Admin{},
// 		&entity.Student{},
// 		&entity.Employer{},
// 		&entity.Genders{},
// 		&entity.Banks{},
		
// 		// ✅ เพิ่ม Skills table
// 		&entity.Skill{},
		
// 		// --- ระบบ Job / Payment เดิม ---
// 		&entity.Jobpost{},
// 		&entity.Reviews{},
// 		&entity.Ratingscores{},
// 		&entity.Payments{},
// 		&entity.PaymentMethods{},
// 		&entity.BillableItems{},
// 		&entity.PaymentReports{},
// 		&entity.Statuses{},
// 		&entity.Discounts{},
// 		&entity.Orders{},
// 		&entity.AddonServices{},
		
// 		// --- ระบบ Student Profile Post ---
// 		&entity.StudentProfilePost{},
		
// 		// --- ระบบ Q&A ---
// 		&entity.FAQ{},
// 		&entity.RequestTicket{},
// 		&entity.TicketReply{},
// 	)

// 	if err != nil {
// 		panic("Failed to migrate database!")
// 	}
// }

// func SeedDatabase() {
// 	// Genders
// 	genders := []entity.Genders{
// 		{Model: gorm.Model{ID: 1}, Gender: "ชาย"},
// 		{Model: gorm.Model{ID: 2}, Gender: "หญิง"},
// 		{Model: gorm.Model{ID: 3}, Gender: "ไม่ระบุ"},
// 	}

// 	for _, g := range genders {
// 		db.FirstOrCreate(&g, g.ID)
// 	}

// 	// Rating Scores
// 	ratingScores := []entity.Ratingscores{
// 		{Model: gorm.Model{ID: 1}, Ratingscorename: "แย่มาก"},
// 		{Model: gorm.Model{ID: 2}, Ratingscorename: "แย่"},
// 		{Model: gorm.Model{ID: 3}, Ratingscorename: "พอใช้"},
// 		{Model: gorm.Model{ID: 4}, Ratingscorename: "ดี"},
// 		{Model: gorm.Model{ID: 5}, Ratingscorename: "ยอดเยี่ยม"},
// 	}

// 	for _, rs := range ratingScores {
// 		db.FirstOrCreate(&rs, rs.ID)
// 	}

// 	// Payment Method
// 	paymentMethod := entity.PaymentMethods{
// 		Model: gorm.Model{ID: 1},
// 		Methodname: "คิวอาร์โค้ด พร้อมเพย์",
// 	}
// 	db.FirstOrCreate(&paymentMethod, paymentMethod.ID)

// 	// Banks
// 	banks := []entity.Banks{
// 		{Model: gorm.Model{ID: 1}, Bankname: "ธนาคารกรุงเทพ"},
// 		{Model: gorm.Model{ID: 2}, Bankname: "ธนาคารออมสิน"},
// 		{Model: gorm.Model{ID: 3}, Bankname: "ธนาคารกสิกรไทย"},
// 		{Model: gorm.Model{ID: 4}, Bankname: "ธนาคารกรุงไทย"},
// 		{Model: gorm.Model{ID: 5}, Bankname: "ธนาคารทหารไทยธนชาต"},
// 		{Model: gorm.Model{ID: 6}, Bankname: "ธนาคารไทยพาณิชย์"},
// 	}

// 	for _, b := range banks {
// 		db.FirstOrCreate(&b, b.ID)
// 	}

// 	// Statuses
// 	paymentStatuses := []entity.Statuses{
// 		{Model: gorm.Model{ID: 1}, StatusName: "ค้างชำระ"},
// 		{Model: gorm.Model{ID: 2}, StatusName: "รอตรวจสอบ"},
// 		{Model: gorm.Model{ID: 3}, StatusName: "สำเร็จ"},
// 		{Model: gorm.Model{ID: 4}, StatusName: "ล้มเหลว"},
// 	}

// 	for _, ps := range paymentStatuses {
// 		db.FirstOrCreate(&ps, ps.ID)
// 	}

// 	// Discounts
// 	discounts := []entity.Discounts{
// 		{
// 			Model: gorm.Model{ID: 1},
// 			DiscountName: "ส่วนลด 10%",
// 			DiscountValue: 10,
// 			Discounttype: "percentage",
// 			ValidFrom: time.Date(2024, 8, 1, 0, 0, 0, 0, time.UTC),
// 			ValidUntil: time.Date(2024, 8, 31, 0, 0, 0, 0, time.UTC),
// 		},
// 		{
// 			Model: gorm.Model{ID: 2},
// 			DiscountName: "ส่วนลด 15%",
// 			DiscountValue: 15,
// 			Discounttype: "percentage",
// 			ValidFrom: time.Date(2024, 9, 1, 0, 0, 0, 0, time.UTC),
// 			ValidUntil: time.Date(2024, 9, 30, 0, 0, 0, 0, time.UTC),
// 		},
// 	}

// 	for _, d := range discounts {
// 		db.FirstOrCreate(&d, d.ID)
// 	}

// 	// Billable Items
// 	billableItems := []entity.BillableItems{
// 		{Model: gorm.Model{ID: 1}, Description: "ค่าจ้างพาร์ทไทม์ร้านชาบู", Amount: 250},
// 		{Model: gorm.Model{ID: 2}, Description: "ค่าบริการแพลตฟอร์ม", Amount: 50},
// 	}

// 	for _, bi := range billableItems {
// 		db.FirstOrCreate(&bi, bi.ID)
// 	}

// 	// ✅ Skills เริ่มต้นสำหรับนักศึกษาทำงานพาร์ทไทม์
// 	skills := []entity.Skill{
// 		// 🛍️ งานบริการและขาย
// 		{SkillName: "การให้บริการลูกค้า"},
// 		{SkillName: "การขาย"},
// 		{SkillName: "การรับออเดอร์"},
// 		{SkillName: "การทำงานร้านอาหาร"},
// 		{SkillName: "การชงกาแฟ"},
// 		{SkillName: "แคชเชียร์"},
// 		{SkillName: "การจัดของบนชั้น"},
		
// 		// 📊 งานออฟฟิศพื้นฐาน  
// 		{SkillName: "Microsoft Office"},
// 		{SkillName: "การพิมพ์เร็ว"},
// 		{SkillName: "Excel พื้นฐาน"},
// 		{SkillName: "PowerPoint"},
// 		{SkillName: "การจัดเอกสาร"},
// 		{SkillName: "การป้อนข้อมูล"},
// 		{SkillName: "การถ่ายเอกสาร"},
		
// 		// 🌐 งานออนไลน์และโซเชียล
// 		{SkillName: "Facebook Marketing"},
// 		{SkillName: "Instagram Marketing"},
// 		{SkillName: "TikTok Marketing"},
// 		{SkillName: "การถ่ายภาพสินค้า"},
// 		{SkillName: "การแก้ไขรูป Canva"},
// 		{SkillName: "การเขียน Content"},
// 		{SkillName: "การทำคลิปวิดีโอ"},
// 		{SkillName: "Live สด"},
		
// 		// 🗣️ ภาษาและการสื่อสาร
// 		{SkillName: "ภาษาอังกฤษพื้นฐาน"},
// 		{SkillName: "ภาษาอังกฤษสนทนา"},
// 		{SkillName: "การแปลภาษา"},
// 		{SkillName: "การเขียนภาษาไทย"},
// 		{SkillName: "การนำเสนอ"},
// 		{SkillName: "ภาษาจีน"},
// 		{SkillName: "ภาษาญี่ปุ่น"},
// 		{SkillName: "ภาษาเกาหลี"},
		
// 		// 📚 งานสอนและติว
// 		{SkillName: "สอนคณิต"},
// 		{SkillName: "สอนภาษาอังกฤษ"},
// 		{SkillName: "สอนภาษาไทย"},
// 		{SkillName: "สอนวิทยาศาสตร์"},
// 		{SkillName: "ติวเตอร์"},
// 		{SkillName: "ดูแลเด็ก"},
// 		{SkillName: "สอนดนตรี"},
// 		{SkillName: "สอนเต้น"},
		
// 		// 🎨 งานสร้างสรรค์
// 		{SkillName: "การถ่ายภาพ"},
// 		{SkillName: "การตัดต่อวิดีโอ"},
// 		{SkillName: "การออกแบบโปสเตอร์"},
// 		{SkillName: "การวาดรูป"},
// 		{SkillName: "การทำการ์ตูน"},
// 		{SkillName: "การเขียนเนื้อเพลง"},
// 		{SkillName: "การเล่นดนตรี"},
// 		{SkillName: "การร้องเพลง"},
		
// 		// 🚗 งานขนส่งและเดลิเวอรี่
// 		{SkillName: "ขับมอเตอร์ไซค์"},
// 		{SkillName: "ขับรถยนต์"},
// 		{SkillName: "เดลิเวอรี่อาหาร"},
// 		{SkillName: "รู้จักเส้นทาง"},
// 		{SkillName: "ขับ Grab"},
// 		{SkillName: "ขับ Foodpanda"},
		
// 		// 💻 IT และโปรแกรมมิ่งพื้นฐาน
// 		{SkillName: "HTML/CSS พื้นฐาน"},
// 		{SkillName: "Photoshop พื้นฐาน"},
// 		{SkillName: "การซ่อมคอมพิวเตอร์"},
// 		{SkillName: "การติดตั้งซอฟต์แวร์"},
// 		{SkillName: "การใช้ Google Workspace"},
		
// 		// 🏃‍♀️ งานกิจกรรมและอีเว้นท์
// 		{SkillName: "จัดงานอีเว้นท์"},
// 		{SkillName: "MC งาน"},
// 		{SkillName: "การประชาสัมพันธ์"},
// 		{SkillName: "การแจกแผ่นพับ"},
// 		{SkillName: "งานโปรโมชั่น"},
// 		{SkillName: "พิธีกรงาน"},
		
// 		// 🧹 งานบ้านและดูแล
// 		{SkillName: "ทำความสะอาดบ้าน"},
// 		{SkillName: "ดูแลผู้สูงอายุ"},
// 		{SkillName: "เดินสุนัข"},
// 		{SkillName: "ดูแลสัตว์เลี้ยง"},
// 		{SkillName: "ทำอาหารง่ายๆ"},
// 		{SkillName: "ซักรีด"},
// 		{SkillName: "จัดสวน"},
		
// 		// 🎯 ทักษะพิเศษอื่นๆ
// 		{SkillName: "การใช้เครื่องมือพื้นฐาน"},
// 		{SkillName: "การคิดเงินเร็ว"},
// 		{SkillName: "การจดจำใบหน้า"},
// 		{SkillName: "การยิ้มแย้มแจ่มใส"},
// 		{SkillName: "การทำงานกะดึก"},
// 		{SkillName: "การทำงานวันหยุด"},
// 		{SkillName: "ความอดทน"},
// 		{SkillName: "ความรับผิดชอบ"},
// 		{SkillName: "การทำงานเป็นทีม"},
// 		{SkillName: "การเรียนรู้เร็ว"},
// 	}

// 	for _, skill := range skills {
// 		db.FirstOrCreate(&skill, entity.Skill{SkillName: skill.SkillName})
// 	}

// 	// Users + Employer + Student (ตัวอย่าง)
// 	passwordEmp, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
// 	passwordStd, _ := bcrypt.GenerateFromPassword([]byte("777777"), 14)
// 	users := []entity.User{
// 		{Model: gorm.Model{ID: 1}, Username: "hormok_hr", Password: string(passwordEmp), Role: "Employer"},
// 		{Model: gorm.Model{ID: 2}, Username: "panida_t", Password: string(passwordStd), Role: "Student"},
// 	}

// 	for _, u := range users {
// 		db.FirstOrCreate(&u, u.ID)
// 	}

// 	// Employer
// 	birthdayEmp, _ := time.Parse("2006-01-02", "1990-05-15")
// 	employer := entity.Employer{
// 		Model: gorm.Model{ID: 1},
// 		Firstname: "พรศิริ",
// 		Lasttname: "ถาบุญศรี",
// 		Email: "hr@hormok.co.th",
// 		CompanyName: "ห่อหมก สตูดิโอ",
// 		ContactPerson: "คุณพรศิริ ถาบุญศรี",
// 		Birthday: birthdayEmp,
// 		Phone: "081-234-5678",
// 		Address: "123 มทส. ประตู 4 ต.สุรนารี อ.เมือง จ.นครราชสีมา",
// 		UserID: users[0].ID,
// 		GenderID: genders[0].ID,
// 	}
// 	db.FirstOrCreate(&employer, employer.ID)

// 	// Student
// 	birthdayStd, _ := time.Parse("2006-01-02", "2004-12-31")
// 	student := entity.Student{
// 		Model: gorm.Model{ID: 1},
// 		Email: "panida.t@gmail.com",
// 		FirstName: "พนิดา",
// 		LastName: "โต๊ะเหลือ",
// 		Birthday: birthdayStd,
// 		Age: 20,
// 		GPA: 3.5,
// 		Year: 3,
// 		Faculty: "วิศวกรรมศาสตร์",
// 		Phone: "081-234-2154",
// 		Skills: "เคยทำงานพาร์ทไทม์ร้านชาบู",
// 		UserID: users[1].ID,
// 		GenderID: genders[1].ID,
// 		BankAccount: "8630211849",
// 		BankID: banks[3].ID,
// 	}
// 	db.FirstOrCreate(&student, student.ID)

// 	// Jobposts
// 	jobposts := []entity.Jobpost{
// 		{
// 			Model: gorm.Model{ID: 1},
// 			Title: "พาร์ทไทม์ร้านบ้านชาบู",
// 			Description: "ทำงานช่วงเย็น 17.00 - 20.00 น.",
// 			Status: "เปิดรับสมัคร",
// 			Salary: 250,
// 			EmployerID: employer.ID,
// 		},
// 		{
// 			Model: gorm.Model{ID: 2},
// 			Title: "ผู้ช่วยช่างภาพ",
// 			Description: "ถ่ายภาพสินค้าสำหรับลงเพจ",
// 			Status: "อนุมัติ",
// 			Salary: 600,
// 			EmployerID: employer.ID,
// 		},
// 	}

// 	for _, jp := range jobposts {
// 		db.FirstOrCreate(&jp, jp.ID)
// 	}

// 	// Payment
// 	payment1 := entity.Payments{
// 		Model: gorm.Model{ID: 1},
// 		Proof_of_Payment: "proof_01.jpg",
// 		Amount: billableItems[0].Amount,
// 		Datetime: time.Now().Add(-24 * time.Hour),
// 		BillableItemID: billableItems[0].ID,
// 		PaymentMethodID: paymentMethod.ID,
// 		StatusID: paymentStatuses[1].ID,
// 	}
// 	db.FirstOrCreate(&payment1, payment1.ID)
// }

package config

import (
	"log"
	"time"
	
	"golang.org/x/crypto/bcrypt"
	"github.com/KBook22/System-Analysis-and-Design/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

// ConnectionDB - เชื่อมต่อฐานข้อมูลและ AutoMigrate
func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa-project.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info), // ✅ เพิ่ม debug mode
	})
	if err != nil {
		panic("failed to connect database")
	}

	db = database
	log.Println("✅ Database connected successfully!")

	// ✅ AutoMigrate พร้อม error handling
	err = db.AutoMigrate(
		// --- ระบบหลัก ---
		&entity.User{},
		&entity.Admin{},
		&entity.Student{},
		&entity.Employer{},
		&entity.Genders{},
		&entity.Banks{},
		
		// ✅ Skills ต้องอยู่ก่อน entities อื่นที่อ้างอิง
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
		
		// --- ระบบ Student Profile Post ---
		&entity.StudentProfilePost{},
		
		// --- ระบบ Q&A ---
		&entity.FAQ{},
		&entity.RequestTicket{},
		&entity.TicketReply{},
	)

	if err != nil {
		log.Fatalf("❌ Failed to migrate database: %v", err)
	}
	
	log.Println("✅ Database migration completed successfully!")
}

// SeedDatabase - เพิ่มข้อมูลเริ่มต้น
func SeedDatabase() {
	log.Println("🌱 Starting database seeding...")

	// Genders
	genders := []entity.Genders{
		{Model: gorm.Model{ID: 1}, Gender: "ชาย"},
		{Model: gorm.Model{ID: 2}, Gender: "หญิง"},
		{Model: gorm.Model{ID: 3}, Gender: "ไม่ระบุ"},
	}

	for _, g := range genders {
		if err := db.FirstOrCreate(&g, g.ID).Error; err != nil {
			log.Printf("❌ Error seeding gender: %v", err)
		}
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
		if err := db.FirstOrCreate(&rs, rs.ID).Error; err != nil {
			log.Printf("❌ Error seeding rating score: %v", err)
		}
	}

	// Payment Method
	paymentMethod := entity.PaymentMethods{
		Model: gorm.Model{ID: 1},
		Methodname: "คิวอาร์โค้ด พร้อมเพย์",
	}
	if err := db.FirstOrCreate(&paymentMethod, paymentMethod.ID).Error; err != nil {
		log.Printf("❌ Error seeding payment method: %v", err)
	}

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
		if err := db.FirstOrCreate(&b, b.ID).Error; err != nil {
			log.Printf("❌ Error seeding bank: %v", err)
		}
	}

	// Statuses
	paymentStatuses := []entity.Statuses{
		{Model: gorm.Model{ID: 1}, StatusName: "ค้างชำระ"},
		{Model: gorm.Model{ID: 2}, StatusName: "รอตรวจสอบ"},
		{Model: gorm.Model{ID: 3}, StatusName: "สำเร็จ"},
		{Model: gorm.Model{ID: 4}, StatusName: "ล้มเหลว"},
	}

	for _, ps := range paymentStatuses {
		if err := db.FirstOrCreate(&ps, ps.ID).Error; err != nil {
			log.Printf("❌ Error seeding payment status: %v", err)
		}
	}

	// Discounts
	discounts := []entity.Discounts{
		{
			Model: gorm.Model{ID: 1},
			DiscountName: "ส่วนลด 10%",
			DiscountValue: 10,
			Discounttype: "percentage",
			ValidFrom: time.Date(2024, 8, 1, 0, 0, 0, 0, time.UTC),
			ValidUntil: time.Date(2024, 8, 31, 0, 0, 0, 0, time.UTC),
		},
		{
			Model: gorm.Model{ID: 2},
			DiscountName: "ส่วนลด 15%",
			DiscountValue: 15,
			Discounttype: "percentage",
			ValidFrom: time.Date(2024, 9, 1, 0, 0, 0, 0, time.UTC),
			ValidUntil: time.Date(2024, 9, 30, 0, 0, 0, 0, time.UTC),
		},
	}

	for _, d := range discounts {
		if err := db.FirstOrCreate(&d, d.ID).Error; err != nil {
			log.Printf("❌ Error seeding discount: %v", err)
		}
	}

	// Billable Items
	billableItems := []entity.BillableItems{
		{Model: gorm.Model{ID: 1}, Description: "ค่าจ้างพาร์ทไทม์ร้านชาบู", Amount: 250},
		{Model: gorm.Model{ID: 2}, Description: "ค่าบริการแพลตฟอร์ม", Amount: 50},
	}

	for _, bi := range billableItems {
		if err := db.FirstOrCreate(&bi, bi.ID).Error; err != nil {
			log.Printf("❌ Error seeding billable item: %v", err)
		}
	}

	// ✅ Skills เริ่มต้นสำหรับนักศึกษาทำงานพาร์ทไทม์
	log.Println("🎯 Seeding Skills...")
	
	skills := []entity.Skill{
		// 🛍️ งานบริการและขาย
		{SkillName: "การให้บริการลูกค้า"},
		{SkillName: "การขาย"},
		{SkillName: "การรับออเดอร์"},
		{SkillName: "การทำงานร้านอาหาร"},
		{SkillName: "การชงกาแฟ"},
		{SkillName: "แคชเชียร์"},
		{SkillName: "การจัดของบนชั้น"},
		
		// 📊 งานออฟฟิศพื้นฐาน  
		{SkillName: "Microsoft Office"},
		{SkillName: "การพิมพ์เร็ว"},
		{SkillName: "Excel พื้นฐาน"},
		{SkillName: "PowerPoint"},
		{SkillName: "การจัดเอกสาร"},
		{SkillName: "การป้อนข้อมูล"},
		{SkillName: "การถ่ายเอกสาร"},
		
		// 🌐 งานออนไลน์และโซเชียล
		{SkillName: "Facebook Marketing"},
		{SkillName: "Instagram Marketing"},
		{SkillName: "TikTok Marketing"},
		{SkillName: "การถ่ายภาพสินค้า"},
		{SkillName: "การแก้ไขรูป Canva"},
		{SkillName: "การเขียน Content"},
		{SkillName: "การทำคลิปวิดีโอ"},
		{SkillName: "Live สด"},
		
		// 🗣️ ภาษาและการสื่อสาร
		{SkillName: "ภาษาอังกฤษพื้นฐาน"},
		{SkillName: "ภาษาอังกฤษสนทนา"},
		{SkillName: "การแปลภาษา"},
		{SkillName: "การเขียนภาษาไทย"},
		{SkillName: "การนำเสนอ"},
		{SkillName: "ภาษาจีน"},
		{SkillName: "ภาษาญี่ปุ่น"},
		{SkillName: "ภาษาเกาหลี"},
		
		// 📚 งานสอนและติว
		{SkillName: "สอนคณิต"},
		{SkillName: "สอนภาษาอังกฤษ"},
		{SkillName: "สอนภาษาไทย"},
		{SkillName: "สอนวิทยาศาสตร์"},
		{SkillName: "ติวเตอร์"},
		{SkillName: "ดูแลเด็ก"},
		{SkillName: "สอนดนตรี"},
		{SkillName: "สอนเต้น"},
		
		// 🎨 งานสร้างสรรค์
		{SkillName: "การถ่ายภาพ"},
		{SkillName: "การตัดต่อวิดีโอ"},
		{SkillName: "การออกแบบโปสเตอร์"},
		{SkillName: "การวาดรูป"},
		{SkillName: "การทำการ์ตูน"},
		{SkillName: "การเขียนเนื้อเพลง"},
		{SkillName: "การเล่นดนตรี"},
		{SkillName: "การร้องเพลง"},
		
		// 🚗 งานขนส่งและเดลิเวอรี่
		{SkillName: "ขับมอเตอร์ไซค์"},
		{SkillName: "ขับรถยนต์"},
		{SkillName: "เดลิเวอรี่อาหาร"},
		{SkillName: "รู้จักเส้นทาง"},
		{SkillName: "ขับ Grab"},
		{SkillName: "ขับ Foodpanda"},
		
		// 💻 IT และโปรแกรมมิ่งพื้นฐาน
		{SkillName: "HTML/CSS พื้นฐาน"},
		{SkillName: "Photoshop พื้นฐาน"},
		{SkillName: "การซ่อมคอมพิวเตอร์"},
		{SkillName: "การติดตั้งซอฟต์แวร์"},
		{SkillName: "การใช้ Google Workspace"},
		
		// 🏃‍♀️ งานกิจกรรมและอีเว้นท์
		{SkillName: "จัดงานอีเว้นท์"},
		{SkillName: "MC งาน"},
		{SkillName: "การประชาสัมพันธ์"},
		{SkillName: "การแจกแผ่นพับ"},
		{SkillName: "งานโปรโมชั่น"},
		{SkillName: "พิธีกรงาน"},
		
		// 🧹 งานบ้านและดูแล
		{SkillName: "ทำความสะอาดบ้าน"},
		{SkillName: "ดูแลผู้สูงอายุ"},
		{SkillName: "เดินสุนัข"},
		{SkillName: "ดูแลสัตว์เลี้ยง"},
		{SkillName: "ทำอาหารง่ายๆ"},
		{SkillName: "ซักรีด"},
		{SkillName: "จัดสวน"},
		
		// 🎯 ทักษะพิเศษอื่นๆ
		{SkillName: "การใช้เครื่องมือพื้นฐาน"},
		{SkillName: "การคิดเงินเร็ว"},
		{SkillName: "การจดจำใบหน้า"},
		{SkillName: "การยิ้มแย้มแจ่มใส"},
		{SkillName: "การทำงานกะดึก"},
		{SkillName: "การทำงานวันหยุด"},
		{SkillName: "ความอดทน"},
		{SkillName: "ความรับผิดชอบ"},
		{SkillName: "การทำงานเป็นทีม"},
		{SkillName: "การเรียนรู้เร็ว"},
	}

	// ✅ ใช้ transaction สำหรับ performance และ data consistency
	err := db.Transaction(func(tx *gorm.DB) error {
		createdCount := 0
		existingCount := 0
		
		for _, skill := range skills {
			var existingSkill entity.Skill
			
			// ตรวจสอบด้วย SkillName
			result := tx.Where("skill_name = ?", skill.SkillName).First(&existingSkill)
			
			if result.Error != nil {
				if result.Error == gorm.ErrRecordNotFound {
					// ไม่มีข้อมูลนี้ ให้สร้างใหม่
					if err := tx.Create(&skill).Error; err != nil {
						log.Printf("❌ Error creating skill '%s': %v", skill.SkillName, err)
						return err
					}
					createdCount++
					log.Printf("✅ Created skill: %s", skill.SkillName)
				} else {
					log.Printf("❌ Database error: %v", result.Error)
					return result.Error
				}
			} else {
				existingCount++
			}
		}
		
		log.Printf("🎯 Skills seeding summary: Created=%d, Existing=%d", createdCount, existingCount)
		return nil
	})

	if err != nil {
		log.Printf("❌ Error seeding skills: %v", err)
	} else {
		// ตรวจสอบจำนวน skills ทั้งหมดในฐานข้อมูล
		var count int64
		db.Model(&entity.Skill{}).Count(&count)
		log.Printf("🎉 Skills seeding completed! Total skills in database: %d", count)
	}

	// Users + Employer + Student (ตัวอย่าง)
	passwordEmp, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	passwordStd, _ := bcrypt.GenerateFromPassword([]byte("777777"), 14)
	users := []entity.User{
		{Model: gorm.Model{ID: 1}, Username: "hormok_hr", Password: string(passwordEmp), Role: "Employer"},
		{Model: gorm.Model{ID: 2}, Username: "panida_t", Password: string(passwordStd), Role: "Student"},
	}

	for _, u := range users {
		if err := db.FirstOrCreate(&u, u.ID).Error; err != nil {
			log.Printf("❌ Error seeding user: %v", err)
		}
	}

	// Employer
	birthdayEmp, _ := time.Parse("2006-01-02", "1990-05-15")
	employer := entity.Employer{
		Model: gorm.Model{ID: 1},
		Firstname: "พรศิริ",
		Lasttname: "ถาบุญศรี",
		Email: "hr@hormok.co.th",
		CompanyName: "ห่อหมก สตูดิโอ",
		ContactPerson: "คุณพรศิริ ถาบุญศรี",
		Birthday: birthdayEmp,
		Phone: "081-234-5678",
		Address: "123 มทส. ประตู 4 ต.สุรนารี อ.เมือง จ.นครราชสีมา",
		UserID: users[0].ID,
		GenderID: genders[0].ID,
	}
	if err := db.FirstOrCreate(&employer, employer.ID).Error; err != nil {
		log.Printf("❌ Error seeding employer: %v", err)
	}

	// Student
	birthdayStd, _ := time.Parse("2006-01-02", "2004-12-31")
	student := entity.Student{
		Model: gorm.Model{ID: 1},
		Email: "panida.t@gmail.com",
		FirstName: "พนิดา",
		LastName: "โต๊ะเหลือ",
		Birthday: birthdayStd,
		Age: 20,
		GPA: 3.5,
		Year: 3,
		Faculty: "วิศวกรรมศาสตร์",
		Phone: "081-234-2154",
		Skills: "เคยทำงานพาร์ทไทม์ร้านชาบู",
		UserID: users[1].ID,
		GenderID: genders[1].ID,
		BankAccount: "8630211849",
		BankID: banks[3].ID,
	}
	if err := db.FirstOrCreate(&student, student.ID).Error; err != nil {
		log.Printf("❌ Error seeding student: %v", err)
	}

	// Jobposts
	jobposts := []entity.Jobpost{
		{
			Model: gorm.Model{ID: 1},
			Title: "พาร์ทไทม์ร้านบ้านชาบู",
			Description: "ทำงานช่วงเย็น 17.00 - 20.00 น.",
			Status: "เปิดรับสมัคร",
			Salary: 250,
			EmployerID: employer.ID,
		},
		{
			Model: gorm.Model{ID: 2},
			Title: "ผู้ช่วยช่างภาพ",
			Description: "ถ่ายภาพสินค้าสำหรับลงเพจ",
			Status: "อนุมัติ",
			Salary: 600,
			EmployerID: employer.ID,
		},
	}

	for _, jp := range jobposts {
		if err := db.FirstOrCreate(&jp, jp.ID).Error; err != nil {
			log.Printf("❌ Error seeding jobpost: %v", err)
		}
	}

	// Payment
	payment1 := entity.Payments{
		Model: gorm.Model{ID: 1},
		Proof_of_Payment: "proof_01.jpg",
		Amount: billableItems[0].Amount,
		Datetime: time.Now().Add(-24 * time.Hour),
		BillableItemID: billableItems[0].ID,
		PaymentMethodID: paymentMethod.ID,
		StatusID: paymentStatuses[1].ID,
	}
	if err := db.FirstOrCreate(&payment1, payment1.ID).Error; err != nil {
		log.Printf("❌ Error seeding payment: %v", err)
	}

	log.Println("🌱 Database seeding completed successfully!")
}


