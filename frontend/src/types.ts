// src/types.ts

// ===== Core Models =====
export interface User {
  ID: number;
  username: string;
  role: 'student' | 'employer' | 'admin';
}

// ===== Student Profile & Posts (ข้อมูลและโพสต์ของนักศึกษา) =====
export interface Student {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    faculty: string;
    year: string;
    skills: string;
}

export interface StudentProfilePost {
  ID: number;
  CreatedAt: string;
  introduction: string;
  job_type: string;
  portfolio_url?: string;
  skills: string;
  student: Student;
}

// ✨ แก้ไข Interface ที่นี่
export interface ProfileResponse {
    student: Student; // เปลี่ยนจาก student_info -> student
    posts: StudentProfilePost[];
}


// ===== Job Offers (ประกาศงานจากผู้ประกอบการ) =====
export interface JobOffer {
    ID: number;
    title: string;
    description: string;
    deadline: string;
    salary: number;
}

// ===== Feed Posts & Comments (สำหรับฟีดข่าวทั่วไป) =====
export interface Comment {
  ID: number;
  CreatedAt: string;
  text: string;
  author: string;
  authorId: string;
  likes: number;
  isLiked: boolean;
  feed_post_id: number; 
  parentId?: number;
  replies?: Comment[];
}

export interface FeedPost {
  ID: number;
  CreatedAt: string;
  author: string;
  authorId: string;
  content: string;
  skills: string[];
  imageUrl?: string;
  fileName?: string;
  likes: number;
  isLiked: boolean;
  privacy: 'public' | 'private';
  userId: string;
  Comments: Comment[];
}


// ===== Q&A System (ระบบถาม-ตอบ และส่งคำร้อง) =====
export interface FAQ {
  ID: number;
  CreatedAt: string;
  title: string;
  content: string;
}

export interface TicketReply {
    ID: number;
    CreatedAt: string;
    message: string;
    is_staff_reply: boolean;
    author: User;
}

export interface RequestTicket {
    ID: number;
    CreatedAt: string;
    subject: string;
    initial_message: string;
    status: 'Open' | 'In Progress' | 'Awaiting Confirmation' | 'Resolved';
    user: User;
    replies: TicketReply[];
}


// ===== Notification & Report (การแจ้งเตือนและรายงาน) =====
export interface Notification {
  id: number;
  message: string;
  read: boolean;
  link?: string;
  timestamp: number;
}

export interface Report {
  id: number;
  postId: number;
  postAuthor: string;
  postContent: string;
  reason: string;
  details: string;
  reportedBy: string;
  timestamp: number;
}