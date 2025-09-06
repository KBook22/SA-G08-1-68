// User ของ Student
export interface User {
  ID: number;
  username: string;
}

// ข้อมูลธนาคาร
export interface Bank {
  bank_name: string;
}

// ข้อมูลนักศึกษา
export interface Student {
  ID: number;
  first_name: string;
  last_name: string;
  phone: string;
  user: User;
  bank: Bank;
}

// ข้อมูลบริษัท
export interface Employer {
  company_name: string;
  logo?: string; // optional, ถ้ามีโลโก้
}

// ข้อมูลประกาศงาน
export interface JobPost {
  ID: number;
  title: string;
  Employer: Employer;
  image_url?: string;
}

// ข้อมูลการสมัครงาน
export interface JobApplication {
  ID: number;
  application_status: string;   // Pending / InterviewPending / Accepted / Rejected
  application_reason: string;
  CreatedAt: string;
  JobPost: JobPost;
  Student: Student;
}
