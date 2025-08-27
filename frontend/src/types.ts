// src/types.ts

// ===== Core Models =====
export interface User {
  ID: number;
  username: string;
  role: 'student' | 'employer';
}

// ===== Comment & Post =====
export interface Comment {
  ID: number;
  CreatedAt: string;
  text: string;
  author: string;
  authorId: string;
  likes: number;
  isLiked: boolean;
  jobPostingId: number;
  parentId?: number;
  replies?: Comment[];
}

export interface Post {
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

// ===== Q&A System (โครงสร้างใหม่) =====
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
    // --- Updated status types ---
    status: 'Open' | 'In Progress' | 'Awaiting Confirmation' | 'Resolved';
    user: User;
    replies: TicketReply[];
}


// ===== Notification & Report =====
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