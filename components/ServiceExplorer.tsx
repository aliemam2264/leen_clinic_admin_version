"use client";

import { useEffect, useMemo, useState } from "react";
import { Camera, MessageCircle, Sparkles, Syringe, Waves } from "lucide-react";
import { PriceTag } from "@/components/PriceTag";
import { EmptySection } from "@/components/EmptySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  LaserDevice,
  ServiceContent,
  ServiceCategoryContent,
  ServiceGender,
} from "@/lib/content-types";

const INITIAL_VISIBLE_COUNT = 8;

const serviceIconMap = {
  syringe: Syringe,
  sparkles: Sparkles,
  waves: Waves,
  camera: Camera,
};

const genderOptions: {
  value: Exclude<ServiceGender, "both">;
  label: string;
}[] = [
  { value: "female", label: "نساء" },
  { value: "male", label: "رجال" },
];

const laserDeviceOptions: {
  value: LaserDevice;
  label: string;
}[] = [
  { value: "gentle-deka", label: "جنتل ليزر وديكا" },
  { value: "gentle-pro", label: "جنتل ليزر برو" },
  { value: "splendor-x", label: "سبلندر اكس" },
];

function buildServiceWhatsappUrl(service: ServiceContent, whatsappNumber: string) {
  const priceLines = service.priceOptions?.length
    ? [
        "الأسعار:",
        ...service.priceOptions.map(
          (option) => `${option.label} : ${option.price}`
        ),
      ]
    : [`السعر : ${service.price}`];

  const message = [
    "مرحبًا، أريد الاستفسار عن خدمة في مجمع لين الشرق",
    "",
    `الخدمة : ${service.title}`,
    service.note ? `التصنيف : ${service.note}` : null,
    ...priceLines,
    "",
    `الوصف : ${service.short}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function ServiceExplorer({
  serviceCategories,
  whatsappNumber,
}: {
  serviceCategories: ServiceCategoryContent[];
  whatsappNumber: string;
}) {
  const [activeCategoryId, setActiveCategoryId] = useState(serviceCategories[0]?.id ?? "");
  const [laserGender, setLaserGender] = useState<Exclude<ServiceGender, "both">>("female");
  const [laserDevice, setLaserDevice] = useState<LaserDevice>("gentle-deka");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    if (!serviceCategories.some((category) => category.id === activeCategoryId)) {
      setActiveCategoryId(serviceCategories[0]?.id ?? "");
    }
  }, [activeCategoryId, serviceCategories]);

  const activeCategory =
    serviceCategories.find((category) => category.id === activeCategoryId) ??
    serviceCategories[0];

  const isLaser = activeCategory?.id === "laser";

  const filteredServices = useMemo(() => {
    if (!activeCategory) return [];

    if (!isLaser) {
      return activeCategory.services || [];
    }

    return (activeCategory.services || []).filter(
      (service) =>
        (service.gender === laserGender || service.gender === "both") &&
        service.laserDevice === laserDevice
    );
  }, [activeCategory, isLaser, laserGender, laserDevice]);

  const visibleServices = filteredServices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredServices.length;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [activeCategoryId, laserGender, laserDevice]);

  if (!serviceCategories.length) {
    return <EmptySection message="لا توجد خدمات مضافة حاليًا. يمكنك إضافتها من لوحة التحكم." />;
  }

  return (
    <div className="mt-10">
      <div className="grid gap-3 sm:grid-cols-3">
        {serviceCategories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategoryId(category.id)}
              className={[
                "rounded-[1.5rem] border p-4 text-right transition-all",
                isActive
                  ? "border-orange bg-orange text-white shadow-lg shadow-orange/20"
                  : "border-wine/10 bg-white/80 text-wine hover:border-orange/30 hover:bg-peach",
              ].join(" ")}
            >
              <span className="block text-lg font-black">{category.title}</span>
              <span className={["mt-1 block text-sm", isActive ? "text-white/80" : "text-muted-foreground"].join(" ")}>{category.accent}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-[2rem] border border-wine/10 bg-white/75 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge className="bg-peach text-wine">{activeCategory.accent}</Badge>
            <h3 className="mt-3 text-2xl font-black text-wineDark">{activeCategory.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{activeCategory.subtitle}</p>
          </div>

          {isLaser ? (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2 rounded-full border border-wine/10 bg-peach/60 p-1">
                {genderOptions.map((option) => {
                  const isActive = laserGender === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLaserGender(option.value)}
                      className={[
                        "rounded-full px-6 py-2 text-sm font-black transition",
                        isActive
                          ? "bg-orange text-white shadow-md shadow-orange/20"
                          : "text-wine hover:bg-white/70",
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {laserDeviceOptions.map((option) => {
                  const isActive = laserDevice === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLaserDevice(option.value)}
                      className={[
                        "rounded-2xl border px-4 py-3 text-sm font-black transition",
                        isActive
                          ? "border-wine bg-wine text-white shadow-md shadow-wine/15"
                          : "border-wine/10 bg-white/80 text-wine hover:border-orange/40 hover:bg-peach",
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {!filteredServices.length ? (
        <EmptySection className="mt-6" message="لا توجد خدمات مضافة لهذا الاختيار حاليًا." />
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visibleServices.map((service, index) => {
            const Icon = serviceIconMap[service.icon] ?? serviceIconMap.sparkles;
            const hasPackagePrices = Boolean(service.priceOptions?.length);

            return (
              <Card
                key={`${service.title}-${service.gender ?? "all"}-${index}`}
                className="overflow-hidden border-wine/10 bg-white/85 shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-peach text-orange">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {hasPackagePrices ? <Badge className="bg-peach text-wine">باقات متعددة</Badge> : <PriceTag price={service.price} />}
                      {service.note ? <Badge className="bg-white text-wine">{service.note}</Badge> : null}
                    </div>
                  </div>

                  <h4 className="mt-5 text-xl font-black leading-8 text-wineDark">{service.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{service.short}</p>

                  {hasPackagePrices ? (
                    <div className="mt-5 grid gap-2">
                      {service.priceOptions!.map((option) => (
                        <div key={option.label} className="flex items-center justify-between gap-3 rounded-2xl border border-orange/10 bg-orange/5 px-3 py-2">
                          <span className="text-sm font-bold text-wineDark">{option.label}</span>
                          <PriceTag price={option.price} />
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 border-t border-wine/10 pt-4">
                    <p className="text-sm leading-7 text-muted-foreground">{service.definition}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(service.uses || []).slice(0, 3).map((use) => (
                      <span key={use} className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-wine">{use}</span>
                    ))}
                  </div>

                  <div className="mt-auto pt-5">
                    <Button asChild variant="orange" className="w-full">
                      <a href={buildServiceWhatsappUrl(service, whatsappNumber)} target="_blank" rel="noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        اسأل عن الخدمة
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button type="button" variant="outline" onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE_COUNT)}>
            عرض المزيد
          </Button>
        </div>
      ) : null}
    </div>
  );
}
