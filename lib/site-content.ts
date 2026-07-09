import initialContent from "@/data/initial-content.json";
import { dbConnect, isMongoConfigured } from "@/lib/db";
import type { SiteContent } from "@/lib/content-types";
import { SiteContentModel } from "@/models/SiteContent";

export const defaultSiteContent = initialContent as SiteContent;

function normalizeContent(content: Partial<SiteContent> | null | undefined): SiteContent {
  return {
    siteConfig: content?.siteConfig || defaultSiteContent.siteConfig,
    heroStats: content?.heroStats || [],
    serviceCategories: content?.serviceCategories || [],
    devices: content?.devices || [],
    beforeAfterCases: content?.beforeAfterCases || [],
    gallery: content?.gallery || [],
    testimonials: content?.testimonials || [],
    offers: content?.offers || [],
    updatedAt: content?.updatedAt || new Date().toISOString(),
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isMongoConfigured()) {
    return normalizeContent(defaultSiteContent);
  }

  try {
    await dbConnect();
    const document = await SiteContentModel.findOne({ key: "main" }).lean();

    if (!document) {
      return normalizeContent(defaultSiteContent);
    }

    return normalizeContent({
      siteConfig: document.siteConfig,
      heroStats: document.heroStats,
      serviceCategories: document.serviceCategories,
      devices: document.devices,
      beforeAfterCases: document.beforeAfterCases,
      gallery: document.gallery,
      testimonials: document.testimonials,
      offers: document.offers,
      updatedAt: document.updatedAt?.toISOString(),
    });
  } catch (error) {
    console.error("Failed to read site content from MongoDB", error);
    return normalizeContent(defaultSiteContent);
  }
}

export async function upsertSiteContent(content: SiteContent) {
  await dbConnect();
  const updated = await SiteContentModel.findOneAndUpdate(
    { key: "main" },
    { $set: { ...content, key: "main" } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  return updated;
}
