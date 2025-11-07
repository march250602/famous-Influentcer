import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const { expireHours } = body;

  // ✅ สร้าง JWT Secret ใหม่ทุกครั้ง
  const randomSecret = crypto.randomBytes(32).toString("hex");

  const token = jwt.sign(
    { 
      url: process.env.TARGET_URL 
    },
    randomSecret, // ใช้ secret แบบสุ่ม
    { expiresIn: `${expireHours}h` }
  );

  return NextResponse.json({
    link: `${process.env.NEXT_PUBLIC_BASE_URL}/access?token=${token}`,
     secretUsed: randomSecret // ถ้าต้องการเก็บ/ส่ง secret ไป validate ต่อ
  });
}
