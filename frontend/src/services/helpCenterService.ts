// src/services/helpCenterService.ts
import { message } from 'antd';

const API_URL = 'http://localhost:8080/api';

// ฟังก์ชันช่วยเหลือสำหรับ API calls
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const handleApiError = (error: any, defaultMessage: string) => {
  console.error(defaultMessage, error);
  const errorMessage = error.response?.data?.error || error.message || defaultMessage;
  throw new Error(errorMessage);
};

// =================== FAQ Services ===================

export const getFAQs = async () => {
  try {
    const response = await fetch(`${API_URL}/faqs`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถดึงข้อมูล FAQ ได้');
  }
};

// =================== Ticket Services ===================

export const createTicket = async (ticketData: {
  subject: string;
  initial_message: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(ticketData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create ticket');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถสร้างคำร้องได้');
  }
};

export const getMyTickets = async () => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถดึงข้อมูลคำร้องของคุณได้');
  }
};

export const getTicketById = async (ticketId: string) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('ไม่พบคำร้องที่ต้องการ');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถดึงข้อมูลคำร้องได้');
  }
};

export const createTicketReply = async (ticketId: string, replyData: {
  message: string;
  is_staff_reply?: boolean;
}) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/replies`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(replyData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create reply');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถส่งคำตอบได้');
  }
};

export const updateTicketStatus = async (ticketId: string, status: string) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถอัปเดตสถานะได้');
  }
};

// =================== Admin Services ===================

export const getAllTickets = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/tickets`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถดึงข้อมูลคำร้องทั้งหมดได้');
  }
};

export const adminUpdateTicketStatus = async (ticketId: string, status: string) => {
  try {
    const response = await fetch(`${API_URL}/admin/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถอัปเดตสถานะได้');
  }
};

// =================== FAQ Admin Services ===================

export const createFAQ = async (faqData: {
  title: string;
  content: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/faqs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(faqData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create FAQ');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถสร้าง FAQ ได้');
  }
};

export const updateFAQ = async (faqId: string, faqData: {
  title: string;
  content: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/faqs/${faqId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(faqData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update FAQ');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถแก้ไข FAQ ได้');
  }
};

export const deleteFAQ = async (faqId: string) => {
  try {
    const response = await fetch(`${API_URL}/faqs/${faqId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete FAQ');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error, 'ไม่สามารถลบ FAQ ได้');
  }
};