import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { imageRules, type ImageRuleKey } from "@/lib//image-rules";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isRuleKey(value: string | null): value is ImageRuleKey {
  return Boolean(value && value in imageRules);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const ruleKeyValue = formData.get("ruleKey");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "لم يتم اختيار صورة." },
        { status: 422 }
      );
    }

    if (!isRuleKey(String(ruleKeyValue))) {
      return NextResponse.json(
        { message: "نوع الصورة غير معروف." },
        { status: 422 }
      );
    }

    const rule = imageRules[String(ruleKeyValue) as ImageRuleKey];

    if (!rule.allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "صيغة الصورة غير مسموحة." },
        { status: 422 }
      );
    }

    const maxBytes = rule.maxSizeMB * 1024 * 1024;

    if (file.size > maxBytes) {
      return NextResponse.json(
        { message: `حجم الصورة أكبر من المسموح. الحد الأقصى ${rule.maxSizeMB}MB.` },
        { status: 422 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!rule.allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "صيغة الصورة غير مسموحة." },
        { status: 422 }
      );
    }


    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          message: `حجم الصورة أكبر من المسموح. الحد الأقصى ${rule.maxSizeMB}MB.`,
        },
        { status: 422 }
      );
    }

    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: `leen-clinic/${ruleKeyValue}`,
      resource_type: "image",
    });

    return NextResponse.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error) {
    console.error("[Upload error]", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "فشل رفع الصورة. تأكد من إعدادات Cloudinary.",
      },
      { status: 500 }
    );
  }
}