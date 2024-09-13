export interface AdminInterface {
    ID?: number;  // หมายเลขประจำตัวของ Admin (อาจจะไม่ระบุได้)
    Email: string;  // อีเมลของ Admin
    Password: string;  // รหัสผ่านของ Admin
    FirstName: string;  // ชื่อจริงของ Admin
    LastName: string;  // นามสกุลของ Admin
    Birthday: string;  // วันเกิดของ Admin (ในรูปแบบ ISO 8601 เช่น "2024-09-13T00:00:00Z")
}
