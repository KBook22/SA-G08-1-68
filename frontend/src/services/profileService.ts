// src/services/profileService.ts

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * ดึงข้อมูลโปรไฟล์ของตัวเอง (ต้องมี token)
 * ใช้ API GET /api/profile จาก backend
 */
export const getMyProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token หมดอายุหรือไม่ถูกต้อง
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Authentication failed. Please log in again.');
      }
      if (response.status === 404) {
        throw new Error('Profile not found');
      }

      const errorText = await response.text();
      throw new Error(`Failed to fetch profile: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getMyProfile:', error);
    throw error;
  }
};

/**
 * ดึงข้อมูลโปรไฟล์ของนักศึกษาตาม ID (สำหรับดูโปรไฟล์คนอื่น)
 * สำหรับตอนนี้ใช้ mock data เนื่องจาก API อาจยังไม่พร้อม
 */
export const getStudentProfileById = async (studentId: number) => {
  // TODO: เมื่อ backend พร้อม ให้ใช้ API จริง
  // const response = await fetch(`${API_BASE_URL}/students/${studentId}`);

  console.log(`🔍 Fetching student profile for ID: ${studentId}`);

  // Mock data สำหรับ demo - จะถูกแทนที่ด้วย API จริงในภายหลัง
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

  const mockStudent = {
    ID: studentId,
    id: studentId,
    first_name: `นักศึกษา${studentId}`,
    last_name: `ใจดี`,
    email: `student${studentId}@sut.ac.th`,
    phone: `08${studentId.toString().padStart(8, '0')}`,
    faculty: `คณะ${Math.ceil(studentId / 10)}`,
    year: (studentId % 4) + 1,
    gpa: 2.5 + (Math.random() * 1.5), // Random GPA 2.5-4.0
    skills: `JavaScript, Python, React, Node.js`,
    user_id: studentId,
    profile_image_url: null
  };

  return mockStudent;
};

/**
 * อัปเดตโปรไฟล์ของตัวเอง
 */
export const updateMyProfile = async (profileData: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Authentication failed. Please log in again.');
      }
      throw new Error(`Failed to update profile: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in updateMyProfile:', error);
    throw error;
  }
};