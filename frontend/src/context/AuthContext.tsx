// // src/context/AuthContext.tsx
// import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface User {
//     id: number;
//     username: string;
//     role: string;
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     login: (userData: User, token: string) => void;
//     logout: () => void;
//     isAuthenticated: boolean;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         // แค่เช็คว่ามี user และ token ใน localStorage ก็พอ
//         if (storedUser && token) {
//             setUser(JSON.parse(storedUser));
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [token]);
//     //...

//     const login = (userData: User, token: string) => {
//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('token', token);
//         setUser(userData);
//         setToken(token);
//     };

//     const logout = () => {
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         setUser(null);
//         setToken(null);
//         navigate('/login');
//     };

//     const isAuthenticated = !!token;

//     return (
//         <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// src/context/AuthContext.tsx
// import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom'; // 👈 1. ลบบรรทัดนี้ทิ้งไปเลย

// interface User {
//     id: number;
//     username: string;
//     role: string;
//     // เพิ่ม field อื่นๆ ที่อาจมีใน user object
//     name?: string;
//     email?: string;
//     tel?: string;
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     login: (userData: User, token: string) => void;
//     logout: () => void;
//     isAuthenticated: boolean;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
//     // const navigate = useNavigate(); // 👈 2. ลบบรรทัดนี้ทิ้งไปด้วย

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser && token) {
//             try {
//                 setUser(JSON.parse(storedUser));
//             } catch (error) {
//                 console.error("Failed to parse user data from localStorage", error);
//                 logout();
//             }
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [token]);

//     const login = (userData: User, token: string) => {
//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('token', token);
//         setUser(userData);
//         setToken(token);
//     };

//     const logout = () => {
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         setUser(null);
//         setToken(null);
//         // navigate('/login'); // 👈 3. เปลี่ยนจาก navigate
//         window.location.href = '/login'; // 👈 มาใช้คำสั่งนี้แทน
//     };

//     const isAuthenticated = !!token;

//     return (
//         <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // src/context/AuthContext.tsx
// import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';

// interface User {
//   id: number;
//   username: string;
//   role: string;
//   // เพิ่ม field อื่นๆ ที่ backend ส่งมาได้
//   name?: string;
//   email?: string;
//   tel?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (userData: User, token: string) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser && token) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error("Failed to parse user data from localStorage", error);
//         logout();
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   const login = (userData: User, token: string) => {
//     // ✅ เก็บ user และ token ใน localStorage
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', token);

//     // ✅ เก็บ token ใน cookie (service API จะอ่านจากตรงนี้)
//     document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24}`;

//     setUser(userData);
//     setToken(token);
//   };

//   const logout = () => {
//     // ✅ ลบข้อมูลจาก localStorage
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');

//     // ✅ ลบ cookie
//     document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//     setUser(null);
//     setToken(null);

//     // ✅ redirect ไปหน้า login
//     window.location.href = '/login';
//   };

//   const isAuthenticated = !!token;

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';

interface User {
  id: number;
  username: string;
  role: string;
  name?: string;
  email?: string;
  tel?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  // ✨ vvvv โค้ดที่แก้ไข vvvv ✨
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    // อ่าน token จาก state ที่ได้ค่าเริ่มต้นจาก localStorage
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        // ✅ **[จุดสำคัญ]** สั่งให้สร้าง cookie ขึ้นมาใหม่ทุกครั้งที่โหลดหน้า
        // เพื่อให้แน่ใจว่า API service จะมี cookie ให้อ่านเสมอ
        document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24}`; // ตั้งอายุ cookie 24 ชั่วโมง
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        logout(); // ถ้าข้อมูลใน localStorage ผิดพลาด ให้ทำการ logout
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // ทำงานเมื่อ token มีการเปลี่ยนแปลง

  const login = (userData: User, token: string) => {
    // บันทึกข้อมูลลง localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);

    // สร้าง cookie
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24}`;

    // อัปเดต state
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    // ลบข้อมูลจาก localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // ลบ cookie
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // รีเซ็ต state
    setUser(null);
    setToken(null);

    // กลับไปหน้า login
    window.location.href = '/login';
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};