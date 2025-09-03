export interface StudentProfilePost {
  ID: number;
  introduction: string;
  job_type: string;
  phone: string;
  email: string;
  skills: string;
  portfolio_url?: string;
  year: number;
  student_id: number;

  // nested
  student?: Student;
  faculty?: Faculty;
  department?: Department;
}

export interface Student {
  ID: number;
  // ถ้า backend ยังไม่ส่ง first_name / last_name จริง ๆ อาจต้องแก้ backend
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
}

export interface Faculty {
  ID: number;
  faculty_id: number;
}

export interface Department {
  ID: number;
  department_id: number;
}
