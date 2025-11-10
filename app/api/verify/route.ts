// app/api/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

export async function GET(req: NextRequest) {
  try {
    // ดึง token จาก cookie หรือ Authorization header
    const token = req.cookies.get('token')?.value || 
                  req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' }, 
        { status: 401 }
      );
    }

    // ตรวจสอบ token
    const { payload } = await jwtVerify(token, SECRET_KEY);

    return NextResponse.json({ 
      valid: true,
      user: {
        username: payload.username,
        role: payload.role
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token', valid: false }, 
      { status: 401 }
    );
  }
}