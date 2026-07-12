export type ImageRuleKey =
  | "hero"
  | "gallery"
  | "device"
  | "beforeAfter"
  | "offer"
  | "logo"
  | "favicon";

export type ImageRule = {
  label: string;
  width: number;
  height: number;
  maxSizeMB: number;
  allowedTypes: string[];
  ratioTolerance?: number;
};

export const imageRules: Record<ImageRuleKey, ImageRule> = {
  hero: {
    label: "صورة الهيرو",
    width: 1200,
    height: 1395,
    maxSizeMB: 4,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    ratioTolerance: 0.06,
  },

  gallery: {
    label: "صورة العيادة",
    width: 1416,
    height: 1200,
    maxSizeMB: 3,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    ratioTolerance: 0.06,
  },

  device: {
    label: "صورة الجهاز",
    width: 1200,
    height: 1000,
    maxSizeMB: 3,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    ratioTolerance: 0.06,
  },

  beforeAfter: {
    label: "صورة قبل وبعد",
    width: 1500,
    height: 1200,
    maxSizeMB: 4,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    ratioTolerance: 0.06,
  },

  offer: {
    label: "صورة العرض",
    width: 1200,
    height: 800,
    maxSizeMB: 3,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    ratioTolerance: 0.08,
  },

  logo: {
    label: "اللوجو",
    width: 600,
    height: 240,
    maxSizeMB: 1,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
    ratioTolerance: 0.2,
  },

  favicon: {
    label: "الفافيكون",
    width: 512,
    height: 512,
    maxSizeMB: 0.5,
    allowedTypes: ["image/png", "image/webp", "image/x-icon"],
    ratioTolerance: 0.03,
  },
};

export function formatImageRule(rule: ImageRule) {
  return `المقاس المقترح: ${rule.width}×${rule.height}px — الحد الأقصى: ${rule.maxSizeMB}MB — الصيغ: JPG / PNG / WEBP`;
}