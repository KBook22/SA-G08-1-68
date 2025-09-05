// services/https/index.tsx
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
import type { Jobpost } from "../../interfaces/jobpost";
import type { Payment, CreatePaymentPayload } from "../../interfaces/payment";
import type { Order } from "../../interfaces/order";
import type { EmploymentType } from "../../interfaces/employment_type";
import type { JobCategory } from "../../interfaces/job_category";
import type { SalaryType } from "../../interfaces/salary_type";
import type { SignInCommon } from "../../interfaces/user";

/** ใช้ VITE_API_KEY เป็น baseURL เหมือนเดิม */
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

/* -------------------- helpers: status/message -------------------- */
export const getHttpStatus = (e: any): number =>
  e?.status ?? e?.response?.status ?? e?.request?.status ?? 0;

export const getHttpMessage = (e: any): string =>
  e?.response?.data?.error || e?.message || "API error";

/* -------------------- axios instance -------------------- */
const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* -------------------- error handling (ปรับให้เงียบ 404 ได้) -------------------- */
type ReqOpts = {
  /** เงียบทุกสถานะ (ไม่ log) */
  silent?: boolean;
  /** เงียบเฉพาะ 404 (ใช้กับ pre-check/fallback) */
  silent404?: boolean;
};

const handleApiError = (error: AxiosError, opts?: ReqOpts): never => {
  const status = error.response?.status;

  if (status === 401) {
    // จัดการ token หมดอายุ → เคลียร์ + redirect ไป login
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

  // ถ้า caller ขอให้เงียบ 404
  if (opts?.silent404 && status === 404) {
    const err: any = new Error(
      (error.response?.data as any)?.error || "Not Found"
    );
    err.status = 404;
    err.response = error.response;
    throw err;
  }

  // log แบบเบา ๆ เว้นแต่ขอ silent
  if (!opts?.silent) {
    const msg =
      (error.response?.data as any)?.error ||
      error.message ||
      "API error";
    // ใช้ debug เพื่อลดเสียงใน console
    // eslint-disable-next-line no-console
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

/* -------------------- generic methods (เพิ่ม opts) -------------------- */
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
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
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

export type BillableitemCreate = {
  amount: number;
  description?: string;
  job_post_id?: number;
};

export type BillableitemUpdate = Partial<BillableitemCreate>;

export const billableItemAPI = {
  create: (data: BillableitemCreate) => Post("/billable_items", data),
  getById: (id: number) => Get(`/billable_items/${id}`),
  getByJobPostId: (jobPostId: number) => Get(`/billable_items/jobpost/${jobPostId}`),
  list: () => Get("/billable_items"),
  update: (id: number, data: BillableitemUpdate) => Update(`/billable_items/${id}`, data),
  delete: (id: number) => DeleteReq(`/billable_items/${id}`),
};

export const discountAPI = {
  list: () => Get<Discount[]>(`/discounts`),
  getApplicableByJob: (jobPostId: number) =>
    Get<Discount[]>(`/discounts/applicable?job_post_id=${jobPostId}`),
  getUsedByEmployer: (employerId: number) =>
    Get<number[] | { discount_id: number }[]>(
      `/discounts/used?employer_id=${employerId}&employerId=${employerId}`
    ),
  checkUsage: (discountId: number, employerId: number) =>
    Get<{ used: boolean } | { data: { used: boolean } }>(
      `/discounts/${discountId}/usage?employer_id=${employerId}&employerId=${employerId}`
    ),
};