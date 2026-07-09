"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Camera,
  Check,
  ChevronLeft,
  Edit3,
  Eye,
  EyeOff,
  Gift,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MonitorSmartphone,
  Plus,
  Save,
  Settings,
  Sparkles,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  BeforeAfterCaseContent,
  DeviceContent,
  GalleryItemContent,
  HeroStat,
  LaserDevice,
  OfferContent,
  PriceOption,
  ServiceCategoryContent,
  ServiceContent,
  ServiceGender,
  ServiceIconKey,
  SiteConfigContent,
  SiteContent,
  SocialIconKey,
  SocialLink,
  TestimonialContent,
} from "@/lib/content-types";

const menuSections = [
  { key: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { key: "settings", label: "الإعدادات العامة", icon: Settings },
  { key: "heroStats", label: "إحصائيات الهيرو", icon: BarChart3 },
  { key: "serviceCategories", label: "الخدمات والأسعار", icon: Sparkles },
  { key: "offers", label: "العروض", icon: Gift },
  { key: "beforeAfterCases", label: "قبل وبعد", icon: Camera },
  { key: "devices", label: "الأجهزة", icon: MonitorSmartphone },
  { key: "gallery", label: "صور العيادة", icon: ImageIcon },
  { key: "testimonials", label: "آراء العملاء", icon: Star },
] as const;

type AdminSectionKey = (typeof menuSections)[number]["key"];

type UploadState = {
  field: string;
  loading: boolean;
};

function createId(prefix = "item") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function joinLines(value?: string[]) {
  return (value || []).join("\n");
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function EmptyAdminState({ title = "مفيش بيانات في السكشن ده حاليًا." }: { title?: string }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-wine/20 bg-white/70 p-8 text-center shadow-sm">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-peach text-wine">
        <ImageIcon className="h-6 w-6" />
      </div>
      <p className="mt-4 text-lg font-black text-wineDark">{title}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">اضغط إضافة جديد واملأ الفورم، وبعدها احفظ التعديلات.</p>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="text-sm font-black text-wineDark">{label}</span>
      {children}
    </label>
  );
}

async function uploadImage(file: File, folder = "leen-clinic") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "فشل رفع الصورة.");
  }

  return String(data.secure_url || "");
}

function ImageField({
  label,
  value,
  fieldId,
  onChange,
  uploadState,
  setUploadState,
}: {
  label: string;
  value: string;
  fieldId: string;
  onChange: (value: string) => void;
  uploadState: UploadState | null;
  setUploadState: (value: UploadState | null) => void;
}) {
  const isLoading = uploadState?.field === fieldId && uploadState.loading;

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadState({ field: fieldId, loading: true });
      const url = await uploadImage(file);
      onChange(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "فشل رفع الصورة.");
    } finally {
      setUploadState(null);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-black text-wineDark">{label}</span>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <Input value={value || ""} onChange={(event) => onChange(event.target.value)} placeholder="رابط الصورة أو /images/name.png" dir="ltr" />
        <label className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-wine/15 bg-white px-5 text-sm font-black text-wine transition hover:bg-peach">
          <UploadCloud className="h-4 w-4" />
          {isLoading ? "جاري الرفع..." : "رفع صورة"}
          <input type="file" accept="image/*" className="hidden" disabled={isLoading} onChange={handleFile} />
        </label>
      </div>
      {value ? (
        <div className="overflow-hidden rounded-2xl border border-wine/10 bg-peach/30 p-2">
          <img src={value} alt="Preview" className="max-h-44 w-full rounded-xl object-contain" />
        </div>
      ) : null}
    </div>
  );
}

function StatusBadge({ active }: { active?: boolean }) {
  const isActive = active !== false;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black",
        isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
      )}
    >
      {isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
      {isActive ? "ظاهر" : "مخفي"}
    </span>
  );
}

function AdminShellCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-wine/10 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-wineDark">{title}</h2>
          {description ? <p className="mt-1 text-sm leading-7 text-muted-foreground">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Overview({ content }: { content: SiteContent }) {
  const cards = [
    { label: "أقسام الخدمات", value: content.serviceCategories.length },
    { label: "إجمالي الخدمات", value: content.serviceCategories.reduce((total, category) => total + (category.services?.length || 0), 0) },
    { label: "العروض", value: content.offers.length },
    { label: "صور العيادة", value: content.gallery.length },
    { label: "قبل وبعد", value: content.beforeAfterCases.length },
    { label: "الأجهزة", value: content.devices.length },
  ];

  return (
    <AdminShellCard title="نظرة عامة" description="ملخص سريع للداتا الموجودة في الموقع حاليًا.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-[1.5rem] border border-wine/10 bg-hero-glow p-5">
            <p className="text-sm font-black text-muted-foreground">{card.label}</p>
            <p className="mt-3 text-4xl font-black text-wineDark">{card.value}</p>
          </div>
        ))}
      </div>
    </AdminShellCard>
  );
}

