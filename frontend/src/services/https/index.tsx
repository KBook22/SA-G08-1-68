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

const API_URL = import.meta.env.VITE_API_KEY || "http://localhost:8080";

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));

  if (cookie) {
    let AccessToken = decodeURIComponent(cookie.split("=")[1]);
    AccessToken = AccessToken.replace(/\\/g, "").replace(/"/g, "");
    return AccessToken ? AccessToken : null;
  }
  return null;
};

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getCookie("auth_token")}`, // Using a generic cookie name
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
        localStorage.clear();
        window.location.reload();
      }
      return error.response;
    });
};

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
        localStorage.clear();
        window.location.reload();
      }
      return error.response;
    });
};

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
  update: (id: number, data: Partial<Jobpost>) =>
    Update(`/jobposts/${id}`, data),
  delete: (id: number) => Delete(`/jobposts/${id}`),

  // เพิ่ม uploadPortfolio
  uploadPortfolio: (file: File) => {
    const formData = new FormData();
    formData.append("portfolio", file);

    return axios.post(`${API_URL}/jobposts/upload-portfolio`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// Job Category APIs
export const jobCategoryAPI = {
  getAll: () => Get("/jobcategories", false),   // ดึงหมวดหมู่ทั้งหมด
  getById: (id: number) => Get(`/jobcategories/${id}`, false),
};

// Job employmentType APIs
export const employmentTypeAPI = {
  getAll: () => Get("/employmenttypes", false),   // ดึงหมวดหมู่ทั้งหมด
  getById: (id: number) => Get(`/employmenttypes/${id}`, false),
};

// Payment APIs
export const paymentAPI = {
  getAll: () => Get("/payments"),
  getById: (id: number) => Get(`/payment/${id}`),
  create: (data: any) => Post("/payment", data),
};