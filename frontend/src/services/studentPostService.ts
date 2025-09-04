// src/services/studentPostService.ts

// Interface สำหรับข้อมูลที่จะส่งไปสร้าง/อัปเดตโพสต์
interface StudentPostPayload {
  title: string;
  job_type: string;
  skills: string;
  availability: string;
  preferred_location: string;
  expected_compensation?: string;
  introduction: string;
  portfolio_url?: string;
  // ✅ เพิ่มฟิลด์สำหรับไฟล์แนบ
  attachment_url?: string;
  attachment_name?: string;
  attachment_type?: string;
  faculty_id?: number;
  department_id?: number;
}

const API_BASE_URL = 'http://localhost:8080/api';

// Helper function สำหรับสร้าง headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

/**
 * ดึงข้อมูลโพสต์ของนักศึกษาทั้งหมด (Public)
 */
export const getStudentPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/student-posts`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching student posts:', error);
    throw error;
  }
};

/**
 * สร้างโพสต์โปรไฟล์หางานใหม่ (Protected)
 */
export const createStudentPost = async (postData: StudentPostPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student-posts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating student post:', error);
    throw error;
  }
};

/**
 * อัปเดตโพสต์โปรไฟล์ (Protected)
 */
export const updateStudentPost = async (postId: number, updateData: Partial<StudentPostPayload>) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student-posts/${postId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating student post:', error);
    throw error;
  }
};

/**
 * ลบโพสต์โปรไฟล์ (Protected)
 */
export const deleteStudentPost = async (postId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student-posts/${postId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting student post:', error);
    throw error;
  }
};

/**
 * ดึงโพสต์ของตัวเอง (Protected)
 */
export const getMyStudentPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/my-posts`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch my posts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching my posts:', error);
    throw error;
  }
};

// Backward compatibility
export const getStudentProfilePosts = getStudentPosts;
export const createStudentProfilePost = createStudentPost;
export const updateStudentProfilePost = updateStudentPost;
export const deleteStudentProfilePost = deleteStudentPost;
