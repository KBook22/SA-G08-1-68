// types/index.ts
export interface RequestTicket {
    ID: number;
    subject: string;
    initial_message: string;
    status: 'Open' | 'In Progress' | 'Awaiting Confirmation' | 'Resolved';
    CreatedAt: string;
    UpdatedAt: string;
    user?: {
      username: string;
    };
    User?: {
      username: string;
    };
    replies?: Array<{
      ID: number;
      message: string;
      CreatedAt: string;
      is_staff_reply: boolean;
      author?: {
        username: string;
      };
      Author?: {
        username: string;
      };
      images?: string[]; // ✨ เพิ่มฟิลด์รูปภาพ
    }>;
    images?: string[]; // ✨ เพิ่มฟิลด์รูปภาพสำหรับคำร้องหลัก
  }
  