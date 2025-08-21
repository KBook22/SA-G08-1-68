// src/types.ts

// --- Post & Comment Types (จาก src2) ---
export interface Comment {
  id: number;
  author: string;
  text: string;
  createdAt?: number;
  imageUrl?: string;
  replies?: Comment[];
}

export interface Post {
  id: number;
  author: string;
  content: string;
  file?: File;
  image?: File;
  fileUrl?: string;
  fileName?: string;
  imageUrl?: string;
  imageName?: string;
  location?: { lat: number; lng: number };
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  createdAt?: number;
  privacy: 'public' | 'private';
}

// --- Q&A Types (รวมจาก src และ src2) ---
export interface Question {
  id: number;
  title: string;
  author: string;
  likes: number;
  answerCount: number;
  answers: Answer[];
  isFAQ?: boolean;
}

export interface Answer {
  id: number;
  author: string;
  text: string;
  isStaff: boolean;
  parentId?: number; // สำหรับการตอบกลับคอมเมนต์ย่อย
  createdAt?: number;
  imageUrl?: string;
  replyTo?: Answer; // สำหรับอ้างอิงข้อความที่ถูกตอบกลับ
}

// --- System Types (จาก src2) ---
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