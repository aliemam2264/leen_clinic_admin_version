import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ message: "غير مصرح." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "leen-clinic");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "من فضلك اختر صورة." }, { status: 422 });
    }

    const result = await uploadToCloudinary(file, folder);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "فشل رفع الصورة. تأكد من إعدادات Cloudinary." }, { status: 500 });
  }
}
