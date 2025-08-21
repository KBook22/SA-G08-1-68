import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// 1. ใส่ข้อมูล Firebase project ของคุณตรงนี้
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  appId: 'YOUR_APP_ID',
};

// 2. เริ่มต้นการเชื่อมต่อ Firebase
const app = initializeApp(firebaseConfig);

// 3. Export ตัวแปร db และ storage เพื่อให้ไฟล์อื่นเรียกใช้ได้
export const db = getFirestore(app);
export const storage = getStorage(app);


/** อัปโหลดไฟล์ขึ้น Storage แล้วคืนค่า URL สำหรับดาวน์โหลด */
export async function uploadFile(file: File, folder = 'uploads') {
  const safeName = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `${folder}/${safeName}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, originalName: file.name, path: storageRef.fullPath };
}
