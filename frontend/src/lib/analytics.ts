// lib/analytics.ts - ✅ แก้ไขแล้ว
import { analytics } from './firebase';
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
// ✨ ไม่ต้อง import Analytics type ที่นี่เพราะใช้แค่ functions

// Helper functions สำหรับ Analytics
export const logAnalyticsEvent = (eventName: string, parameters?: any) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};

// Event สำหรับระบบของคุณ
export const analyticsEvents = {
  // User Actions
  login: (method: string) => {
    logAnalyticsEvent('login', { method });
  },
  
  signup: (method: string) => {
    logAnalyticsEvent('sign_up', { method });
  },

  // Student Post Events
  createPost: (postType: string) => {
    logAnalyticsEvent('create_post', { 
      content_type: 'student_post',
      post_type: postType 
    });
  },

  viewPost: (postId: string) => {
    logAnalyticsEvent('view_item', {
      item_id: postId,
      content_type: 'student_post'
    });
  },

  searchPosts: (searchTerm: string) => {
    logAnalyticsEvent('search', {
      search_term: searchTerm,
      content_type: 'student_posts'
    });
  },

  // Help Center Events
  viewFAQ: (faqId: string) => {
    logAnalyticsEvent('view_item', {
      item_id: faqId,
      content_type: 'faq'
    });
  },

  createTicket: (category: string) => {
    logAnalyticsEvent('create_ticket', {
      category
    });
  },

  searchFAQ: (searchTerm: string) => {
    logAnalyticsEvent('search', {
      search_term: searchTerm,
      content_type: 'faq'
    });
  },

  // Page Views
  pageView: (pageName: string) => {
    logAnalyticsEvent('page_view', {
      page_title: pageName
    });
  }
};

// Set User Info
export const setAnalyticsUser = (userId: string, properties?: any) => {
  if (analytics) {
    setUserId(analytics, userId);
    if (properties) {
      setUserProperties(analytics, properties);
    }
  }
};