function SocialsEditor({ socials, onChange }: { socials: SocialLink[]; onChange: (value: SocialLink[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<SocialLink>({ label: "", href: "", iconKey: "instagram", image: "" });

  const reset = () => {
    setEditingIndex(null);
    setForm({ label: "", href: "", iconKey: "instagram", image: "" });
  };

  const edit = (index: number) => {
    setEditingIndex(index);
    setForm({ ...socials[index] });
  };

  const submit = () => {
    if (!form.label.trim() || !form.href.trim()) {
      alert("اسم السوشيال والرابط مطلوبين.");
      return;
    }

    if (editingIndex === null) {
      onChange([...socials, form]);
    } else {
      onChange(socials.map((item, index) => (index === editingIndex ? form : item)));
    }
    reset();
  };

  return (
    <div className="mt-6 rounded-[1.5rem] border border-wine/10 bg-peach/30 p-4">
      <h3 className="text-lg font-black text-wineDark">روابط السوشيال</h3>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <div className="overflow-hidden rounded-2xl border border-wine/10 bg-white">
          {socials.length === 0 ? (
            <EmptyAdminState title="مفيش روابط سوشيال حاليًا." />
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-peach text-wineDark">
                <tr>
                  <th className="p-3">الاسم</th>
                  <th className="p-3">الرابط</th>
                  <th className="p-3">النوع</th>
                  <th className="p-3">تحكم</th>
                </tr>
              </thead>
              <tbody>
                {socials.map((social, index) => (
                  <tr key={`${social.label}-${index}`} className="border-t border-wine/10">
                    <td className="p-3 font-black text-wineDark">{social.label}</td>
                    <td className="max-w-[220px] truncate p-3 text-muted-foreground" dir="ltr">{social.href}</td>
                    <td className="p-3 text-muted-foreground">{social.iconKey || (social.image ? "image" : "-")}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => edit(index)}><Edit3 className="h-3 w-3" />تعديل</Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => onChange(socials.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="h-3 w-3" />حذف</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="rounded-2xl border border-wine/10 bg-white p-4">
          <h4 className="font-black text-wineDark">{editingIndex === null ? "إضافة رابط" : "تعديل رابط"}</h4>
          <div className="mt-4 space-y-3">
            <Field label="الاسم">
              <Input value={form.label || ""} onChange={(event) => setForm({ ...form, label: event.target.value })} placeholder="Instagram" />
            </Field>
            <Field label="الرابط">
              <Input value={form.href || ""} onChange={(event) => setForm({ ...form, href: event.target.value })} placeholder="https://..." dir="ltr" />
            </Field>
            <Field label="الأيقونة">
              <Select value={String(form.iconKey || "")} onChange={(event) => setForm({ ...form, iconKey: event.target.value as SocialIconKey })}>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="location">Location</option>
                <option value="tiktok">TikTok</option>
                <option value="">بدون</option>
              </Select>
            </Field>
            <Field label="رابط صورة أيقونة اختياري">
              <Input value={form.image || ""} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="/icons/tiktok.svg" dir="ltr" />
            </Field>
            <div className="flex gap-2">
              <Button type="button" variant="orange" onClick={submit}><Check className="h-4 w-4" />{editingIndex === null ? "إضافة" : "تطبيق"}</Button>
              {editingIndex !== null ? <Button type="button" variant="outline" onClick={reset}>إلغاء</Button> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsEditor({ value, onChange }: { value: SiteConfigContent; onChange: (value: SiteConfigContent) => void }) {
  const update = (key: keyof SiteConfigContent, fieldValue: string) => {
    onChange({ ...value, [key]: fieldValue });
  };

  return (
    <AdminShellCard title="الإعدادات العامة" description="عدّل بيانات العيادة، الواتساب، العنوان، الخريطة، وروابط السوشيال من فورم واضح بدل JSON.">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="اسم البراند بالإنجليزي">
          <Input value={value.brand || ""} onChange={(event) => update("brand", event.target.value)} placeholder="Leen" />
        </Field>
        <Field label="اسم العيادة بالعربي">
          <Input value={value.arabicName || ""} onChange={(event) => update("arabicName", event.target.value)} placeholder="مجمع لين الشرق الطبي" />
        </Field>
        <Field label="الوصف القصير">
          <Input value={value.tagline || ""} onChange={(event) => update("tagline", event.target.value)} placeholder="عيادة تجميل وليزر" />
        </Field>
        <Field label="رقم الهاتف للعرض">
          <Input value={value.phoneDisplay || ""} onChange={(event) => update("phoneDisplay", event.target.value)} placeholder="05xxxxxxxx" dir="ltr" />
        </Field>
        <Field label="رقم واتساب بدون +">
          <Input value={value.whatsappNumber || ""} onChange={(event) => update("whatsappNumber", event.target.value)} placeholder="966xxxxxxxxx" dir="ltr" />
        </Field>
        <Field label="مواعيد العمل">
          <Input value={value.workingHours || ""} onChange={(event) => update("workingHours", event.target.value)} placeholder="من السبت للخميس..." />
        </Field>
        <Field label="العنوان" className="md:col-span-2">
          <Input value={value.address || ""} onChange={(event) => update("address", event.target.value)} placeholder="العنوان كامل" />
        </Field>
        <Field label="رابط الخريطة / Embed" className="md:col-span-2">
          <Input value={value.mapEmbedUrl || ""} onChange={(event) => update("mapEmbedUrl", event.target.value)} placeholder="https://..." dir="ltr" />
        </Field>
      </div>
      <SocialsEditor socials={value.socials || []} onChange={(socials) => onChange({ ...value, socials })} />
    </AdminShellCard>
  );
}

function HeroStatsEditor({ value, onChange }: { value: HeroStat[]; onChange: (value: HeroStat[]) => void }) {
  const emptyForm: HeroStat = { value: "", label: "" };
  const [form, setForm] = useState<HeroStat>(emptyForm);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const reset = () => {
    setForm(emptyForm);
    setEditingIndex(null);
  };

  const submit = () => {
    if (!form.value.trim() || !form.label.trim()) {
      alert("الرقم والوصف مطلوبين.");
      return;
    }

    if (editingIndex === null) {
      onChange([...value, form]);
    } else {
      onChange(value.map((item, index) => (index === editingIndex ? form : item)));
    }
    reset();
  };

  return (
    <AdminShellCard title="إحصائيات الهيرو" description="الأرقام الصغيرة التي تظهر في أول سكشن بالموقع.">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div className="overflow-hidden rounded-2xl border border-wine/10 bg-white">
          {value.length === 0 ? (
            <EmptyAdminState title="مفيش إحصائيات في الهيرو حاليًا." />
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-peach text-wineDark">
                <tr>
                  <th className="p-3">القيمة</th>
                  <th className="p-3">الوصف</th>
                  <th className="p-3">تحكم</th>
                </tr>
              </thead>
              <tbody>
                {value.map((stat, index) => (
                  <tr key={`${stat.value}-${index}`} className="border-t border-wine/10">
                    <td className="p-3 text-xl font-black text-orange">{stat.value}</td>
                    <td className="p-3 font-bold text-wineDark">{stat.label}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => { setForm(stat); setEditingIndex(index); }}><Edit3 className="h-3 w-3" />تعديل</Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="h-3 w-3" />حذف</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="rounded-2xl border border-wine/10 bg-peach/30 p-4">
          <h3 className="text-lg font-black text-wineDark">{editingIndex === null ? "إضافة إحصائية" : "تعديل إحصائية"}</h3>
          <div className="mt-4 space-y-4">
            <Field label="القيمة">
              <Input value={form.value} onChange={(event) => setForm({ ...form, value: event.target.value })} placeholder="+10" />
            </Field>
            <Field label="الوصف">
              <Input value={form.label} onChange={(event) => setForm({ ...form, label: event.target.value })} placeholder="سنوات خبرة" />
            </Field>
            <div className="flex gap-2">
              <Button type="button" variant="orange" onClick={submit}><Check className="h-4 w-4" />{editingIndex === null ? "إضافة" : "تطبيق"}</Button>
              {editingIndex !== null ? <Button type="button" variant="outline" onClick={reset}>إلغاء</Button> : null}
            </div>
          </div>
        </div>
      </div>
    </AdminShellCard>
  );
}

function PriceOptionsEditor({ value, onChange }: { value: PriceOption[]; onChange: (value: PriceOption[]) => void }) {
  const update = (index: number, key: keyof PriceOption, fieldValue: string) => {
    onChange(value.map((option, optionIndex) => (optionIndex === index ? { ...option, [key]: fieldValue } : option)));
  };

  return (
    <div className="space-y-3 rounded-2xl border border-wine/10 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-wineDark">باقات الأسعار</p>
          <p className="mt-1 text-xs text-muted-foreground">للخدمات العادية ممكن تسيبها فاضية وتستخدم سعر واحد.</p>
        </div>
        <Button type="button" size="sm" variant="outline" onClick={() => onChange([...value, { label: "", price: "" }])}>
          <Plus className="h-3 w-3" /> باقة
        </Button>
      </div>

      {value.length === 0 ? (
        <p className="rounded-xl bg-peach/60 px-4 py-3 text-sm font-bold text-wine">مفيش باقات أسعار للخدمة دي.</p>
      ) : (
        <div className="space-y-2">
          {value.map((option, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <Input value={option.label} onChange={(event) => update(index, "label", event.target.value)} placeholder="جلسة واحدة" />
              <Input value={option.price} onChange={(event) => update(index, "price", event.target.value)} placeholder="١٩٩" />
              <Button type="button" size="icon" variant="ghost" onClick={() => onChange(value.filter((_, optionIndex) => optionIndex !== index))} aria-label="حذف الباقة">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  editing,
}: {
  form: ServiceContent;
  setForm: (value: ServiceContent) => void;
  onSubmit: () => void;
  onCancel: () => void;
  editing: boolean;
}) {
  return (
    <div className="rounded-[1.5rem] border border-wine/10 bg-peach/30 p-4">
      <h3 className="text-lg font-black text-wineDark">{editing ? "تعديل خدمة" : "إضافة خدمة"}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="اسم الخدمة">
          <Input value={form.title || ""} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="اسم الخدمة" />
        </Field>
        <Field label="السعر الرئيسي">
          <Input value={form.price || ""} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="٨٥٠ أو باقات متعددة" />
        </Field>
        <Field label="الأيقونة">
          <Select value={form.icon || "sparkles"} onChange={(event) => setForm({ ...form, icon: event.target.value as ServiceIconKey })}>
            <option value="sparkles">Sparkles</option>
            <option value="syringe">Syringe</option>
            <option value="waves">Waves</option>
            <option value="camera">Camera</option>
          </Select>
        </Field>
        <Field label="الجنس">
          <Select value={form.gender || "both"} onChange={(event) => setForm({ ...form, gender: event.target.value as ServiceGender })}>
            <option value="both">الكل</option>
            <option value="female">نساء</option>
            <option value="male">رجال</option>
          </Select>
        </Field>
        <Field label="جهاز الليزر">
          <Select value={form.laserDevice || ""} onChange={(event) => setForm({ ...form, laserDevice: (event.target.value || undefined) as LaserDevice | undefined })}>
            <option value="">بدون</option>
            <option value="gentle-deka">Gentle Deka</option>
            <option value="gentle-pro">Gentle Pro</option>
            <option value="splendor-x">Splendor X</option>
          </Select>
        </Field>
        <Field label="ملاحظة">
          <Input value={form.note || ""} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="نساء · شامل رتوش" />
        </Field>
        <Field label="وصف مختصر" className="md:col-span-2">
          <Textarea value={form.short || ""} onChange={(event) => setForm({ ...form, short: event.target.value })} placeholder="وصف يظهر في كارت الخدمة" />
        </Field>
        <Field label="تعريف الخدمة" className="md:col-span-2">
          <Textarea value={form.definition || ""} onChange={(event) => setForm({ ...form, definition: event.target.value })} placeholder="تعريف الخدمة بالتفصيل" />
        </Field>
        <Field label="المميزات - كل سطر عنصر">
          <Textarea value={joinLines(form.benefits)} onChange={(event) => setForm({ ...form, benefits: splitLines(event.target.value) })} placeholder={"باقات واضحة\nنتيجة تدريجية"} />
        </Field>
        <Field label="الاستخدامات - كل سطر عنصر">
          <Textarea value={joinLines(form.uses)} onChange={(event) => setForm({ ...form, uses: splitLines(event.target.value) })} placeholder={"إزالة الشعر\nالجسم"} />
        </Field>
        <div className="md:col-span-2">
          <PriceOptionsEditor value={form.priceOptions || []} onChange={(priceOptions) => setForm({ ...form, priceOptions })} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="button" variant="orange" onClick={onSubmit}><Check className="h-4 w-4" />{editing ? "تطبيق التعديل" : "إضافة الخدمة"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
      </div>
    </div>
  );
}

const emptyService: ServiceContent = {
  title: "",
  price: "",
  short: "",
  definition: "",
  benefits: [],
  uses: [],
  icon: "sparkles",
  gender: "both",
  priceOptions: [],
};

function ServicesEditor({ value, onChange }: { value: ServiceCategoryContent[]; onChange: (value: ServiceCategoryContent[]) => void }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(value[0]?.id || "");
  const [categoryForm, setCategoryForm] = useState<ServiceCategoryContent>({ id: "", title: "", subtitle: "", accent: "", services: [] });
  const [categoryEditingIndex, setCategoryEditingIndex] = useState<number | null>(null);
  const [serviceForm, setServiceForm] = useState<ServiceContent>(emptyService);
  const [serviceEditingIndex, setServiceEditingIndex] = useState<number | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const selectedIndex = value.findIndex((category) => category.id === selectedCategoryId);
  const selectedCategory = selectedIndex >= 0 ? value[selectedIndex] : value[0];

  const changeCategories = (categories: ServiceCategoryContent[]) => {
    onChange(categories);
    if (!selectedCategoryId && categories[0]?.id) {
      setSelectedCategoryId(categories[0].id);
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ id: "", title: "", subtitle: "", accent: "", services: [] });
    setCategoryEditingIndex(null);
  };

  const submitCategory = () => {
    if (!categoryForm.title.trim()) {
      alert("اسم القسم مطلوب.");
      return;
    }

    const normalized: ServiceCategoryContent = {
      ...categoryForm,
      id: categoryForm.id || createId("category"),
      services: categoryForm.services || [],
    };

    if (categoryEditingIndex === null) {
      changeCategories([...value, normalized]);
      setSelectedCategoryId(normalized.id);
    } else {
      changeCategories(value.map((category, index) => (index === categoryEditingIndex ? normalized : category)));
      setSelectedCategoryId(normalized.id);
    }
    resetCategoryForm();
  };

  const editCategory = (index: number) => {
    setCategoryEditingIndex(index);
    setCategoryForm({ ...value[index], services: value[index].services || [] });
  };

  const deleteCategory = (index: number) => {
    if (!confirm("متأكد من حذف القسم وكل الخدمات داخله؟")) return;
    const next = value.filter((_, itemIndex) => itemIndex !== index);
    changeCategories(next);
    setSelectedCategoryId(next[0]?.id || "");
  };

  const updateSelectedCategory = (category: ServiceCategoryContent) => {
    onChange(value.map((item, index) => (index === selectedIndex ? category : item)));
  };

  const startAddService = () => {
    setServiceForm(emptyService);
    setServiceEditingIndex(null);
    setShowServiceForm(true);
  };

  const startEditService = (index: number) => {
    if (!selectedCategory) return;
    setServiceForm({ ...selectedCategory.services[index], priceOptions: selectedCategory.services[index].priceOptions || [] });
    setServiceEditingIndex(index);
    setShowServiceForm(true);
  };

  const submitService = () => {
    if (!selectedCategory) {
      alert("لازم تضيف قسم خدمات الأول.");
      return;
    }
    if (!serviceForm.title.trim()) {
      alert("اسم الخدمة مطلوب.");
      return;
    }

    const services = selectedCategory.services || [];
    const nextServices = serviceEditingIndex === null
      ? [...services, serviceForm]
      : services.map((service, index) => (index === serviceEditingIndex ? serviceForm : service));

    updateSelectedCategory({ ...selectedCategory, services: nextServices });
    setServiceForm(emptyService);
    setServiceEditingIndex(null);
    setShowServiceForm(false);
  };

  const deleteService = (index: number) => {
    if (!selectedCategory) return;
    updateSelectedCategory({ ...selectedCategory, services: selectedCategory.services.filter((_, itemIndex) => itemIndex !== index) });
  };

  return (
    <AdminShellCard
      title="الخدمات والأسعار"
      description="الأقسام والخدمات والأسعار والباقات متقسمة لجداول وفورمات. مفيش تعديل JSON هنا."
      action={<Button type="button" variant="orange" onClick={startAddService} disabled={!selectedCategory}><Plus className="h-4 w-4" />إضافة خدمة</Button>}
    >
      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-[1.5rem] border border-wine/10 bg-peach/30 p-4">
            <h3 className="font-black text-wineDark">أقسام الخدمات</h3>
            <div className="mt-3 space-y-2">
              {value.length === 0 ? (
                <p className="rounded-xl bg-white p-4 text-sm font-bold text-wine">مفيش أقسام خدمات حاليًا.</p>
              ) : (
                value.map((category, index) => (
                  <div key={category.id || index} className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCategoryId(category.id)}
                      className={cn(
                        "min-w-0 flex-1 rounded-2xl border px-4 py-3 text-right text-sm font-black transition",
                        selectedCategory?.id === category.id ? "border-orange bg-orange text-white" : "border-wine/10 bg-white text-wine hover:bg-peach"
                      )}
                    >
                      <span className="block truncate">{category.title}</span>
                      <span className="mt-1 block text-xs opacity-75">{category.services?.length || 0} خدمة</span>
                    </button>
                    <Button type="button" size="icon" variant="outline" onClick={() => editCategory(index)} aria-label="تعديل القسم"><Edit3 className="h-4 w-4" /></Button>
                    <Button type="button" size="icon" variant="ghost" onClick={() => deleteCategory(index)} aria-label="حذف القسم"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-wine/10 bg-white p-4">
            <h3 className="font-black text-wineDark">{categoryEditingIndex === null ? "إضافة قسم" : "تعديل قسم"}</h3>
            <div className="mt-4 space-y-3">
              <Field label="اسم القسم">
                <Input value={categoryForm.title} onChange={(event) => setCategoryForm({ ...categoryForm, title: event.target.value })} placeholder="الجلدية والتجميل" />
              </Field>
              <Field label="Slug / ID">
                <Input value={categoryForm.id} onChange={(event) => setCategoryForm({ ...categoryForm, id: event.target.value })} placeholder="derma" dir="ltr" />
              </Field>
              <Field label="وصف القسم">
                <Textarea value={categoryForm.subtitle} onChange={(event) => setCategoryForm({ ...categoryForm, subtitle: event.target.value })} placeholder="وصف مختصر" />
              </Field>
              <Field label="Accent">
                <Input value={categoryForm.accent} onChange={(event) => setCategoryForm({ ...categoryForm, accent: event.target.value })} placeholder="منطقة النتائج الطبيعية" />
              </Field>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="orange" onClick={submitCategory}><Check className="h-4 w-4" />{categoryEditingIndex === null ? "إضافة" : "تطبيق"}</Button>
                {categoryEditingIndex !== null ? <Button type="button" variant="outline" onClick={resetCategoryForm}>إلغاء</Button> : null}
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          {selectedCategory ? (
            <>
              <div className="rounded-[1.5rem] border border-wine/10 bg-white p-5">
                <p className="text-sm font-black text-orange">القسم الحالي</p>
                <h3 className="mt-1 text-2xl font-black text-wineDark">{selectedCategory.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{selectedCategory.subtitle || "لا يوجد وصف للقسم."}</p>
              </div>

              {showServiceForm ? (
                <ServiceForm
                  form={serviceForm}
                  setForm={setServiceForm}
                  editing={serviceEditingIndex !== null}
                  onSubmit={submitService}
                  onCancel={() => { setShowServiceForm(false); setServiceForm(emptyService); setServiceEditingIndex(null); }}
                />
              ) : null}

              <div className="overflow-hidden rounded-[1.5rem] border border-wine/10 bg-white">
                {(selectedCategory.services || []).length === 0 ? (
                  <EmptyAdminState title="مفيش خدمات في القسم ده حاليًا." />
                ) : (
                  <table className="w-full text-right text-sm">
                    <thead className="bg-peach text-wineDark">
                      <tr>
                        <th className="p-3">الخدمة</th>
                        <th className="p-3">السعر</th>
                        <th className="p-3">التصنيف</th>
                        <th className="p-3">الباقات</th>
                        <th className="p-3">تحكم</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCategory.services.map((service, index) => (
                        <tr key={`${service.title}-${index}`} className="border-t border-wine/10 align-top">
                          <td className="max-w-[260px] p-3">
                            <p className="font-black text-wineDark">{service.title}</p>
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{service.short}</p>
                          </td>
                          <td className="p-3 font-black text-orange">{service.price || "-"}</td>
                          <td className="p-3 text-muted-foreground">
                            <div>{service.gender === "female" ? "نساء" : service.gender === "male" ? "رجال" : "الكل"}</div>
                            {service.laserDevice ? <div className="mt-1 text-xs">{service.laserDevice}</div> : null}
                          </td>
                          <td className="p-3 text-muted-foreground">{service.priceOptions?.length || 0}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-2">
                              <Button type="button" size="sm" variant="outline" onClick={() => startEditService(index)}><Edit3 className="h-3 w-3" />تعديل</Button>
                              <Button type="button" size="sm" variant="ghost" onClick={() => deleteService(index)}><Trash2 className="h-3 w-3" />حذف</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          ) : (
            <EmptyAdminState title="مفيش أقسام خدمات حاليًا." />
          )}
        </div>
      </div>
    </AdminShellCard>
  );
}

type GenericKey = "offers" | "beforeAfterCases" | "devices" | "gallery" | "testimonials";

type GenericItem = OfferContent | BeforeAfterCaseContent | DeviceContent | GalleryItemContent | TestimonialContent;

function CollectionEditor({
  type,
  title,
  description,
  items,
  onChange,
  uploadState,
  setUploadState,
}: {
  type: GenericKey;
  title: string;
  description: string;
  items: GenericItem[];
  onChange: (items: GenericItem[]) => void;
  uploadState: UploadState | null;
  setUploadState: (value: UploadState | null) => void;
}) {
  const createEmpty = (): GenericItem => {
    if (type === "offers") return { title: "", description: "", image: "", oldPrice: "", newPrice: "", startsAt: "", endsAt: "", isActive: true };
    if (type === "beforeAfterCases") return { title: "", service: "", image: "" };
    if (type === "devices") return { name: "", description: "", image: "", note: "" };
    if (type === "gallery") return { title: "", src: "" };
    return { name: "", text: "", rating: 5 };
  };

  const [form, setForm] = useState<GenericItem>(createEmpty());
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const reset = () => {
    setForm(createEmpty());
    setEditingIndex(null);
  };

  const updateForm = (key: string, value: string | boolean | number) => {
    setForm((current) => ({ ...current, [key]: value } as GenericItem));
  };

  const getTitle = (item: GenericItem) => {
    if ("title" in item && item.title) return item.title;
    if ("name" in item && item.name) return item.name;
    return "بدون عنوان";
  };

  const getImage = (item: GenericItem) => {
    if ("image" in item) return item.image || "";
    if ("src" in item) return item.src || "";
    return "";
  };

  const getSubtitle = (item: GenericItem): string => {
    if ("description" in item) return String(item.description || "");
    if ("text" in item) return String(item.text || "");
    if ("service" in item) return String(item.service || "");
    if ("note" in item) return String(item.note || "");
    return "";
  };

  const submit = () => {
    if (type === "devices") {
      if (!(form as DeviceContent).name?.trim()) return alert("اسم الجهاز مطلوب.");
    } else if (type === "testimonials") {
      if (!(form as TestimonialContent).name?.trim()) return alert("اسم العميل مطلوب.");
    } else if (!(form as { title?: string }).title?.trim()) {
      return alert("العنوان مطلوب.");
    }

    if (editingIndex === null) {
      onChange([...items, form]);
    } else {
      onChange(items.map((item, index) => (index === editingIndex ? form : item)));
    }
    reset();
  };

  return (
    <AdminShellCard
      title={title}
      description={description}
      action={<Button type="button" variant="orange" onClick={reset}><Plus className="h-4 w-4" />إضافة جديد</Button>}
    >
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div className="overflow-hidden rounded-[1.5rem] border border-wine/10 bg-white">
          {items.length === 0 ? (
            <EmptyAdminState title={`مفيش بيانات في ${title} حاليًا.`} />
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-peach text-wineDark">
                <tr>
                  <th className="p-3">الصورة</th>
                  <th className="p-3">العنوان</th>
                  {type === "offers" ? <th className="p-3">الحالة</th> : null}
                  {type === "testimonials" ? <th className="p-3">التقييم</th> : null}
                  <th className="p-3">تحكم</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={`${getTitle(item)}-${index}`} className="border-t border-wine/10 align-middle">
                    <td className="p-3">
                      {getImage(item) ? <img src={getImage(item)} alt="" className="h-16 w-24 rounded-xl object-cover" /> : <div className="grid h-16 w-24 place-items-center rounded-xl bg-peach text-xs font-bold text-wine">بدون صورة</div>}
                    </td>
                    <td className="max-w-[260px] p-3">
                      <p className="font-black text-wineDark">{getTitle(item)}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                        {getSubtitle(item)}
                      </p>
                    </td>
                    {type === "offers" ? <td className="p-3"><StatusBadge active={(item as OfferContent).isActive} /></td> : null}
                    {type === "testimonials" ? <td className="p-3 font-black text-orange">{(item as TestimonialContent).rating || 0}</td> : null}
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => { setForm(item); setEditingIndex(index); }}><Edit3 className="h-3 w-3" />تعديل</Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="h-3 w-3" />حذف</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="rounded-[1.5rem] border border-wine/10 bg-peach/30 p-4">
          <h3 className="text-lg font-black text-wineDark">{editingIndex === null ? "إضافة" : "تعديل"}</h3>
          <div className="mt-4 space-y-4">
            {type === "offers" ? (
              <>
                <Field label="عنوان العرض"><Input value={(form as OfferContent).title || ""} onChange={(event) => updateForm("title", event.target.value)} /></Field>
                <Field label="وصف العرض"><Textarea value={(form as OfferContent).description || ""} onChange={(event) => updateForm("description", event.target.value)} /></Field>
                <ImageField label="صورة العرض" value={(form as OfferContent).image || ""} fieldId="offer-image" onChange={(value) => updateForm("image", value)} uploadState={uploadState} setUploadState={setUploadState} />
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="السعر قبل"><Input value={(form as OfferContent).oldPrice || ""} onChange={(event) => updateForm("oldPrice", event.target.value)} /></Field>
                  <Field label="السعر بعد"><Input value={(form as OfferContent).newPrice || ""} onChange={(event) => updateForm("newPrice", event.target.value)} /></Field>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="تاريخ البداية"><Input type="date" value={(form as OfferContent).startsAt || ""} onChange={(event) => updateForm("startsAt", event.target.value)} /></Field>
                  <Field label="تاريخ النهاية"><Input type="date" value={(form as OfferContent).endsAt || ""} onChange={(event) => updateForm("endsAt", event.target.value)} /></Field>
                </div>
                <label className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-wineDark">
                  <input type="checkbox" checked={(form as OfferContent).isActive !== false} onChange={(event) => updateForm("isActive", event.target.checked)} />
                  العرض ظاهر في الموقع
                </label>
              </>
            ) : null}

            {type === "beforeAfterCases" ? (
              <>
                <Field label="العنوان"><Input value={(form as BeforeAfterCaseContent).title || ""} onChange={(event) => updateForm("title", event.target.value)} /></Field>
                <Field label="نوع الخدمة"><Input value={(form as BeforeAfterCaseContent).service || ""} onChange={(event) => updateForm("service", event.target.value)} /></Field>
                <ImageField label="الصورة" value={(form as BeforeAfterCaseContent).image || ""} fieldId="case-image" onChange={(value) => updateForm("image", value)} uploadState={uploadState} setUploadState={setUploadState} />
              </>
            ) : null}

            {type === "devices" ? (
              <>
                <Field label="اسم الجهاز"><Input value={(form as DeviceContent).name || ""} onChange={(event) => updateForm("name", event.target.value)} /></Field>
                <Field label="الوصف"><Textarea value={(form as DeviceContent).description || ""} onChange={(event) => updateForm("description", event.target.value)} /></Field>
                <ImageField label="صورة الجهاز" value={(form as DeviceContent).image || ""} fieldId="device-image" onChange={(value) => updateForm("image", value)} uploadState={uploadState} setUploadState={setUploadState} />
                <Field label="ملاحظة"><Input value={(form as DeviceContent).note || ""} onChange={(event) => updateForm("note", event.target.value)} /></Field>
              </>
            ) : null}

            {type === "gallery" ? (
              <>
                <Field label="عنوان الصورة"><Input value={(form as GalleryItemContent).title || ""} onChange={(event) => updateForm("title", event.target.value)} /></Field>
                <ImageField label="الصورة" value={(form as GalleryItemContent).src || ""} fieldId="gallery-image" onChange={(value) => updateForm("src", value)} uploadState={uploadState} setUploadState={setUploadState} />
              </>
            ) : null}

            {type === "testimonials" ? (
              <>
                <Field label="اسم العميل"><Input value={(form as TestimonialContent).name || ""} onChange={(event) => updateForm("name", event.target.value)} /></Field>
                <Field label="الرأي"><Textarea value={(form as TestimonialContent).text || ""} onChange={(event) => updateForm("text", event.target.value)} /></Field>
                <Field label="التقييم"><Input type="number" min={1} max={5} value={(form as TestimonialContent).rating || 5} onChange={(event) => updateForm("rating", Number(event.target.value))} /></Field>
              </>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="orange" onClick={submit}><Check className="h-4 w-4" />{editingIndex === null ? "إضافة" : "تطبيق"}</Button>
              {editingIndex !== null ? <Button type="button" variant="outline" onClick={reset}>إلغاء</Button> : null}
            </div>
          </div>
        </div>
      </div>
    </AdminShellCard>
  );
}

export function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(() => cloneContent(initialContent));
  const [active, setActive] = useState<AdminSectionKey>("overview");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState | null>(null);

  const currentSection = useMemo(() => menuSections.find((section) => section.key === active), [active]);

  const save = async () => {
    setSaving(true);
    setStatus("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    const data = await response.json().catch(() => ({}));
    setSaving(false);

    if (!response.ok) {
      setStatus(data.message || "تعذر حفظ التعديلات.");
      return;
    }

    setStatus("تم حفظ التعديلات وتحديث الموقع.");
    router.refresh();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-hero-glow text-foreground">
      <div className="border-b border-wine/10 bg-white/85 backdrop-blur-xl">
        <div className="container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black text-orange">Leen Admin</p>
            <h1 className="mt-1 text-3xl font-black text-wineDark">إدارة محتوى الموقع</h1>
            <p className="mt-2 text-sm text-muted-foreground">التعديل الآن من سايد بار، جداول بيانات، وفورمات إضافة وتعديل بدون JSON.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => window.open("/", "_blank")}><Eye className="h-4 w-4" />فتح الموقع</Button>
            <Button type="button" variant="orange" onClick={save} disabled={saving}><Save className="h-4 w-4" />{saving ? "جاري الحفظ..." : "حفظ كل التعديلات"}</Button>
            <Button type="button" variant="outline" onClick={logout}><LogOut className="h-4 w-4" />خروج</Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {status ? <p className="mb-5 rounded-2xl bg-white px-4 py-3 text-sm font-black text-wine shadow-sm">{status}</p> : null}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[2rem] border border-wine/10 bg-white p-3 shadow-sm">
              <div className="mb-3 rounded-[1.5rem] bg-peach px-4 py-3">
                <p className="text-sm font-black text-wineDark">سكاشن الموقع</p>
                <p className="mt-1 text-xs text-muted-foreground">اختار سكشن وعدّل بياناته.</p>
              </div>
              <nav className="space-y-2">
                {menuSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.key}
                      type="button"
                      onClick={() => setActive(section.key)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-right text-sm font-black transition",
                        active === section.key ? "bg-orange text-white shadow-lg shadow-orange/20" : "text-wine hover:bg-peach"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {section.label}
                      </span>
                      <ChevronLeft className="h-4 w-4 opacity-70" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main>
            <div className="mb-4 flex items-center gap-2 text-sm font-black text-wine">
              <span>لوحة التحكم</span>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-orange">{currentSection?.label}</span>
            </div>

            {active === "overview" ? <Overview content={content} /> : null}

            {active === "settings" ? (
              <SettingsEditor value={content.siteConfig} onChange={(siteConfig) => setContent((current) => ({ ...current, siteConfig }))} />
            ) : null}

            {active === "heroStats" ? (
              <HeroStatsEditor value={content.heroStats || []} onChange={(heroStats) => setContent((current) => ({ ...current, heroStats }))} />
            ) : null}

            {active === "serviceCategories" ? (
              <ServicesEditor value={content.serviceCategories || []} onChange={(serviceCategories) => setContent((current) => ({ ...current, serviceCategories }))} />
            ) : null}

            {active === "offers" ? (
              <CollectionEditor
                type="offers"
                title="العروض"
                description="إضافة وتعديل العروض بصورة وأسعار وتاريخ ظهور."
                items={content.offers || []}
                onChange={(offers) => setContent((current) => ({ ...current, offers: offers as OfferContent[] }))}
                uploadState={uploadState}
                setUploadState={setUploadState}
              />
            ) : null}

            {active === "beforeAfterCases" ? (
              <CollectionEditor
                type="beforeAfterCases"
                title="قبل وبعد"
                description="حالات قبل وبعد بصور وعنوان ونوع الخدمة."
                items={content.beforeAfterCases || []}
                onChange={(beforeAfterCases) => setContent((current) => ({ ...current, beforeAfterCases: beforeAfterCases as BeforeAfterCaseContent[] }))}
                uploadState={uploadState}
                setUploadState={setUploadState}
              />
            ) : null}

            {active === "devices" ? (
              <CollectionEditor
                type="devices"
                title="الأجهزة"
                description="أسماء الأجهزة وصورها ووصفها داخل سكشن الأجهزة."
                items={content.devices || []}
                onChange={(devices) => setContent((current) => ({ ...current, devices: devices as DeviceContent[] }))}
                uploadState={uploadState}
                setUploadState={setUploadState}
              />
            ) : null}

            {active === "gallery" ? (
              <CollectionEditor
                type="gallery"
                title="صور العيادة"
                description="صور العيادة والمعرض، مع رفع مباشر إلى Cloudinary."
                items={content.gallery || []}
                onChange={(gallery) => setContent((current) => ({ ...current, gallery: gallery as GalleryItemContent[] }))}
                uploadState={uploadState}
                setUploadState={setUploadState}
              />
            ) : null}

            {active === "testimonials" ? (
              <CollectionEditor
                type="testimonials"
                title="آراء العملاء"
                description="لو السكشن فاضي سيظهر في الموقع أنه لا توجد آراء حاليًا."
                items={content.testimonials || []}
                onChange={(testimonials) => setContent((current) => ({ ...current, testimonials: testimonials as TestimonialContent[] }))}
                uploadState={uploadState}
                setUploadState={setUploadState}
              />
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
