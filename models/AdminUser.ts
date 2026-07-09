import mongoose, { Schema, type Model } from "mongoose";

export type AdminUserDocument = {
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  role: "super_admin" | "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    role: { type: String, enum: ["super_admin", "admin"], default: "admin" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AdminUserModel: Model<AdminUserDocument> =
  mongoose.models.AdminUser || mongoose.model<AdminUserDocument>("AdminUser", AdminUserSchema);
