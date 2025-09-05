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
import type { AxiosError, AxiosRequestConfig } from "axios";

import type { Employer } from "../../interfaces/employer";
import type { Student } from "../../interfaces/student";
import type {
  CreateReviewPayload,
  FindReviewRequest,
} from "../../interfaces/review";
import type { Discount } from "../../interfaces/discount";
import type { Ratingscore } from "../../interfaces/ratingscore";
import type { Jobpost, CreateJobpost } from "../../interfaces/jobpost";
import type { Payment, CreatePaymentPayload } from "../../interfaces/payment";
import type { Order } from "../../interfaces/order";
import type { EmploymentType } from "../../interfaces/employment_type";
import type { JobCategory } from "../../interfaces/job_category";
import type { SalaryType } from "../../interfaces/salary_type";
import type { SignInCommon } from "../../interfaces/user";

/** ใช้ VITE_API_KEY เป็น baseURL */
const API_URL = import.meta.env.VITE_API_KEY || "http://localhost:8080/api";

/** build URL ให้สะอาด */
const buildUrl = (path: string) =>
  `${API_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

/** ดึง token จาก cookie/localStorage */
const getAuthToken = (): string | null => {
  const cookies = (typeof document !== "undefined" ? document.cookie : "")
    .split("; ")
    .filter(Boolean);
  const cookie = cookies.find((row) => row.startsWith("auth_token="));
  if (cookie) {
    let token = decodeURIComponent(cookie.split("=")[1] || "");
    token = token.replace(/\\/g, "").replace(/"/g, "");
    if (token) return token;
  }
  return (
    (typeof localStorage !== "undefined" && localStorage.getItem("token")) ||
    (typeof localStorage !== "undefined" && localStorage.getItem("auth_token")) ||
    null
  );
};

const getAuthConfig = () => {
  const token = getAuthToken();
  return {
    withCredentials: true,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
  };
};

const getNoAuthConfig = () => ({
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/* -------------------- axios instance -------------------- */
const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* -------------------- error handling -------------------- */
type ReqOpts = {
  silent?: boolean;
  silent404?: boolean;
};

const handleApiError = (error: AxiosError, opts?: ReqOpts): never => {
  const status = error.response?.status;

  if (status === 401) {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      document.cookie = "auth_token=; Path=/; Max-Age=0; SameSite=Lax";
    } catch {}
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }

  if (opts?.silent404 && status === 404) {
    const err: any = new Error(
      (error.response?.data as any)?.error || "Not Found"
    );
    err.status = 404;
    err.response = error.response;
    throw err;
  }

  if (!opts?.silent) {
    const msg =
      (error.response?.data as any)?.error ||
      error.message ||
      "API error";
    console.debug("API call failed:", msg, "(status:", status + ")");
  }

  const err: any = new Error(
    (error.response?.data as any)?.error || error.message || "API error"
  );
  err.status = status;
  err.response = error.response;
  err.data = error.response?.data;
  throw err;
};

/* -------------------- generic methods -------------------- */
export async function Get<T = any>(
  url: string,
  requireAuth: boolean = true,
  opts?: ReqOpts,
  config?: AxiosRequestConfig
): Promise<T> {
  const cfg = { ...(requireAuth ? getAuthConfig() : getNoAuthConfig()), ...(config || {}) };
  try {
    const res = await http.get(buildUrl(url), cfg);
    return res.data as T;
  } catch (error) {
    return handleApiError(error as AxiosError, opts);
  }
}

export async function Post<T = any>(
  url: string,
  data?: any,
  requireAuth: boolean = true,
  opts?: ReqOpts,
  config?: AxiosRequestConfig
): Promise<T> {
  const cfg = { ...(requireAuth ? getAuthConfig() : getNoAuthConfig()), ...(config || {}) };
  try {
    const res = await http.post(buildUrl(url), data, cfg);
    return res.data as T;
  } catch (error) {
    return handleApiError(error as AxiosError, opts);
  }
}

export async function Update<T = any>(
  url: string,
  data: any,
  requireAuth: boolean = true,
  opts?: ReqOpts,
  config?: AxiosRequestConfig
): Promise<T> {
  const cfg = { ...(requireAuth ? getAuthConfig() : getNoAuthConfig()), ...(config || {}) };
  try {
    const res = await http.put(buildUrl(url), data, cfg);
    return res.data as T;
  } catch (error) {
    return handleApiError(error as AxiosError, opts);
  }
}

export async function DeleteReq<T = any>(
  url: string,
  requireAuth: boolean = true,
  opts?: ReqOpts,
  config?: AxiosRequestConfig
): Promise<T> {
  const cfg = { ...(requireAuth ? getAuthConfig() : getNoAuthConfig()), ...(config || {}) };
  try {
    const res = await http.delete(buildUrl(url), cfg);
    return res.data as T;
  } catch (error) {
    return handleApiError(error as AxiosError, opts);
  }
}

/* -------------------- APIs -------------------- */
export const authAPI = {
  login: (data: SignInCommon) => Post("/login", data, false),
};

export const studentAPI = {
  signup: (data: Student) => Post("/students", data, false),
  getAll: () => Get("/students"),
  getById: (id: number) => Get(`/students/${id}`),
  update: (id: number, data: Partial<Student>) => Update(`/students/${id}`, data),
  delete: (id: number) => DeleteReq(`/students/${id}`),
};

export const employerAPI = {
  signup: (data: Employer) => Post("/employers", data, false),
  getAll: () => Get("/employers"),
  getById: (id: number) => Get(`/employers/${id}`),
  update: (id: number, data: Partial<Employer>) => Update(`/employers/${id}`, data),
  delete: (id: number) => DeleteReq(`/employers/${id}`),
};

export const jobpostAPI = {
  create: (data: Jobpost) => Post("/jobposts", data),
  getAll: () => Get("/jobposts"),
  getById: (id: number): Promise<{ data: Jobpost }> =>
    Get<{ data: Jobpost }>(`/jobposts/${id}`),
  getByEmployerId: (id: number): Promise<{ data: Jobpost[] }> =>
    Get<{ data: Jobpost[] }>(`/jobposts/employer/${id}`),
  update: (id: number, data: Partial<Jobpost>) => Update(`/jobposts/${id}`, data),
  delete: (id: number) => DeleteReq(`/jobposts/${id}`),
  getMyPosts: () => Get("/api/employer/myposts"),
  uploadPortfolio: (id: number, file: File) => {
    const formData = new FormData();
    formData.append("portfolio", file);
    const token = getAuthToken();
    return axios.post(
      buildUrl(`/api/jobposts/upload-portfolio/${id}`),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
  },
};

export const jobApplicationAPI = {
  init: (jobpost_id: number) => Get(`/api/jobapplications/init/${jobpost_id}`),
  create: (data: any) => Post(`/api/jobapplications`, data),
  getMyApplications: () => Get(`/api/jobapplications/me`),
  getByJobPost: (jobpost_id: number) => Get(`/api/jobapplications/job/${jobpost_id}`),
  updateStatus: (id: number, status: string) =>
    Update(`/api/jobapplications/${id}/status`, { status }),
};

export const reviewAPI = {
  create: (data: CreateReviewPayload) => Post("/reviews", data),
  find: (data: FindReviewRequest) => Post("/reviews/find", data),
  getForJob: (jobId: number) => Get(`/reviews/job/${jobId}`),
};

export const ratingScoreAPI = {
  getAll: (): Promise<{ data: Ratingscore[] }> =>
    Get<{ data: Ratingscore[] }>(`/reviews/scores`),
};

export const employmentTypeAPI = {
  getAll: (): Promise<{ data: EmploymentType[] }> => Get("/employment-types"),
};

export const jobCategoryAPI = {
  getAll: (): Promise<{ data: JobCategory[] }> => Get("/job-categories"),
};

export const salaryTypeAPI = {
  getAll: (): Promise<{ data: SalaryType[] }> => Get("/salary-types"),
};

export const orderAPI = {
  getByJobPostId: (id: number) =>
    Get<{ data: Order }>(`/orders/job/${id}`),
};

export const billableItemAPI = {
  create: (data: any) => Post("/billable_items", data),
  getById: (id: number) => Get(`/billable_items/${id}`),
  getByJobPostId: (jobPostId: number) => Get(`/billable_items/jobpost/${jobPostId}`),
  list: () => Get("/billable_items"),
  update: (id: number, data: any) => Update(`/billable_items/${id}`, data),
  delete: (id: number) => DeleteReq(`/billable_items/${id}`),
};

export const discountAPI = {
  list: () => Get<Discount[]>(`/discounts`),
  getApplicableByJob: (jobPostId: number) =>
    Get<Discount[]>(`/discounts/applicable?job_post_id=${jobPostId}`),
};

export const paymentAPI = {
  create: (data: CreatePaymentPayload) => Post("/payments", data),
  getById: (id: number): Promise<{ data: Payment }> =>
    Get(`/payments/${id}`, true, { silent404: true }),
  getByBillableItem: (billableId: number): Promise<{ data: Payment }> =>
    Get(`/payments/billable/${billableId}`, true, { silent404: true }),
  getByJobId: (jobId: number) => Get(`/payments/job/${jobId}`),
  getByEmployerId: (employerId: number): Promise<{ data: Payment[] }> =>
    Get(`/payments/employer/${employerId}`),
  update: (id: number, data: Partial<Payment>) => Update(`/payments/${id}`, data),
  uploadEvidence: (paymentId: number, form: FormData) =>
    axios.post(buildUrl(`/payments/${paymentId}/evidence`), form, {
      withCredentials: true,
      headers: {
        ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
        "Content-Type": "multipart/form-data",
      },
    }),
};

export const paymentReportAPI = {
  getMine: () => Get("/payment-reports/me"),
  getByEmployerId: (id: number) => Get(`/payment-reports/employer/${id}`),
  upload: (form: FormData) =>
    axios.post(buildUrl("/payment-reports/upload"), form, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
      },
    }),
};

export const reportAPI = {
  create: (data: any) => Post("/api/reports", data),
  getAll: () => Get("/api/reports"),
  getById: (id: number) => Get(`/api/reports/${id}`),
  update: (id: number, data: Partial<any>) => Update(`/api/reports/${id}`, data),
  delete: (id: number) => DeleteReq(`/api/reports/${id}`),
};
