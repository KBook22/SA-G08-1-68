// import axios from "axios";
// import type { AxiosResponse, AxiosError } from "axios";
// import type { Employer, SignInEmployer } from "../../interfaces/employer";
// import type { Student, SignInStudent } from "../../interfaces/student";
// import type {
//   Review,
//   CreateReviewRequest,
//   FindReviewRequest,
// } from "../../interfaces/review";
// import type { Ratingscore } from "../../interfaces/ratingscore";
// import type { Jobpost } from "../../interfaces/jobpost";

// const API_URL = import.meta.env.VITE_API_KEY || "http://localhost:8088";

// const getCookie = (name: string): string | null => {
//   const cookies = document.cookie.split("; ");
//   const cookie = cookies.find((row) => row.startsWith(`${name}=`));

//   if (cookie) {
//     let AccessToken = decodeURIComponent(cookie.split("=")[1]);
//     AccessToken = AccessToken.replace(/\\/g, "").replace(/"/g, "");
//     return AccessToken ? AccessToken : null;
//   }
//   return null;
// };

// const getConfig = () => ({
//   headers: {
//     Authorization: `Bearer ${getCookie("auth_token")}`, // Using a generic cookie name
//     "Content-Type": "application/json",
//   },
// });

// const getConfigWithoutAuth = () => ({
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const Post = async (
//   url: string,
//   data: any,
//   requireAuth: boolean = true
// ): Promise<AxiosResponse | any> => {
//   const config = requireAuth ? getConfig() : getConfigWithoutAuth();
//   return await axios
//     .post(`${API_URL}${url}`, data, config)
//     .then((res) => res)
//     .catch((error: AxiosError) => {
//       if (error?.response?.status === 401) {
//         localStorage.clear();
//         window.location.reload();
//       }
//       return error.response;
//     });
// };

// export const Get = async (
//   url: string,
//   requireAuth: boolean = true
// ): Promise<AxiosResponse | any> => {
//   const config = requireAuth ? getConfig() : getConfigWithoutAuth();
//   return await axios
//     .get(`${API_URL}${url}`, config)
//     .then((res) => res.data)
//     .catch((error: AxiosError) => {
//       if (error?.message === "Network Error") {
//         return error.response;
//       }
//       if (error?.response?.status === 401) {
//         localStorage.clear();
//         window.location.reload();
//       }
//       return error.response;
//     });
// };

// export const Update = async (
//   url: string,
//   data: any,
//   requireAuth: boolean = true
// ): Promise<AxiosResponse | any> => {
//   const config = requireAuth ? getConfig() : getConfigWithoutAuth();
//   return await axios
//     .put(`${API_URL}${url}`, data, config)
//     .then((res) => res.data)
//     .catch((error: AxiosError) => {
//       if (error?.response?.status === 401) {
//         localStorage.clear();
//         window.location.reload();
//       }
//       return error.response;
//     });
// };

// export const Delete = async (
//   url: string,
//   requireAuth: boolean = true
// ): Promise<AxiosResponse | any> => {
//   const config = requireAuth ? getConfig() : getConfigWithoutAuth();
//   return await axios
//     .delete(`${API_URL}${url}`, config)
//     .then((res) => res.data)
//     .catch((error: AxiosError) => {
//       if (error?.response?.status === 401) {
//         localStorage.clear();
//         window.location.reload();
//       }
//       return error.response;
//     });
// };

// // Authentication APIs
// export const authAPI = {
//   studentLogin: (data: SignInStudent) =>
//     Post("/auth/student/login", data, false),
//   employerLogin: (data: { email: string; password?: string }) =>
//     Post("/auth/employer/login", data, false),
// };

// // Student APIs
// export const studentAPI = {
//   signup: (data: Student) => Post("/students", data, false),
//   getAll: () => Get("/students"),
//   getById: (id: number) => Get(`/students/${id}`),
//   update: (id: number, data: Partial<Student>) =>
//     Update(`/students/${id}`, data),
//   delete: (id: number) => Delete(`/students/${id}`),
// };

// // Employer APIs
// export const employerAPI = {
//   signup: (data: Employer) => Post("/employers", data, false),
//   getAll: () => Get("/employers"),
//   getById: (id: number) => Get(`/employers/${id}`),
//   update: (id: number, data: Partial<Employer>) =>
//     Update(`/employers/${id}`, data),
//   delete: (id: number) => Delete(`/employers/${id}`),
// };

// // Review APIs
// export const reviewAPI = {
//   create: (data: CreateReviewRequest) => Post("/reviews", data),
//   find: (data: FindReviewRequest) => Post("/reviews/find", data),
//   getForJob: (jobId: number) => Get(`/reviews/job/${jobId}`),
// };

// // Rating Score APIs
// export const ratingScoreAPI = {
//   getAll: (): Promise<Ratingscore[]> => Get("/ratingscores"),
// };

// // Job Post APIs
// export const jobpostAPI = {
//   create: (data: Jobpost) => Post("/jobposts", data),
//   getAll: () => Get("/jobposts"),
//   getById: (id: number) => Get(`/jobposts/${id}`),
//   update: (id: number, data: Partial<Jobpost>) => Update(`/jobposts/${id}`, data),
//   delete: (id: number) => Delete(`/jobposts/${id}`),
// };

// // Payment APIs
// export const paymentAPI = {
//   getAll: () => Get("/payments"),
//   getById: (id: number) => Get(`/payment/${id}`),
//   create: (data: any) => Post("/payment", data),
// };

import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import type { Employer, SignInEmployer } from "../../interfaces/employer";
import type { Student, SignInStudent } from "../../interfaces/student";
import type {
  Review,
  CreateReviewRequest,
  FindReviewRequest,
} from "../../interfaces/review";
import type { Ratingscore } from "../../interfaces/ratingscore";
import type { Jobpost } from "../../interfaces/jobpost";

const API_URL = import.meta.env.VITE_API_KEY || "http://localhost:8088";

// ❗***โค้ดที่แก้ไข: กลับมาใช้ฟังก์ชัน getCookie***
const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

const getConfig = () => ({
  headers: {
    // ใช้ชื่อ cookie ว่า 'auth_token'
    Authorization: `Bearer ${getCookie("auth_token")}`,
    "Content-Type": "application/json",
  },
});

const getConfigWithoutAuth = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});

