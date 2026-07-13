import mongoose, { Schema, type Model } from "mongoose";
import type { SiteContent } from "@/lib/content-types";

export type SiteContentDocument = SiteContent & {
  key: string;
  createdAt: Date;
  updatedAt: Date;
};

const SiteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    siteConfig: { type: Schema.Types.Mixed, required: true },
    heroStats: { type: Array, default: [] },
    aboutSection: { type: Schema.Types.Mixed, default: {} },
    serviceCategories: { type: Array, default: [] },
    devices: { type: Array, default: [] },
    beforeAfterCases: { type: Array, default: [] },
    gallery: { type: Array, default: [] },
    testimonials: { type: Array, default: [] },
    offers: { type: Array, default: [] },
  },
  { timestamps: true, minimize: false }
);

export const SiteContentModel =
  (mongoose.models.SiteContent as Model<SiteContentDocument>) ||
  mongoose.model<SiteContentDocument>("SiteContent", SiteContentSchema);
