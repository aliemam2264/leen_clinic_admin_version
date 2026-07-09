"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setError(data.message || "تعذر تسجيل الدخول.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-md rounded-[2rem] border border-wine/10 bg-white/90 p-6 shadow-soft">
      <div className="mb-6 text-center">
        <p className="text-sm font-black text-orange">لوحة التحكم</p>
        <h1 className="mt-2 text-3xl font-black text-wineDark">تسجيل دخول الأدمن</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">ادخل بيانات الأدمن لإدارة محتوى الموقع.</p>
      </div>

      <div className="grid gap-4">
        <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="البريد الإلكتروني" type="email" />
        <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="كلمة المرور" type="password" />
      </div>

      {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}

      <Button type="submit" variant="orange" size="lg" className="mt-6 w-full" disabled={loading}>
        {loading ? "جاري الدخول..." : "دخول"}
      </Button>
    </form>
  );
}
