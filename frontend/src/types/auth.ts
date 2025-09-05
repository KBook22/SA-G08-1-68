// src/types/auth.ts
export interface User {
    ID?: number;           // ✅ Backend format (Go struct)
    id?: number;           // ✅ Alternative format
    user_id?: number;      // ✅ เพิ่ม user_id
    username?: string;
    email?: string;
    role?: string;
    first_name?: string;
    last_name?: string;
    // เพิ่ม properties ที่จำเป็น
    profile_image_url?: string;
    faculty?: string;
    year?: number;
    phone?: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    loading: boolean;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  