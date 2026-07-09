import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { dbConnect } from "@/lib/db";
import { AdminUserModel } from "@/models/AdminUser";

export const ADMIN_COOKIE_NAME = "leen_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "leen-dev-session-secret-change-me";
}

function base64Url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

export function createAdminSession(email: string) {
  const payload = base64Url(
    JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE })
  );
  return `${payload}.${sign(payload)}`;
}

export function readSessionEmail(token?: string | null) {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!parsed.email || !parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return String(parsed.email).toLowerCase();
  } catch {
    return null;
  }
}

export async function getCurrentAdmin() {
  const email = readSessionEmail(cookies().get(ADMIN_COOKIE_NAME)?.value);
  if (!email) return null;

  await dbConnect();
  return AdminUserModel.findOne({ email, isActive: true }).lean();
}

export async function requireAdmin(request: NextRequest) {
  const email = readSessionEmail(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
  if (!email) return null;

  await dbConnect();
  return AdminUserModel.findOne({ email, isActive: true }).lean();
}

export function setAdminCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
