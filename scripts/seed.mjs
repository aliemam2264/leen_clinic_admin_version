import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { randomBytes, scryptSync } from "node:crypto";
import mongoose from "mongoose";

const root = process.cwd();
const contentPath = path.join(root, "data", "initial-content.json");
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@leen.local";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123456";
const ADMIN_NAME = process.env.ADMIN_NAME || "Leen Admin";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is required.");
  process.exit(1);
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  return {
    salt,
    hash: scryptSync(password, salt, 64).toString("hex"),
  };
}

const SiteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    siteConfig: { type: mongoose.Schema.Types.Mixed, required: true },
    heroStats: { type: [mongoose.Schema.Types.Mixed], default: [] },
    aboutSection: { type: mongoose.Schema.Types.Mixed, default: {} },
    serviceCategories: { type: [mongoose.Schema.Types.Mixed], default: [] },
    devices: { type: [mongoose.Schema.Types.Mixed], default: [] },
    beforeAfterCases: { type: [mongoose.Schema.Types.Mixed], default: [] },
    gallery: { type: [mongoose.Schema.Types.Mixed], default: [] },
    testimonials: { type: [mongoose.Schema.Types.Mixed], default: [] },
    offers: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: true, minimize: false }
);

const AdminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    role: { type: String, enum: ["super_admin", "admin"], default: "super_admin" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SiteContent = mongoose.models.SiteContent || mongoose.model("SiteContent", SiteContentSchema);
const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

await mongoose.connect(MONGODB_URI);

await SiteContent.findOneAndUpdate(
  { key: "main" },
  { $set: { ...content, key: "main" } },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);

const existingAdmin = await AdminUser.findOne({ email: ADMIN_EMAIL.toLowerCase() });
if (!existingAdmin) {
  const { hash, salt } = hashPassword(ADMIN_PASSWORD);
  await AdminUser.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL.toLowerCase(),
    passwordHash: hash,
    passwordSalt: salt,
    role: "super_admin",
    isActive: true,
  });
  console.log(`Admin created: ${ADMIN_EMAIL}`);
  console.log(`Initial password: ${ADMIN_PASSWORD}`);
} else {
  console.log(`Admin already exists: ${ADMIN_EMAIL}`);
}

console.log("Site content seeded from data/initial-content.json");
await mongoose.disconnect();
