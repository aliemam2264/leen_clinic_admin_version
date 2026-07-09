import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "تم تسجيل الخروج." });
  clearAdminCookie(response);
  return response;
}
