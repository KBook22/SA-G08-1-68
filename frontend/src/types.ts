// src/types.ts
export interface Question {
    id: number;
    title: string;
    author: string;
    likes: number;
    answerCount: number;
    answers: Answer[];
    isFAQ?: boolean; // เพิ่ม property นี้
  }
  
  export interface Answer {
    id: number;
    author: string;
    text: string;
    isStaff: boolean;
  }