import { imageRules, type ImageRuleKey } from "./image-rules";

export async function validateImageFile(file: File, ruleKey: ImageRuleKey) {
  const rule = imageRules[ruleKey];

  if (!rule) {
    return "نوع الصورة غير معروف.";
  }

  if (!rule.allowedTypes.includes(file.type)) {
    return "صيغة الصورة غير مسموحة. استخدم JPG أو PNG أو WEBP.";
  }

  const maxBytes = rule.maxSizeMB * 1024 * 1024;

  if (file.size > maxBytes) {
    return `حجم الصورة أكبر من المسموح. الحد الأقصى ${rule.maxSizeMB}MB.`;
  }

  return null;
}