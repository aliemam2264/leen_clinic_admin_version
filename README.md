# Leen Clinic Landing Page

Landing page ـ:

- Next.js
- Tailwind CSS
- shadcn-style UI components
- WhatsApp booking
- RTL Arabic layout

## Admin Dashboard + MongoDB + Cloudinary

تم إضافة لوحة تحكم للموقع على:

```bash
/admin
```

### 1) تثبيت الحزم

```bash
npm install
```

### 2) إعداد ملف البيئة

انسخ `.env.example` إلى `.env.local` وعدل القيم:

```bash
cp .env.example .env.local
```

المطلوب:

```env
MONGODB_URI=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3) نقل بيانات المشروع الحالية إلى MongoDB

الـ seed يستخدم بياناتك الحالية الموجودة في `data/initial-content.json` فقط، ولا يضيف بيانات وهمية.

```bash
npm run seed
```

### 4) تشغيل المشروع

```bash
npm run dev
```

### 5) ملاحظات

- الصور تترفع من لوحة التحكم إلى Cloudinary، والرابط الناتج يتم نسخه وتضعه في الحقل المناسب داخل JSON.
- إذا كان أي سكشن مصفوفته فارغة `[]` سيظهر للمستخدم رسالة توضح أنه لا توجد بيانات في هذا السكشن حاليًا.
- الموقع يقرأ من MongoDB عند وجود `MONGODB_URI`. لو الداتابيز غير مفعلة، يستخدم نفس بيانات المشروع الحالية كـ fallback للتطوير فقط.

## Admin Dashboard UI

لوحة التحكم الآن ليست JSON editor. ستجد داخل `/admin` سايد بار للسكاشن، وكل سكشن له جدول بيانات وفورم إضافة/تعديل:

- الإعدادات العامة وروابط السوشيال
- إحصائيات الهيرو
- الخدمات والأسعار والباقات
- العروض
- قبل وبعد
- الأجهزة
- صور العيادة
- آراء العملاء

رفع الصور يتم مباشرة إلى Cloudinary من حقول الصور داخل الفورم، والرابط يتم وضعه تلقائيًا في الحقل.
