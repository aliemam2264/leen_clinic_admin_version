"use client";

import { useRef, useState } from "react";
import {
  imageRules,
  formatImageRule,
  type ImageRuleKey,
} from "@/lib/image-rules";
import { validateImageFile } from "@/lib/validate-image-file";

type ImageUploadFieldProps = {
  label: string;
  value?: string;
  ruleKey: ImageRuleKey;
  onChange: (url: string) => void;
};

export function ImageUploadField({
  label,
  value,
  ruleKey,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const rule = imageRules[ruleKey];

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setError("");

    if (!file) return;

    const validationError = await validateImageFile(file, ruleKey);

    if (validationError) {
      setError(validationError);
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("ruleKey", ruleKey);
    formData.append("folder", `leen-clinic/${ruleKey}`);

    try {
      setIsUploading(true);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "فشل رفع الصورة.");
      }

      const uploadedUrl = String(data.url || data.secure_url || "");

      if (!uploadedUrl) {
        throw new Error("تم الرفع لكن لم يرجع رابط الصورة.");
      }

      onChange(uploadedUrl);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "فشل رفع الصورة.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemoveImage() {
    setError("");
    onChange("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-wineDark">
        {label}
      </label>

      {value ? (
        <div className="space-y-3 rounded-2xl border border-wine/10 bg-white p-3">
          <div className="overflow-hidden rounded-xl bg-peach/30">
            <img
              src={value}
              alt={label}
              className="max-h-48 w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={isUploading}
            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-black text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            حذف الصورة
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-wine/15 bg-peach/30 px-4 py-5 text-center text-sm font-bold text-wine/50">
          لا توجد صورة مرفوعة حاليًا
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={rule.allowedTypes.join(",")}
        onChange={handleFileChange}
        disabled={isUploading}
        className="block w-full rounded-xl border border-wine/10 bg-white px-3 py-2 text-sm"
      />

      <p className="text-xs font-medium text-wine/60">
        {formatImageRule(rule)}
      </p>

      {isUploading ? (
        <p className="text-xs font-bold text-orange">
          جاري رفع الصورة...
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}