import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const TARGET = process.env.TARGET_URL;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return new NextResponse("INVALID LINK", { status: 400 });

  let url = "";

  try {
    const data: any = jwt.verify(token, process.env.JWT_SECRET!);
    url = data.url;
  } catch {
    return NextResponse.redirect("/expired");
  }

  const page = await fetch(url);
  let html = await page.text();

  // ✅ ซ่อม resource path
  html = html
    .replace(/src="\//g, `src="${url}/`)
    .replace(/href="\//g, `href="${url}/`)
    .replace(/"\/_next\//g, `"${url}/_next/`); // <--- KEY FIX

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
