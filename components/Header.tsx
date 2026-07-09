"use client";

import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "الخدمات", href: "#services" },
  { label: "قبل وبعد", href: "#results" },
  { label: "الأجهزة", href: "#devices" },
  { label: "المكان", href: "#location" },
  { label: "الحجز", href: "#booking" }
];

export function Header({ whatsappNumber }: { whatsappNumber: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappMessage = encodeURIComponent("مرحبًا، أريد حجز موعد في مجمع لين الشرق");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);

    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (!element) return;

    const headerOffset = 90;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-wine/10 bg-white/85 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <a href="#home" aria-label="Leen home"  onClick={(e) => {e.preventDefault(); scrollToSection("#home");}}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="rounded-full px-4 py-2 text-sm font-bold text-wine transition hover:bg-peach"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="orange">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              احجزي الآن
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-wine/10 bg-white text-wine shadow-sm transition hover:bg-peach lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-20 z-50 origin-top border-b border-wine/10 bg-white/95 px-4 pb-5 pt-3 shadow-soft backdrop-blur-xl transition-all duration-300 lg:hidden",
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        )}
      >
        <nav className="mx-auto grid max-w-lg gap-2 rounded-[1.75rem] border border-wine/10 bg-peach/45 p-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-wine shadow-sm transition hover:bg-peach"
            >
              {item.label}
            </a>
          ))}
          <Button asChild variant="orange" className="mt-2 w-full">
            <a href={whatsappHref} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
              <MessageCircle className="h-4 w-4" />
              احجزي عبر واتساب
            </a>
          </Button>
        </nav>
      </div>

      {isOpen ? <button aria-label="إغلاق القائمة" className="fixed inset-0 top-20 z-40 cursor-default bg-wine/10 lg:hidden" onClick={() => setIsOpen(false)} /> : null}
    </header>
  );
}
