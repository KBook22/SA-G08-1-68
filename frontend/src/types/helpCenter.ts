// src/types/helpCenter.ts

export interface FAQ {
    ID: number;
    title: string;
    content: string;
    admin_id?: number;
    CreatedAt: string;
    UpdatedAt: string;
  }
  
  export interface User {
    ID: number;
    username: string;
    role: string;
  }
  
  export interface TicketReply {
    ID: number;
    message: string;
    is_staff_reply: boolean;
    author_id: number;
    ticket_id: number;
    Author: User;
    CreatedAt: string;
    UpdatedAt: string;
  }
  
  export interface RequestTicket {
    ID: number;
    subject: string;
    initial_message: string;
    status: 'Open' | 'In Progress' | 'Awaiting Confirmation' | 'Resolved' | 'Closed';
    user_id: number;
    User: User;
    replies?: TicketReply[];
    CreatedAt: string;
    UpdatedAt: string;
  }
  
  export interface CreateTicketRequest {
    subject: string;
    initial_message: string;
  }
  
  export interface CreateReplyRequest {
    message: string;
    is_staff_reply?: boolean;
  }
  
  export interface UpdateTicketStatusRequest {
    status: string;
  }