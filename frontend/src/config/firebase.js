import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBgqpazv7QQdAl1eHbYGqOWXVTWkJjW3jc",
  authDomain: "walmart-5120a.firebaseapp.com",
  projectId: "walmart-5120a",
  storageBucket: "walmart-5120a.firebasestorage.app",
  messagingSenderId: "395507960842",
  appId: "1:395507960842:web:85b454a0269a3e0a98a3f3",
  measurementId: "G-L9W3V0D7R4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;