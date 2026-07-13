import { FaWhatsapp } from "react-icons/fa";
export function FloatingWhatsapp({ whatsappNumber }: { whatsappNumber: string }) {
  const message = encodeURIComponent("مرحبًا، أريد حجز موعد في مجمع لين الشرق");
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_50px_rgba(37,211,102,.35)] transition-transform hover:scale-105"
      aria-label="حجز عبر واتساب"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
