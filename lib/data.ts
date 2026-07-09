import {
  BadgeCheck,
  CalendarCheck,
  Camera,
  Facebook,
  HeartPulse,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Syringe,
  Waves,
} from "lucide-react";

export const siteConfig = {
  brand: "Leen",
  arabicName: "مجمع لين الشرق الطبي",
  tagline: "أسنان · جلدية · تجميل · ليزر",
  phoneDisplay: "+966538738118",
  whatsappNumber: "966538738118",
  address: "حي السويدي الغربي - الرياض",
  mapEmbedUrl: "https://share.google/1z7PaxdLfiOKyHfEC",
  workingHours: "يوميًا من 9 صباحا حتى 10 مساءا",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/leen_alsharq_clinics/", icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com/share/17zboYKe6c/", icon: Facebook },
    { label: "WhatsApp", href: "https://wa.me/966538738118", icon: MessageCircle },
    { label: "Location", href: "https://share.google/1z7PaxdLfiOKyHfEC", icon: MapPin }
  ]
};

export const heroStats = [
  { value: "+12000", label: "حالة تم التعامل معها" },
  { value: "4.1/5", label: "تقييم العملاء" },
  { value: "+17000", label: "خدمة جلدية وليزر" }
];

export const trustItems = [
  { title: "تعقيم كامل", description: "بيئة آمنة ومريحة قبل وأثناء الجلسة", icon: ShieldCheck },
  { title: "خطة مخصصة", description: "اختيار الخدمة حسب الحالة واحتياج البشرة", icon: HeartPulse },
  { title: "حجز سريع", description: "العميل يحجز مباشرة من خلال واتساب", icon: CalendarCheck }
];

export type ServiceGender = "female" | "male" | "both";

export type LaserDevice = "gentle-deka" | "gentle-pro" | "splendor-x";

export type PriceOption = {
  label: string;
  price: string;
};

export type Service = {
  title: string;
  price: string;
  short: string;
  definition: string;
  benefits: string[];
  uses: string[];
  icon: "syringe" | "sparkles" | "waves" | "camera";
  gender?: ServiceGender;
  laserDevice?: LaserDevice;
  note?: string;
  priceOptions?: PriceOption[];
};

const laserPriceOptions = (
  one: string,
  three: string,
  five: string,
  seven: string
): PriceOption[] => [
  { label: "جلسة واحدة", price: one },
  { label: "٣ جلسات", price: three },
  { label: "٥ جلسات", price: five },
  { label: "٧ جلسات", price: seven }
];

const laserService = ({
  title,
  gender,
  laserDevice,
  note,
  prices
}: {
  title: string;
  gender: ServiceGender;
  laserDevice: LaserDevice;
  note: string;
  prices: PriceOption[];
}): Service => ({
  title,
  price: "باقات متعددة",
  priceOptions: prices,
  gender,
  laserDevice,
  note,
  short: "باقة ليزر لإزالة الشعر حسب المنطقة وعدد الجلسات.",
  definition:
    "جلسات ليزر منظمة باستخدام الجهاز المناسب، مع اختيار الباقة حسب المنطقة وعدد الجلسات واحتياج الحالة.",
  benefits: ["باقات واضحة", "نتيجة تدريجية", "اختيار مناسب حسب المنطقة"],
  uses: ["إزالة الشعر", "الجسم", "المناطق المحددة"],
  icon: "waves"
});

export type ServiceCategory = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  services: Service[];
};

