import { StrictMode } from 'react';   // นำเข้า StrictMode จาก React
import { createRoot } from 'react-dom/client';   // นำเข้า createRoot จาก react-dom/client
import App from './App.tsx';   // นำเข้า App component

// สร้าง root DOM จาก ID 'root' แล้วทำการเรนเดอร์ App component
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
