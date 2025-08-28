// src/services/studentPostService.ts

interface StudentPostPayload {
    introduction: string;
    job_type: string;
    portfolio_url: string;
    skills: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * สร้างโพสต์โปรไฟล์หางานใหม่โดยนักศึกษา (ต้องมีการยืนยันตัวตน)
 * @param postData - ข้อมูลของโพสต์
 */
export const createStudentProfilePost = async (postData: StudentPostPayload) => {
    // ✨ 1. ดึง Token มาจาก localStorage
    const token = localStorage.getItem('token');
    
    // ✨ 2. สร้าง Headers object
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // ✨ 3. ถ้ามี Token ให้เพิ่ม Authorization header เข้าไป
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/student-profile-posts`, {
        method: 'POST',
        headers: headers, // ✨ 4. ใช้ headers ที่เราสร้างขึ้น
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        // ถ้าไม่ได้รับอนุญาต (Unauthorized) อาจจะ redirect ไปหน้า login
        if (response.status === 401) {
            window.location.href = '/login';
        }
        const errorText = await response.text();
        throw new Error(`เกิดข้อผิดพลาดในการสร้างโพสต์: ${errorText}`);
    }
    return response.json();
};

/**
 * ดึงข้อมูลโพสต์โปรไฟล์ของนักศึกษาทั้งหมด (Public)
 */
export const getStudentProfilePosts = async () => {
    const response = await fetch(`${API_BASE_URL}/student-profile-posts`);
    if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลโพสต์ของนักศึกษาได้');
    }
    return response.json();
}