// lib/firebase.ts - ✅ แก้ไขแล้ว
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import type { Analytics } from 'firebase/analytics'; // ✨ ใช้ type-only import

const firebaseConfig = {
  apiKey: "AIzaSyDwtHznG0p-8sY1RVruK0fiE8ljG9ywMTo",
  authDomain: "sa-g08-1-68.firebaseapp.com",
  projectId: "sa-g08-1-68",
  storageBucket: "sa-g08-1-68.firebasestorage.app",
  messagingSenderId: "448680779657",
  appId: "1:448680779657:web:6f2ad0040b6666a492cb58",
  measurementId: "G-36N7DHYZ27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (เฉพาะใน browser)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

// Upload function
export const uploadHelpCenterImage = async (
  file: File, 
  type: 'ticket' | 'reply',
  ticketId?: string
): Promise<{url: string, originalName: string} | null> => {
  try {
    // จำกัดขนาดไฟล์ (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('ไฟล์รูปภาพต้องมีขนาดไม่เกิน 5MB');
    }

    // ตรวจสอบประเภทไฟล์
    if (!file.type.startsWith('image/')) {
      throw new Error('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
    }

    const timestamp = Date.now();
    const folder = type === 'ticket' ? 'help-center/tickets' : `help-center/replies/${ticketId}`;
    const fileName = `${timestamp}_${file.name}`;
    
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    
    return {
      url,
      originalName: file.name
    };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
