
import type { ReportStatus } from "./reportstatus";

// ลบ import time เพราะ TypeScript ไม่มีโมดูลนี้
// หากต้องการเก็บเวลาแยกจาก datetime ให้ใช้ string หรือ Date

export interface Report {

    title: string;
    place: string;
    status: ReportStatus;
    datetime: Date;
    time?: string; // หรือ Date ถ้าต้องการเก็บเวลาแยก
    description: string;
}
