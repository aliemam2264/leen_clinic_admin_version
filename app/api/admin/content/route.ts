import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { defaultSiteContent, getSiteContent, upsertSiteContent } from "@/lib/site-content";
import { requireAdmin } from "@/lib/auth";
import type { SiteContent } from "@/lib/content-types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ message: "غير مصرح." }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ message: "غير مصرح." }, { status: 401 });
  }

  try {
    const content = (await request.json()) as SiteContent;

    if (!content?.siteConfig?.arabicName) {
      return NextResponse.json({ message: "بيانات الموقع غير مكتملة." }, { status: 422 });
    }

    await upsertSiteContent({
      ...defaultSiteContent,
      ...content,
      updatedAt: new Date().toISOString(),
    });

    revalidatePath("/");
    return NextResponse.json({ message: "تم حفظ التعديلات بنجاح." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "حدث خطأ أثناء حفظ البيانات." }, { status: 500 });
  }
}
