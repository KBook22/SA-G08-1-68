export interface User {
  ID: number;
  username: string;
}

export interface Bank {
  bank_name: string;
}

export interface Student {
  ID: number;
  first_name: string;
  last_name: string;
  phone: string;
  user: User;
  bank: Bank;
}

export interface JobApplication {
  ID: number;
  application_status: string;
  application_reason: string;
  Student: Student;
}

export interface JobPost {
  ID: number;
  title: string;
  Employer?: {
    company_name?: string;
  };
  image_url?: string;
}