export const Post = async (
  url: string,
  data: any,
  requireAuth: boolean = true
): Promise<AxiosResponse | any> => {
  const config = requireAuth ? getConfig() : getConfigWithoutAuth();
  return await axios
    .post(`${API_URL}${url}`, data, config)
    .then((res) => res)
    .catch((error: AxiosError) => {
      if (error?.response?.status === 401) {
        // เมื่อไม่ได้รับอนุญาต ให้ล้าง cookie และ localStorage
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        window.location.reload();
      }
      return error.response;
    });
};

export const Get = async (
  url: string,
  requireAuth: boolean = true
): Promise<AxiosResponse | any> => {
  const config = requireAuth ? getConfig() : getConfigWithoutAuth();
  return await axios
    .get(`${API_URL}${url}`, config)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      if (error?.message === "Network Error") {
        return error.response;
      }
      if (error?.response?.status === 401) {
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        window.location.reload();
      }
      return error.response;
    });
};

// ... ส่วนของ Update และ Delete จะคล้ายกัน ...
export const Update = async (
  url: string,
  data: any,
  requireAuth: boolean = true
): Promise<AxiosResponse | any> => {
  const config = requireAuth ? getConfig() : getConfigWithoutAuth();
  return await axios
    .put(`${API_URL}${url}`, data, config)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      if (error?.response?.status === 401) {
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        window.location.reload();
      }
      return error.response;
    });
};

export const Delete = async (
  url: string,
  requireAuth: boolean = true
): Promise<AxiosResponse | any> => {
  const config = requireAuth ? getConfig() : getConfigWithoutAuth();
  return await axios
    .delete(`${API_URL}${url}`, config)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      if (error?.response?.status === 401) {
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        window.location.reload();
      }
      return error.response;
    });
};


// --- ส่วนของ API ต่างๆ เหมือนเดิม ---
// Authentication APIs
export const authAPI = {
  studentLogin: (data: SignInStudent) =>
    Post("/auth/student/login", data, false),
  employerLogin: (data: { email: string; password?: string }) =>
    Post("/auth/employer/login", data, false),
};

// Student APIs
export const studentAPI = {
  signup: (data: Student) => Post("/students", data, false),
  getAll: () => Get("/students"),
  getById: (id: number) => Get(`/students/${id}`),
  update: (id: number, data: Partial<Student>) =>
    Update(`/students/${id}`, data),
  delete: (id: number) => Delete(`/students/${id}`),
};

// Employer APIs
export const employerAPI = {
  signup: (data: Employer) => Post("/employers", data, false),
  getAll: () => Get("/employers"),
  getById: (id: number) => Get(`/employers/${id}`),
  update: (id: number, data: Partial<Employer>) =>
    Update(`/employers/${id}`, data),
  delete: (id: number) => Delete(`/employers/${id}`),
};

// Review APIs
export const reviewAPI = {
  create: (data: CreateReviewRequest) => Post("/reviews", data),
  find: (data: FindReviewRequest) => Post("/reviews/find", data),
  getForJob: (jobId: number) => Get(`/reviews/job/${jobId}`),
};

// Rating Score APIs
export const ratingScoreAPI = {
  getAll: (): Promise<Ratingscore[]> => Get("/ratingscores"),
};

// Job Post APIs
export const jobpostAPI = {
  create: (data: Jobpost) => Post("/jobposts", data),
  getAll: () => Get("/jobposts"),
  getById: (id: number) => Get(`/jobposts/${id}`),
  update: (id: number, data: Partial<Jobpost>) => Update(`/jobposts/${id}`, data),
  delete: (id: number) => Delete(`/jobposts/${id}`),
};

// Payment APIs
export const paymentAPI = {
  getAll: () => Get("/payments"),
  getById: (id: number) => Get(`/payment/${id}`),
  create: (data: any) => Post("/payment", data),
};

export const api = {
  auth: authAPI,
  student: studentAPI,
  employer: employerAPI,
  review: reviewAPI,
  ratingScore: ratingScoreAPI,
  jobpost: jobpostAPI,
  payment: paymentAPI,
  getStudentProfile: studentAPI.getById, // สร้าง alias ให้เหมือนที่เรียกใช้
  updateStudentProfile: studentAPI.update, // สร้าง alias ให้เหมือนที่เรียกใช้
};