const pricePlaceholder = "يحدد بعد الاستشارة";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "derma",
    title: "الجلدية والتجميل",
    subtitle: "خدمات حقن، نضارة، تقشير، بوتكس، فيلر، بلازما وتجديد البشرة.",
    accent: "منطقة النتائج الطبيعية",
    services: [
      {
        title: "فراكشنال ليزر",
        price: "جلسة ٣٠٠ / ٣ جلسات ٦٠٠",
        short: "لتحسين آثار الحبوب والملمس والمسام.",
        definition: "تقنية تساعد على تجديد سطح البشرة وتحسين مظهر الندبات وآثار الحبوب تدريجيًا حسب الحالة.",
        benefits: ["تحسين آثار الحبوب", "تجديد ملمس البشرة", "تقليل مظهر المسام"],
        uses: ["آثار الحبوب", "المسام الواسعة", "ملمس غير منتظم"],
        icon: "waves"
      },
      {
        title: "إبرة الريتش ٥ مل",
        price: "١٦٥٠",
        short: "جلسة نضارة وترطيب عميق للبشرة.",
        definition: "إبرة مخصصة لتحسين جودة البشرة ودعم النضارة والترطيب حسب تقييم الطبيب.",
        benefits: ["نضارة أعلى", "ترطيب أفضل", "تحسين حيوية البشرة"],
        uses: ["بهتان البشرة", "الجفاف", "الإجهاد"],
        icon: "syringe"
      },
      {
        title: "إبرة العنبر",
        price: "٨٥٠",
        short: "للنضارة وتحسين ملمس البشرة.",
        definition: "جلسة تجميلية تستهدف تحسين مظهر البشرة العام ودعم الترطيب والإشراقة.",
        benefits: ["تحسين الملمس", "إشراقة أفضل", "مظهر أكثر حيوية"],
        uses: ["البشرة الباهتة", "الجفاف", "قبل المناسبات"],
        icon: "syringe"
      },
      {
        title: "إبرة السالمون",
        price: "٨٥٠",
        short: "لدعم نضارة البشرة وتحسين جودتها.",
        definition: "بروتوكول تجميلي يساعد على تحسين ترطيب البشرة وإشراقتها حسب احتياج الحالة.",
        benefits: ["إشراقة تدريجية", "تحسين حيوية البشرة", "مناسب للبشرة المجهدة"],
        uses: ["نقص النضارة", "جفاف البشرة", "الملمس المرهق"],
        icon: "syringe"
      },
      {
        title: "إبرة البروفايلو",
        price: "١١٠٠",
        short: "لتحسين جودة الجلد والترطيب العميق.",
        definition: "إبرة Skin Booster تساعد على دعم مرونة البشرة وترطيبها وتحسين مظهرها العام.",
        benefits: ["ترطيب عميق", "تحسين جودة الجلد", "مظهر أكثر نضارة"],
        uses: ["جفاف البشرة", "فقدان النضارة", "تحسين مرونة الجلد"],
        icon: "syringe"
      },
      {
        title: "إبرة السنيوريتا",
        price: "١٥٩٩",
        short: "بروتوكول نضارة مميز للبشرة.",
        definition: "جلسة مخصصة لتحسين نضارة البشرة وترطيبها ضمن خطة مناسبة للحالة.",
        benefits: ["نضارة واضحة", "تحسين ملمس البشرة", "إطلالة أكثر حيوية"],
        uses: ["البشرة المجهدة", "بهتان الوجه", "العناية قبل المناسبات"],
        icon: "syringe"
      },
      {
        title: "إبرة سكلبترا",
        price: "٢٣٩٩",
        short: "محفز كولاجين لتحسين مظهر البشرة تدريجيًا.",
        definition: "إجراء تجميلي يساعد على تحفيز الكولاجين وتحسين امتلاء وجودة الجلد بشكل تدريجي.",
        benefits: ["تحفيز الكولاجين", "تحسين جودة الجلد", "نتيجة تدريجية طبيعية"],
        uses: ["فقدان النضارة", "ضعف مرونة الجلد", "تحسين مظهر الوجه"],
        icon: "syringe"
      },
      {
        title: "إبرة الراديس الكالسيوم",
        price: "١٤٩٩",
        short: "لتحفيز الكولاجين وتحسين جودة الجلد.",
        definition: "إبرة تجميلية تستخدم لتحسين مظهر الجلد ودعم الكولاجين حسب تقييم الطبيب.",
        benefits: ["تحسين الشد", "دعم الكولاجين", "نتيجة طبيعية تدريجية"],
        uses: ["فقدان المرونة", "تحسين جودة البشرة", "مظهر الوجه العام"],
        icon: "syringe"
      },
      {
        title: "Rich Advance ٤ مل",
        price: "١٦٠٠",
        short: "إبرة محفزات كولاجين لتحسين جودة البشرة.",
        definition: "بروتوكول مخصص لدعم الكولاجين وتحسين مظهر البشرة العام.",
        benefits: ["تحفيز الكولاجين", "تحسين النضارة", "دعم مرونة البشرة"],
        uses: ["البشرة المجهدة", "فقدان الحيوية", "تحسين جودة الجلد"],
        icon: "syringe"
      },
      {
        title: "ديرمابن نضارة - ميزوثيرابي",
        price: "٣٠٠",
        short: "جلسة نضارة وتحسين ملمس البشرة.",
        definition: "جلسة ديرمابن مع ميزوثيرابي لدعم النضارة وتحسين مظهر البشرة.",
        benefits: ["نضارة تدريجية", "تحسين الملمس", "دعم الترطيب"],
        uses: ["بهتان البشرة", "الملمس غير الناعم", "العناية الدورية"],
        icon: "sparkles"
      },
      {
        title: "ديرمابن علاجي للحبوب",
        price: "٤٥٠",
        short: "جلسة مخصصة للبشرة المعرضة للحبوب.",
        definition: "بروتوكول ديرمابن علاجي حسب حالة البشرة للمساعدة في تحسين آثار ومظهر الحبوب.",
        benefits: ["تحسين ملمس البشرة", "دعم خطة علاج الحبوب", "تقليل مظهر الآثار تدريجيًا"],
        uses: ["الحبوب", "آثار بسيطة", "ملمس غير منتظم"],
        icon: "sparkles"
      },
      {
        title: "تقشير بارد + الكريم المنزلي",
        price: "١٧٥٠",
        short: "بروتوكول تقشير مع متابعة منزلية.",
        definition: "جلسة تقشير بارد مع كريم منزلي للمساعدة في تحسين التصبغات وتوحيد لون البشرة حسب الحالة.",
        benefits: ["تحسين التصبغات", "توحيد اللون", "استكمال العناية بالمنزل"],
        uses: ["الكلف", "التصبغات", "عدم توحد اللون"],
        icon: "sparkles"
      },
      {
        title: "تقشير بارد بدون كريم",
        price: "٧٥٠",
        short: "جلسة تقشير لتحسين اللون والملمس.",
        definition: "تقشير بارد يتم تحديده حسب نوع البشرة والهدف العلاجي.",
        benefits: ["تحسين اللون", "إشراقة أفضل", "تحسين الملمس"],
        uses: ["تصبغات", "بهتان", "عدم توحد لون البشرة"],
        icon: "sparkles"
      },
      {
        title: "تقشير إبط",
        price: "٦٠٠",
        short: "لتحسين مظهر ولون منطقة الإبط.",
        definition: "جلسة تقشير مخصصة لمنطقة الإبط حسب درجة التصبغ ونوع البشرة.",
        benefits: ["تحسين اللون", "مظهر أنعم", "عناية موضعية"],
        uses: ["تصبغ الإبط", "عدم توحد اللون", "اسمرار موضعي"],
        icon: "sparkles"
      },
      {
        title: "تقشير ركب وأكواع كيميائي",
        price: "جلسة ٤٠٠ / ٣ جلسات ٩٠٠",
        short: "لتحسين اسمرار الركب والأكواع.",
        definition: "جلسات تقشير كيميائي للركب والأكواع حسب درجة التصبغ واستجابة الجلد.",
        benefits: ["تحسين الاسمرار", "ملمس أنعم", "نتيجة تدريجية"],
        uses: ["اسمرار الركب", "اسمرار الأكواع", "خشونة الجلد"],
        icon: "sparkles"
      },
      {
        title: "تقشير كيميائي لليدين",
        price: "٤٥٠",
        short: "لتحسين لون وملمس اليدين.",
        definition: "جلسة تقشير كيميائي لليدين لتحسين المظهر العام والملمس حسب الحالة.",
        benefits: ["تحسين اللون", "ملمس أنعم", "إشراقة أفضل"],
        uses: ["اسمرار اليدين", "بهتان", "خشونة بسيطة"],
        icon: "sparkles"
      },
      {
        title: "فيلر ستايلج",
        price: "٦٩٩",
        short: "لتحسين الامتلاء وتحديد الملامح.",
        definition: "فيلر يستخدم حسب المنطقة المطلوبة وتقييم الطبيب للحصول على نتيجة طبيعية ومتناسقة.",
        benefits: ["تحسين تناسق الملامح", "نتيجة طبيعية", "تحديد ناعم"],
        uses: ["الشفاه", "الخدود", "تحسين خطوط الوجه"],
        icon: "syringe"
      },
      {
        title: "فيلر جوفيديرم",
        price: "٨٩٩",
        short: "فيلر لتحسين الامتلاء بشكل طبيعي.",
        definition: "جلسة فيلر حسب احتياج الحالة والمنطقة المطلوبة مع مراعاة التناسق الطبيعي.",
        benefits: ["امتلاء متوازن", "تحسين الملامح", "مظهر طبيعي"],
        uses: ["تحديد الشفاه", "الخدود", "مناطق الوجه"],
        icon: "syringe"
      },
      {
        title: "فيلر توسيال",
        price: "٨٩٩",
        short: "فيلر لتحديد وتحسين ملامح الوجه.",
        definition: "اختيار مناسب لبعض الحالات حسب تقييم الطبيب والمنطقة المستهدفة.",
        benefits: ["تحديد الملامح", "تحسين التناسق", "نتيجة ناعمة"],
        uses: ["الشفاه", "الخدود", "تحسين خطوط الوجه"],
        icon: "syringe"
      },
      {
        title: "بوتكس جبهة وحول العين",
        price: "٦٩٩",
        short: "لتقليل الخطوط التعبيرية في الجبهة وحول العين.",
        definition: "حقن بوتكس بجرعات دقيقة لتخفيف نشاط العضلات المسؤولة عن الخطوط التعبيرية.",
        benefits: ["مظهر أكثر راحة", "تقليل خطوط الجبهة", "تحسين خطوط حول العين"],
        uses: ["الجبهة", "حول العين", "خطوط التعبير"],
        icon: "syringe"
      },
      {
        title: "بوتكس الابتسامة اللثوية",
        price: "٣٩٩",
        short: "لتحسين مظهر الابتسامة عند ظهور اللثة.",
        definition: "إجراء دقيق يساعد على تقليل ظهور اللثة أثناء الابتسامة في الحالات المناسبة.",
        benefits: ["ابتسامة أكثر اتزانًا", "إجراء غير جراحي", "نتيجة ناعمة"],
        uses: ["Gummy Smile", "تحسين الابتسامة", "ظهور اللثة الزائد"],
        icon: "syringe"
      },
      {
        title: "بوتكس عند الأنف",
        price: "٢٩٩",
        short: "لتحسين خطوط أو حركة منطقة الأنف حسب الحالة.",
        definition: "حقن دقيق لمنطقة الأنف حسب تقييم الطبيب والهدف التجميلي.",
        benefits: ["تحسين مظهر المنطقة", "جلسة سريعة", "نتيجة ناعمة"],
        uses: ["منطقة الأنف", "خطوط التعبير", "تحسين مظهر الوجه"],
        icon: "syringe"
      },
      {
        title: "بوتكس حول العين",
        price: "٣٩٩",
        short: "لتقليل مظهر الخطوط حول العين.",
        definition: "إجراء تجميلي يساعد على تهدئة مظهر الخطوط التعبيرية حول العين.",
        benefits: ["مظهر أكثر راحة", "تقليل الخطوط", "إطلالة أهدأ"],
        uses: ["خطوط حول العين", "التعبيرات", "مظهر مرهق"],
        icon: "syringe"
      },
      {
        title: "بوتكس الوجه كامل",
        price: "١٣٩٨",
        short: "بوتكس لمناطق متعددة في الوجه حسب الخطة.",
        definition: "جلسة بوتكس للوجه حسب تقييم الطبيب والمناطق المناسبة للحالة.",
        benefits: ["تحسين عام للخطوط", "مظهر أهدأ", "خطة متكاملة"],
        uses: ["الجبهة", "حول العين", "مناطق التعبير"],
        icon: "syringe"
      },
      {
        title: "بوتكس التعرق",
        price: "١١٩٩",
        short: "للمساعدة في تقليل التعرق الزائد.",
        definition: "حقن بوتكس في مناطق محددة للمساعدة في التحكم بالتعرق الزائد حسب الحالة.",
        benefits: ["راحة يومية أكبر", "تقليل التعرق", "إجراء سريع نسبيًا"],
        uses: ["تعرق الإبط", "تعرق اليدين", "التعرق الموضعي"],
        icon: "syringe"
      },
      {
        title: "بلازما عادية للوجه",
        price: "٣٩٩",
        short: "لدعم نضارة الوجه وتحسين جودة البشرة.",
        definition: "جلسة بلازما للوجه ضمن خطة لتحسين نضارة وجودة البشرة حسب الحالة.",
        benefits: ["نضارة أفضل", "تحسين جودة البشرة", "دعم التجديد"],
        uses: ["بهتان الوجه", "الإجهاد", "ضعف النضارة"],
        icon: "syringe"
      },
      {
        title: "بلازما بالفيتامينات للوجه",
        price: "٤٩٩",
        short: "بلازما مع فيتامينات لدعم نضارة البشرة.",
        definition: "جلسة بلازما للوجه مع فيتامينات حسب احتياج البشرة والخطة المناسبة.",
        benefits: ["نضارة أعلى", "دعم البشرة", "إشراقة أفضل"],
        uses: ["بهتان البشرة", "الإجهاد", "نقص الحيوية"],
        icon: "syringe"
      },
      {
        title: "بلازما عادية للشعر",
        price: "٢٩٩",
        short: "لدعم فروة الرأس وجودة الشعر.",
        definition: "جلسة بلازما للشعر ضمن برنامج لتحسين جودة الشعر وفروة الرأس حسب الحالة.",
        benefits: ["دعم فروة الرأس", "تحسين جودة الشعر", "خطة متابعة تدريجية"],
        uses: ["تساقط الشعر", "ضعف الكثافة", "فروة الرأس المجهدة"],
        icon: "syringe"
      },
      {
        title: "بلازما بالفيتامينات للشعر",
        price: "٤٩٩",
        short: "بلازما مع فيتامينات لدعم الشعر.",
        definition: "جلسة بلازما للشعر مع فيتامينات حسب احتياج فروة الرأس والشعر.",
        benefits: ["دعم أقوى للشعر", "تحسين جودة الشعر", "متابعة تدريجية"],
        uses: ["تساقط الشعر", "ضعف الكثافة", "ضعف حيوية الشعر"],
        icon: "syringe"
      },
      {
        title: "ميزو بوتكس للشد",
        price: "٧٥٠",
        short: "لتحسين مظهر وشد البشرة بشكل ناعم.",
        definition: "بروتوكول تجميلي يستهدف تحسين مظهر البشرة والشد الخفيف حسب الحالة.",
        benefits: ["مظهر مشدود", "نضارة أفضل", "تحسين ملمس البشرة"],
        uses: ["ترهل خفيف", "بهتان", "تحسين مظهر الوجه"],
        icon: "syringe"
      },
      {
        title: "إبرة التفتيح",
        price: "٣٠٠",
        short: "لدعم إشراقة وتفتيح مظهر البشرة.",
        definition: "جلسة مخصصة لتحسين إشراقة البشرة وتوحيد المظهر العام حسب الخطة المناسبة.",
        benefits: ["إشراقة أفضل", "مظهر أنعم", "تحسين اللون العام"],
        uses: ["بهتان", "عدم توحد اللون", "العناية قبل المناسبات"],
        icon: "syringe"
      },
      {
        title: "إبرة الهالات",
        price: "٣٠٠",
        short: "لتحسين مظهر منطقة تحت العين.",
        definition: "جلسة مخصصة لمنطقة الهالات حسب سبب المشكلة وتقييم الطبيب.",
        benefits: ["تحسين مظهر الهالات", "إطلالة أكثر راحة", "عناية مخصصة"],
        uses: ["الهالات", "الإرهاق الظاهر", "منطقة تحت العين"],
        icon: "syringe"
      },
      {
        title: "توريد شفايف",
        price: "٣٠٠",
        short: "لتحسين لون الشفاه ومظهرها.",
        definition: "جلسة تستهدف تحسين لون الشفاه حسب درجة التصبغ ونوع الحالة.",
        benefits: ["مظهر شفاه أفتح", "توحيد اللون", "نتيجة تدريجية"],
        uses: ["تصبغ الشفاه", "عدم توحد اللون", "تحسين المظهر العام"],
        icon: "sparkles"
      },
      {
        title: "توريد شفايف بالميزوثيرابي",
        price: "٢٥٠",
        short: "توريد وترطيب للشفايف باستخدام ميزوثيرابي.",
        definition: "جلسة تساعد على تحسين مظهر الشفاه وترطيبها حسب الحالة.",
        benefits: ["تحسين اللون", "ترطيب أفضل", "مظهر أنعم"],
        uses: ["تصبغ خفيف", "جفاف الشفاه", "تحسين مظهر الشفاه"],
        icon: "sparkles"
      }
    ]
  },
   {
    id: "cleaning",
    title: "تنظيف البشرة",
    subtitle: "جلسات تنظيف وترطيب للبشرة مع تجربة مريحة ومناسبة لنوع البشرة.",
    accent: "منطقة الإشراقة",
    services: [
      {
        title: "تنظيف عادي",
        price: "١٦٠",
        short: "تنظيف سريع ومنظم لاستعادة نضارة البشرة.",
        definition: "جلسة تنظيف مناسبة للعناية الدورية وإزالة الشوائب السطحية وتحسين الإحساس بالانتعاش.",
        benefits: ["إزالة شوائب سطحية", "إحساس بالانتعاش", "مناسب كروتين دوري"],
        uses: ["بشرة مرهقة", "قبل المناسبات", "عناية شهرية"],
        icon: "sparkles"
      },
      {
        title: "تنظيف عميق",
        price: "١٩٩",
        short: "جلسة أكثر تفصيلًا للبشرة التي تحتاج عناية مركزة.",
        definition: "تنظيف متعدد الخطوات يركز على الشوائب والدهون والمسام مع اختيار منتجات مناسبة للبشرة.",
        benefits: ["تنظيف أعمق", "تحسين مظهر المسام", "ترطيب وتهدئة"],
        uses: ["بشرة دهنية", "انسداد مسام", "ملمس غير ناعم"],
        icon: "sparkles"
      },
      {
        title: "تنظيف هيدروفيشال",
        price: "٢٥٠",
        short: "تنظيف وترطيب وتجديد في جلسة واحدة مريحة.",
        definition: "جلسة تعتمد على خطوات تنظيف وترطيب تساعد على تحسين الإشراقة والنعومة بطريقة لطيفة.",
        benefits: ["ترطيب واضح", "نضارة فورية غالبًا", "مناسب لمعظم أنواع البشرة"],
        uses: ["جفاف", "بهتان", "تحضير قبل مناسبة"],
        icon: "waves"
      }
    ]
  },
  {
  id: "laser",
  title: "الليزر",
  subtitle: "باقات ليزر للنساء والرجال حسب الجهاز والمنطقة وعدد الجلسات.",
  accent: "منطقة النعومة",
  services: [
      // Gentle Laser + DEKA - Women
      laserService({
        title: "جنتل ليزر وديكا - فل بدي",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("١٩٩", "٤٩٩", "٦٩٩", "٨٩٩")
      }),
      laserService({
        title: "جنتل ليزر وديكا - ميني بدي",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("١٩٠", "٣٩٩", "٥٩٩", "٧٩٩")
      }),
      laserService({
        title: "جنتل ليزر وديكا - ٣ مناطق",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("١٨٥", "٣٥٠", "٥٥٠", "٧٥٠")
      }),
      laserService({
        title: "جنتل ليزر وديكا - منطقتين",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("١٦٠", "٣٠٠", "٥٠٠", "٧٠٠")
      }),
      laserService({
        title: "جنتل ليزر وديكا - منطقة واحدة",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("٩٩", "٢٥٠", "٤٠٠", "٥٠٠")
      }),

      // Gentle Pro - Women
      laserService({
        title: "جنتل ليزر برو - فل بدي",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("٢٥٠", "٥٥٠", "٧٥٠", "٩٩٩")
      }),
      laserService({
        title: "جنتل ليزر برو - ميني بدي",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("١٩٩", "٤٩٩", "٦٩٩", "٨٩٩")
      }),
      laserService({
        title: "جنتل ليزر برو - ٣ مناطق",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("١٩٠", "٣٩٩", "٥٩٩", "٧٩٩")
      }),
      laserService({
        title: "جنتل ليزر برو - منطقتين",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("١٨٥", "٣٥٠", "٥٥٠", "٧٥٠")
      }),
      laserService({
        title: "جنتل ليزر برو - منطقة واحدة",
        gender: "female",
        note: "نساء · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("٩٩", "٢٥٠", "٤٠٠", "٥٠٠")
      }),

      // Splendor X - Women
      laserService({
        title: "سبلندر اكس - فل بدي",
        gender: "female",
        note: "نساء · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("٢٩٩", "٧٩٩", "٩٩٩", "١٣٠٠")
      }),
      laserService({
        title: "سبلندر اكس - ميني بدي",
        gender: "female",
        note: "نساء · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("٢٥٠", "٥٩٩", "٨٩٩", "١١٠٠")
      }),
      laserService({
        title: "سبلندر اكس - ٣ مناطق",
        gender: "female",
        note: "نساء · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("٢٠٠", "٤٥٠", "٦٥٠", "٩٠٠")
      }),
      laserService({
        title: "سبلندر اكس - منطقتين",
        gender: "female",
        note: "نساء · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("١٩٠", "٤٠٠", "٦٠٠", "٨٠٠")
      }),
      laserService({
        title: "سبلندر اكس - منطقة واحدة",
        gender: "female",
        note: "نساء · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("١٥٠", "٣٠٠", "٥٠٠", "٧٠٠")
      }),

      // Gentle Laser + DEKA - Men
      laserService({
        title: "جنتل ليزر وديكا - فل بدي",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("٢٥٠", "٦٥٠", "٨٥٠", "١١٥٠")
      }),
      laserService({
        title: "جنتل ليزر وديكا - ميني بدي",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("٢٢٠", "٥٩٩", "٧٥٠", "٩٩٩")
      }),
      laserService({
        title: "جنتل ليزر وديكا - ٣ مناطق",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("٢٢٠", "٤٩٩", "٦٩٩", "٨٩٩")
      }),
      laserService({
        title: "جنتل ليزر وديكا - منطقتين",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("١٩٩", "٤٥٠", "٦٥٠", "٨٥٠")
      }),
      laserService({
        title: "جنتل ليزر وديكا - منطقة واحدة",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-deka",
        prices: laserPriceOptions("٩٩", "٢٧٠", "٤٠٠", "٥٩٩")
      }),

      // Gentle Pro - Men
      laserService({
        title: "جنتل ليزر برو - فل بدي",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("٢٩٩", "٧٥٠", "٩٥٠", "١١٩٩")
      }),
      laserService({
        title: "جنتل ليزر برو - ميني بدي",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("٢٧٠", "٦٩٩", "٨٥٠", "١٠٥٠")
      }),
      laserService({
        title: "جنتل ليزر برو - ٣ مناطق",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("٢٥٠", "٥٩٩", "٧٩٩", "٨٥٠")
      }),
      laserService({
        title: "جنتل ليزر برو - منطقتين",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("٢٢٠", "٥٥٠", "٧٥٠", "٨٩٩")
      }),
      laserService({
        title: "جنتل ليزر برو - منطقة واحدة",
        gender: "male",
        note: "رجال · شامل رتوش",
        laserDevice: "gentle-pro",
        prices: laserPriceOptions("١٥٠", "٣٩٩", "٤٩٩", "٦٩٩")
      }),

      // Splendor X - Men
      laserService({
        title: "سبلندر اكس - فل بدي",
        gender: "male",
        note: "رجال · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("٣٥٠", "٨٩٩", "١١٩٩", "١٤٥٠")
      }),
      laserService({
        title: "سبلندر اكس - ميني بدي",
        gender: "male",
        note: "رجال · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("٢٩٩", "٧٩٩", "١٠٩٩", "١٣٥٠")
      }),
      laserService({
        title: "سبلندر اكس - ٣ مناطق",
        gender: "male",
        note: "رجال · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("٢٨٠", "٧٥٠", "٩٥٠", "١٢٥٠")
      }),
      laserService({
        title: "سبلندر اكس - منطقتين",
        gender: "male",
        note: "رجال · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("٢٥٠", "٦٥٠", "٨٥٠", "١٠٥٠")
      }),
      laserService({
        title: "سبلندر اكس - منطقة واحدة",
        gender: "male",
        note: "رجال · غير شامل رتوش",
        laserDevice: "splendor-x",
        prices: laserPriceOptions("٢٠٠", "٥٥٠", "٧٥٠", "٨٩٩")
      })
    ]
  }
];

