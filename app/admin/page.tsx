import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getCurrentAdmin } from "@/lib/auth";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getCurrentAdmin().catch(() => null);

  if (!admin) {
    redirect("/admin/login");
  }

  const content = await getSiteContent();
  return <AdminDashboard initialContent={content} />;
}
