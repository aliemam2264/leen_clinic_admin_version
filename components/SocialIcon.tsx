import { Facebook, Instagram, MapPin, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { SocialLink } from "@/lib/content-types";

type SocialIconProps = {
  social: SocialLink;
  className?: string;
};

export function SocialIcon({ social, className = "h-5 w-5" }: SocialIconProps) {
  if (social.image) {
    return <img src={social.image} alt={social.label} className={`${className} object-contain`} />;
  }

  const iconKey = social.iconKey || social.label.toLowerCase();

  if (iconKey === "instagram") return <Instagram className={className} />;
  if (iconKey === "facebook") return <Facebook className={className} />;
  if (iconKey === "whatsapp") return <FaWhatsapp className={className} />;
  if (iconKey === "location") return <MapPin className={className} />;

  return <span className="text-xs font-black">{social.label.slice(0, 1)}</span>;
}