export const serviceIconMap = {
  syringe: Syringe,
  sparkles: Sparkles,
  waves: Waves,
  camera: Camera
};

export const devices = [
  {
    name: "سبلندر اكس المطور",
    note: "الجهاز الأسود",
    description: "جهاز ليزر حديث يستخدم ضمن بروتوكولات إزالة الشعر حسب نوع البشرة والمنطقة.",
    image: "/images/splendor-x.png"
  },
  {
    name: "جنتل برو",
    note: "Gentle Pro",
    description: "من الأجهزة المعروفة في جلسات الليزر، ويتم اختيار الإعدادات المناسبة بعد تقييم الحالة.",
    image: "/images/gentle-pro.png"
  },
  {
    name: "جنتل ليزر",
    note: "Gentle Laser",
    description: "خيار مناسب لبعض أنواع البشرة والمناطق وفق تقييم الأخصائي.",
    image: "/images/gentle-laser.png"
  },
  {
    name: "ديكا سنشيور",
    note: "DEKA / Cynosure",
    description: "جهاز ضمن مجموعة الأجهزة المتاحة لخدمات الليزر والعناية المتخصصة.",
    image: "/images/deka.png"
  }
];

export const beforeAfterCases = [
  {
    title: "بشرة أنعم ومظهر أكثر إشراقًا",
    service: "تقشير كميائي",
    image: "/images/hands-ba.png",
  },
  {
    title: "تخفيف التجاعيد بمظهر طبيعي",
    service: "بوتكس",
    image: "/images/botox-ba.png",
  },
  {
    title: "تحسين التناسق بشكل طبيعي",
    service: "فيلر",
    image: "/images/filler-ba.png",
  },
];

