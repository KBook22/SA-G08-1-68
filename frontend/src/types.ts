// src/types.ts

// ===== Comment =====
export interface Comment {
  id: number;
  author: string;
  authorId: string;
  text: string;
  createdAt?: number;
  imageUrl?: string;
  parentId?: number;
  replies?: Comment[];
}

// ===== Post =====
export interface Post {
  id: number;
  author: string;
  authorId: string;
  content: string;
  skills: string[];                // ✅ ใช้ array เสมอ (ค่าว่าง = [])
  fileUrl?: string;
  fileName?: string;
  imageUrl?: string;
  imageName?: string;
  location?: { lat: number; lng: number };
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  createdAt: number;
  privacy: 'public' | 'private';
}

// ===== Q&A =====
export interface Answer {
  id: number;
  author: string;
  text: string;
  isStaff: boolean;
  parentId?: number;
  createdAt?: number;
  imageUrl?: string;
  replyTo?: Answer;
}

export interface Question {
  id: number;
  title: string;
  author: string;
  likes: number;
  answerCount: number;
  answers: Answer[];
  isFAQ?: boolean;
}

// ===== Notification / Report =====
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
