// app/api/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ 
    message: 'Logged out successfully' 
  });

  // ลบ cookie
  response.cookies.delete('token');

  return response;
}