export const gallery = [
  { title: "استقبال العيادة", src: "/images/reception.png" },
  { title: "غرفة الجلسات", src: "/images/clinic.png" },
  { title: "عيادة الليزر", src: "/images/laser-clinic.png" },
  { title: "مدخل المجمع", src: "/images/entry.png" }
];

export const testimonials = [
  {
    name: "نوارة.",
    text: "من لا يشكر الناس لا يشكر الله ‘ عيادة الليزر عندهم من افضل العيادات بغرب الرياض من حيث الخدمة والاسعار والتعامل والاهم حرصهم على النظافة ورضا العمييل ‘ وشكر خاص لموظفات الاستقبال على تعاونهم وسرعة الاستجابة علمًا انه لي سنتين بالعيادة ومستحيل اشوف غيرهم ‘ احبكم لين الشرق",
    rating: 5,
    icon: Star
  },
  {
    name: "فاطمة ع.",
    text: "حجزت عندهم جلسات ليزر ..من انظف للعيادات اللي ‘ زرتها ‘ النيرسس لطيفين وبروفيشنال ..والموظفه بتول لحالها تستاهل ٥ نجوم احترافية في التعامل ودقة في المواعيد وسرعة الردود ع الواتس..تجربه ح تتكر كثير بإذن الله",
    rating: 5,
    icon: Star
  },
  {
    name: "عبد العزيز",
    text: "افضل قسم زراعه اسنان في الرياض يهتم بادق التفاصيل وماشاء الله قسم كامل متكامل ماكنت متوقع بالراحه والسرعة هذي اانصح فيها تقييمي لو فيه ١٠٠ نجمه عطيتهم اتمنى لهم التوفيق والاستمرار",
    rating: 5,
    icon: Star
  }
];
