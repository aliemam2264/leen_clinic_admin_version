import { ArrowLeft, BadgeCheck, CalendarCheck, ChevronLeft, Clock, MapPin, Phone, Sparkles, Star, MessageCircle  } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BookingForm } from "@/components/BookingForm";
import { EmptySection } from "@/components/EmptySection";
import { FloatingWhatsapp } from "@/components/FloatingWhatsapp";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceExplorer } from "@/components/ServiceExplorer";
import { SocialIcon } from "@/components/SocialIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trustItems } from "@/lib/data";
import { getSiteContent } from "@/lib/site-content";
import Link from "next/link";

export const dynamic = "force-dynamic";

type OfferWhatsappData = {
  title?: string;
  description?: string;
  oldPrice?: string;
  newPrice?: string;
  price?: string;
  startsAt?: string;
  endsAt?: string;
};

function buildOfferWhatsappUrl(
  offer: OfferWhatsappData,
  whatsappNumber: string
) {
  const message = [
    "مرحبًا، أريد الاستفسار عن عرض في مجمع لين الشرق",
    "",
    offer.title ? `العرض : ${offer.title}` : null,
    offer.description ? `الوصف : ${offer.description}` : null,
    offer.oldPrice ? `السعر قبل : ${offer.oldPrice}` : null,
    offer.newPrice ? `السعر بعد : ${offer.newPrice}` : null,
    !offer.newPrice && offer.price ? `السعر : ${offer.price}` : null,
    offer.startsAt ? `بداية العرض : ${offer.startsAt}` : null,
    offer.endsAt ? `نهاية العرض : ${offer.endsAt}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default async function Home() {
  const content = await getSiteContent();
  const { siteConfig, heroStats, serviceCategories, beforeAfterCases, devices, gallery, testimonials, offers } = content;
  const whatsappMessage = encodeURIComponent("مرحبًا، أريد حجز موعد في مجمع لين الشرق");

  return (
    <>
      <Header whatsappNumber={siteConfig.whatsappNumber} />
      <main className="min-h-screen overflow-x-hidden bg-hero-glow text-foreground">
        <div className="pointer-events-none fixed inset-0 soft-grid opacity-40" />

        <section id="home" className="relative section-padding pt-12 md:pt-20">
          <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative z-10">
              <Badge className="mb-5 bg-white/80 text-wine">جلدية · تجميل · ليزر · عناية بالبشرة</Badge>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.35] text-wineDark md:text-5xl lg:text-6xl">
                جمال طبيعي، تفاصيل أهدى، وحجز أسرع مع <span className="text-orange">لين</span>
              </h1>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="orange">
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                    احجزي عبر واتساب
                    <ArrowLeft className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#services">شاهدي الخدمات والأسعار</a>
                </Button>
              </div>

              {heroStats.length ? (
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="rounded-[1.4rem] border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur">
                      <p className="text-3xl font-black text-wine">{stat.value}</p>
                      <p className="mt-1 text-sm font-bold text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptySection className="mt-10" message="لا توجد إحصائيات مضافة حاليًا." />
              )}
            </div>

            <div className="relative z-10">
              <div className="absolute -right-8 top-8 h-40 w-40 rounded-full bg-orange/20 blur-3xl" />
              <div className="absolute -left-8 bottom-8 h-40 w-40 rounded-full bg-wine/20 blur-3xl" />
              <div className="relative max-w-[520px] justify-self-center overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/55 shadow-soft backdrop-blur-xl lg:justify-self-end">
                <img
                  src={siteConfig.heroImage || "/images/hero.png"}
                  alt="صورة العيادة"
                  className="block aspect-[.86] w-full rounded-[2.5rem] object-cover"
                />
                <div className="absolute bottom-8 right-8 left-8 rounded-[1.5rem] border border-white/80 bg-white/88 p-4 shadow-soft backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-peach text-orange">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-black text-wineDark">استشارة مخصصة حسب حالتك</p>
                      <p className="text-sm text-muted-foreground">النتيجة الأفضل تبدأ بتقييم صحيح.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container relative z-10 -mt-4 pb-8">
          <div className="grid gap-4 md:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-white/80 bg-white/75 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-soft">
                  <CardContent className="flex gap-4 p-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-peach text-orange">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-wineDark">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="services" className="relative z-10 section-padding">
          <div className="container">
            <SectionHeading badge="الخدمات والأسعار" title="كل خدمات العيادة في أقسام واضحة ومريحة" centered />
            <ServiceExplorer serviceCategories={serviceCategories} whatsappNumber={siteConfig.whatsappNumber} />
          </div>
        </section>

        <section id="offers" className="relative z-10 section-padding bg-white/50">
          <div className="container">
            <SectionHeading badge="العروض" title="العروض الحالية" centered />
            {offers.length ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {offers.filter((offer) => offer.isActive !== false).map((offer) => (
                  <Card key={offer.title} className="overflow-hidden border-wine/10 bg-white/85 shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft">
                    {offer.image ? <img src={offer.image} alt={offer.title} className="aspect-[1.25] w-full object-cover" /> : null}
                    <CardContent className="p-5">
                      <Badge className="bg-peach text-wine">عرض</Badge>
                      <h3 className="mt-3 text-xl font-black text-wineDark">{offer.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{offer.description}</p>
                      {offer.oldPrice || offer.newPrice ? (
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          {offer.oldPrice ? (
                            <span className="inline-flex items-center gap-1.5 text-lg font-black text-muted-foreground line-through">
                              <span>{offer.oldPrice}</span>
                              <img
                                src="/images/saudi-riyal.svg"
                                alt="ريال سعودي"
                                className="h-5 w-5 opacity-60"
                              />
                            </span>
                          ) : null}

                          {offer.newPrice ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 px-3 py-1.5 text-xl font-black text-orange">
                              <span>{offer.newPrice}</span>
                              <img
                                src="/images/saudi-riyal.svg"
                                alt="ريال سعودي"
                                className="h-6 w-6"
                              />
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                      <Button asChild variant="orange" className="mt-5 w-full">
                        <a
                          href={buildOfferWhatsappUrl(offer, siteConfig.whatsappNumber)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          اسأل عن العرض
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptySection />
            )}
          </div>
        </section>

        <section id="results" className="relative z-10 section-padding bg-white/55">
          <div className="container">
            <SectionHeading badge="صور الحالات" title="صور قبل وبعد" />
            {beforeAfterCases.length ? (
              <div className="grid gap-6 lg:grid-cols-3">
                {beforeAfterCases.map((item) => <BeforeAfterSlider key={item.title} {...item} />)}
              </div>
            ) : (
              <EmptySection message="لا توجد صور قبل وبعد مضافة حاليًا." />
            )}
          </div>
        </section>

        <section id="devices" className="relative z-10 section-padding">
          <div className="container">
            <SectionHeading badge="أجهزة الليزر" title="أجهزة متعددة لاختيار البروتوكول المناسب" centered />
            {devices.length ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {devices.map((device) => (
                  <Card key={device.name} className="overflow-hidden border-wine/10 bg-white/85 shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft">
                    <img src={device.image} alt={device.name} className="aspect-[1.2] w-full object-cover" />
                    <CardContent className="p-5">
                      <Badge className="bg-white">{device.note}</Badge>
                      <h3 className="mt-3 text-xl font-black text-wineDark">{device.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{device.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptySection message="لا توجد أجهزة مضافة حاليًا." />
            )}
          </div>
        </section>

        <section className="relative z-10 py-14">
          <div className="container">
            <div className="relative overflow-hidden rounded-[2.5rem] wine-gradient p-8 text-white shadow-soft md:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-orange/30 blur-3xl" />
              <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <h2 className="text-center text-3xl font-black leading-tight md:text-right md:text-5xl">جاهزة لاستقبال Leads من أول يوم</h2>
                <Button asChild size="lg" variant="light">
                  <a href="#booking">
                    ابدأي الحجز
                    <ChevronLeft className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 section-padding bg-white/55">
          <div className="container">
            <SectionHeading badge="آراء العملاء" title="تجربة هادئة ومريحة تبني الثقة" />
            {testimonials.length ? (
              <div className="grid gap-5 md:grid-cols-3">
                {testimonials.map((item) => (
                  <Card key={item.name} className="border-wine/10 bg-white/85 shadow-sm">
                    <CardContent className="p-6">
                      <div className="mb-4 flex gap-1 text-orange">
                        {Array.from({ length: item.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
                      </div>
                      <p className="text-base leading-8 text-wineDark">“{item.text}”</p>
                      <p className="mt-5 font-black text-wine">{item.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptySection message="لا توجد آراء عملاء مضافة حاليًا." />
            )}
          </div>
        </section>

        <section id="location" className="relative z-10 section-padding">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <SectionHeading badge="الموقع وصور المكان" title="موقع واضح وصور تعكس راحة العيادة" />
                <div className="space-y-4 rounded-[2rem] border border-wine/10 bg-white/80 p-6 shadow-soft backdrop-blur">
                  <div className="flex gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-orange" />
                    <p className="leading-8 text-muted-foreground">{siteConfig.address}</p>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-orange" />
                    <p className="leading-8 text-muted-foreground">{siteConfig.workingHours}</p>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-orange" />
                    <p className="leading-8 text-muted-foreground">{siteConfig.phoneDisplay}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {siteConfig.socials.map((social) => (
                      <Button key={social.label} asChild variant="outline" size="sm">
                        <a href={social.href} target="_blank" rel="noreferrer">
                          <SocialIcon social={social} className="h-4 w-4" />
                          {social.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {gallery.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {gallery.map((item) => (
                    <div key={item.title} className="overflow-hidden rounded-[2rem] border border-wine/10 bg-white shadow-sm">
                      <img src={item.src} alt={item.title} className="aspect-[1.18] w-full object-cover transition duration-500 hover:scale-105" />
                      <p className="p-4 text-sm font-black text-wineDark">{item.title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptySection message="لا توجد صور للعيادة مضافة حاليًا." />
              )}
            </div>
          </div>
        </section>

        <section id="booking" className="relative z-10 section-padding bg-peach/60">
          <div className="container grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <SectionHeading badge="الحجز" title="حجز إستشارة عن طريق واتساب" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "اختاري الخدمة", text: "من قائمة الخدمات الموجودة في الصفحة." },
                  { title: "اكتبي بياناتك", text: "الاسم ورقم الهاتف والموعد المناسب." },
                  { title: "واتساب يفتح تلقائيًا", text: "برسالة جاهزة للعيادة." },
                  { title: "تأكيد سريع", text: "الفريق يرد ويحدد الموعد." },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-wine/10 bg-white/70 p-5 shadow-sm">
                    <BadgeCheck className="mb-3 h-6 w-6 text-orange" />
                    <h3 className="font-black text-wineDark">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <BookingForm serviceCategories={serviceCategories} whatsappNumber={siteConfig.whatsappNumber} />
          </div>
        </section>

        <footer className="relative z-10 border-t border-wine/10 bg-white/85 py-6 backdrop-blur">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:justify-between">
              <div className="space-y-5">
                <a href="#home" aria-label="Leen home"><Logo /></a>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  هذا الموقع مخصص للتسويق والحجز ولا يغني عن تقييم الطبيب المختص. النتائج تختلف من حالة لأخرى حسب طبيعة البشرة والخطة المناسبة.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {siteConfig.socials.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-wine/10 bg-white text-wine shadow-sm transition hover:-translate-y-1 hover:border-orange/40 hover:bg-orange hover:text-white hover:shadow-lg">
                      <SocialIcon social={social} className="h-5 w-5 transition group-hover:scale-110" />
                    </a>
                  ))}
                </div>
                <Link
                target="_blank"
                  href="/admin/login"
                  className="inline-flex items-center justify-center rounded-full border border-wine/10 bg-white px-4 py-2 text-xs font-black text-wine shadow-sm transition hover:bg-orange hover:text-white"
                >
                  لوحة التحكم
                </Link>
              </div>

              <Button asChild variant="orange" className="shadow-lg shadow-orange/20">
                <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                  <CalendarCheck className="h-4 w-4" />
                  حجز موعد
                </a>
              </Button>
            </div>

            <div className="mt-8 flex justify-center border-t border-wine/10 pt-5 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} {siteConfig.arabicName}. جميع الحقوق محفوظة.</span>
            </div>
          </div>
        </footer>
      </main>
      <FloatingWhatsapp whatsappNumber={siteConfig.whatsappNumber} />
      <ScrollToTopButton />
    </>
  );
}
