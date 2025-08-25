package config

import "golang.org/x/crypto/bcrypt"

// HashPassword เป็น function สำหรับการแปลง password ให้เป็น hash
func HashPassword(password string) (string, error) {
   bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
   return string(bytes), err
}

// CheckPasswordHash เป็น function สำหรับ check password ที่ hash แล้ว ว่าตรงกันหรือไม่
func CheckPasswordHash(password, hash string) bool {
   err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
   return err == nil
}