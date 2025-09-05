// backend/controller/upload_controller.go
package controller

import (
	"fmt"
	"io"
	"net/http"
	"path/filepath"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func UploadToSupabase(c *gin.Context) {
	// ✅ ตั้งค่า CORS headers ให้ครบถ้วน
	c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
	c.Header("Access-Control-Allow-Methods", "POST, OPTIONS")
	c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, Accept, X-Requested-With")
	c.Header("Access-Control-Allow-Credentials", "true")

	// ✅ Handle preflight OPTIONS request
	if c.Request.Method == "OPTIONS" {
		c.Status(204)
		return
	}

	// ✅ ใช้ userID แบบ optional สำหรับ public route
	var userID uint = 999 // default user ID
	
	// ถ้ามี authentication ให้ใช้ userID จริง
	if userIDValue, ok := c.Get("userID"); ok {
		if uid, ok := userIDValue.(uint); ok {
			userID = uid
		}
	}

	// จำกัดขนาด ~10MB
	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 10<<20)
	
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("No file: %v", err),
			"success": false,
		})
		return
	}
	defer file.Close()

	// ✅ ขยายประเภทไฟล์ที่รองรับ
	allowedExts := map[string]bool{
		".jpg":  true,
		".jpeg": true,
		".png":  true,
		".gif":  true,
		".webp": true,
		".bmp":  true,
		".pdf":  true,
		".doc":  true,
		".docx": true,
	}

	ext := strings.ToLower(filepath.Ext(header.Filename))
	if ext == "" {
		ext = ".jpg" // default extension
	}

	if !allowedExts[ext] {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Only image and document files allowed (jpg, jpeg, png, gif, webp, bmp, pdf, doc, docx)",
			"success": false,
		})
		return
	}

	// ✅ เพิ่ม logging สำหรับ debug
	fmt.Printf("📤 Uploading file: %s, size: %d, type: %s\n", header.Filename, header.Size, header.Header.Get("Content-Type"))

	// สร้างชื่อไฟล์ใหม่
	object := fmt.Sprintf("uploads/%d/%s%s", userID, uuid.NewString(), ext)
	
	// ✅ ใช้ Service Role Key ของคุณ
	supaURL := "https://vradregemjntlybcyhaa.supabase.co"
	svcKey := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyYWRyZWdlbWpudGx5YmN5aGFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjkzNTk3NSwiZXhwIjoyMDcyNTExOTc1fQ.Pjeo4kmJjni1Qbo4FubUy7ZNaBlJ-EnqoN3hB_dxryk"
	bucket := "SA-G08-1-68"

	// สร้าง request ไป Supabase
	req, err := http.NewRequest("POST",
		fmt.Sprintf("%s/storage/v1/object/%s/%s", supaURL, bucket, object),
		file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create request",
			"success": false,
		})
		return
	}

	req.Header.Set("Authorization", "Bearer "+svcKey)
	req.Header.Set("Content-Type", header.Header.Get("Content-Type"))
	req.Header.Set("x-upsert", "true")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("❌ Supabase upload error: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Upload error: %v", err),
			"success": false,
		})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		b, _ := io.ReadAll(resp.Body)
		fmt.Printf("❌ Supabase error response: %s\n", string(b))
		c.JSON(resp.StatusCode, gin.H{
			"error": fmt.Sprintf("Supabase error: %s", string(b)),
			"success": false,
		})
		return
	}

	// URL สำหรับเข้าถึงไฟล์
	publicURL := fmt.Sprintf("%s/storage/v1/object/public/%s/%s", supaURL, bucket, object)
	
	fmt.Printf("✅ Upload successful: %s\n", publicURL)
	
	c.JSON(http.StatusOK, gin.H{
		"url":     publicURL,
		"path":    object,
		"message": "Upload successful",
		"success": true,
	})
}
