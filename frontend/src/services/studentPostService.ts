// // src/services/studentPostService.ts

// interface StudentPostPayload {
//     introduction: string;
//     job_type: string;
//     portfolio_url: string;
//     skills: string;
// }

// const API_BASE_URL = 'http://localhost:8080/api';

// /**
//  * สร้างโพสต์โปรไฟล์หางานใหม่โดยนักศึกษา (ต้องมีการยืนยันตัวตน)
//  * @param postData - ข้อมูลของโพสต์
//  */
// export const createStudentProfilePost = async (postData: StudentPostPayload) => {
//     // ✨ 1. ดึง Token มาจาก localStorage
//     const token = localStorage.getItem('token');
    
//     // ✨ 2. สร้าง Headers object
//     const headers: HeadersInit = {
//         'Content-Type': 'application/json',
//     };

//     // ✨ 3. ถ้ามี Token ให้เพิ่ม Authorization header เข้าไป
//     if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//     }

//     const response = await fetch(`${API_BASE_URL}/student-profile-posts`, {
//         method: 'POST',
//         headers: headers, // ✨ 4. ใช้ headers ที่เราสร้างขึ้น
//         body: JSON.stringify(postData),
//     });

//     if (!response.ok) {
//         // ถ้าไม่ได้รับอนุญาต (Unauthorized) อาจจะ redirect ไปหน้า login
//         if (response.status === 401) {
//             window.location.href = '/login';
//         }
//         const errorText = await response.text();
//         throw new Error(`เกิดข้อผิดพลาดในการสร้างโพสต์: ${errorText}`);
//     }
//     return response.json();
// };

// /**
//  * ดึงข้อมูลโพสต์โปรไฟล์ของนักศึกษาทั้งหมด (Public)
//  */
// export const getStudentProfilePosts = async () => {
//     const response = await fetch(`${API_BASE_URL}/student-profile-posts`);
//     if (!response.ok) {
//         throw new Error('ไม่สามารถดึงข้อมูลโพสต์ของนักศึกษาได้');
//     }
//     return response.json();
// }

//// src/services/studentPostService.ts

// src/services/studentPostService.ts
interface StudentPostPayload {
    introduction: string;
    job_type: string;
    portfolio_url?: string;
    skills: string;
    phone?: string;
    email?: string;
    year?: number;
  }
  
  const API_BASE_URL = 'http://localhost:8080/api';
  
  /**
   * สร้างโพสต์โปรไฟล์หางานใหม่โดยนักศึกษา (ต้องมีการยืนยันตัวตน)
   */
  export const createStudentProfilePost = async (postData: StudentPostPayload) => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const response = await fetch(`${API_BASE_URL}/student-profile-posts`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(postData),
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed: Please log in again.');
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
    const response = await fetch(`${API_BASE_URL}/student-profile-posts`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลโพสต์ของนักศึกษาได้');
    }
  
    return response.json();
  };
  
  /**
   * ดึงโพสต์ของนักศึกษาตาม Student ID
   */
  export const getStudentProfilePostsByStudentId = async (studentId: number) => {
    const response = await fetch(`${API_BASE_URL}/student-profile-posts?student_id=${studentId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error(`ไม่สามารถดึงข้อมูลโพสต์ของนักศึกษา ID ${studentId} ได้`);
    }
  
    const data = await response.json();
    return data.data || data;
  };
  
  /**
   * อัปเดตโพสต์โปรไฟล์
   */
  export const updateStudentProfilePost = async (postId: number, postData: Partial<StudentPostPayload>) => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const response = await fetch(`${API_BASE_URL}/student-profile-posts/${postId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(postData),
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed: Please log in again.');
      }
      throw new Error('ไม่สามารถแก้ไขโพสต์ได้');
    }
  
    return response.json();
  };
  
  /**
   * ลบโพสต์โปรไฟล์
   */
  export const deleteStudentProfilePost = async (postId: number) => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const response = await fetch(`${API_BASE_URL}/student-profile-posts/${postId}`, {
      method: 'DELETE',
      headers: headers,
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed: Please log in again.');
      }
      throw new Error('ไม่สามารถลบโพสต์ได้');
    }
  
    return response.json();
  };