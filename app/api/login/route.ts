// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // ตรวจสอบ credentials
    if (username === 'admin' && password === 'admin123') {
      // สร้าง JWT token ที่มีอายุ 6 ชั่วโมง
      const token = await new SignJWT({ 
        username,
        role: 'admin' 
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('6h') // หมดอายุใน 6 ชั่วโมง
        .sign(SECRET_KEY);

      const response = NextResponse.json({ 
        token,
        expiresIn: 6 * 60 * 60 * 1000 // 6 ชั่วโมงในหน่วย milliseconds
      });

      // ตั้งค่า httpOnly cookie เพื่อความปลอดภัย
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 6 * 60 * 60, // 6 ชั่วโมง
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' }, 
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาด' }, 
      { status: 500 }
    );
  }
}