import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import { createAdminSession, setAdminCookie } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { AdminUserModel } from "@/models/AdminUser";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "البريد الإلكتروني وكلمة المرور مطلوبين." }, { status: 422 });
    }

    await dbConnect();
    const admin = await AdminUserModel.findOne({ email: String(email).toLowerCase(), isActive: true });

    if (!admin || !verifyPassword(String(password), admin.passwordSalt, admin.passwordHash)) {
      return NextResponse.json({ message: "بيانات الدخول غير صحيحة." }, { status: 401 });
    }

    const response = NextResponse.json({ message: "تم تسجيل الدخول بنجاح." });
    setAdminCookie(response, createAdminSession(admin.email));
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "حدث خطأ أثناء تسجيل الدخول." }, { status: 500 });
  }
}
