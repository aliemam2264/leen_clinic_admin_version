import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type PriceTagProps = {
  price: string | number;
};

export function PriceTag({ price }: PriceTagProps) {
  const priceText = String(price).trim();

  const isPlaceholder =
    priceText.includes("يحدد") ||
    priceText.includes("الاستشارة");

  if (isPlaceholder) {
    return (
      <Badge className="bg-peach text-wine">
        {priceText}
      </Badge>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/5 px-3 py-1.5 text-orange">
      <span className="text-lg md:text-2xl font-black leading-none">
        {priceText}
      </span>

      <Image
        src="/images/saudi-riyal.svg"
        alt="ريال سعودي"
        width={50}
        height={50}
        className="h-6 w-6 md:h-8 md:w-8 shrink-0"
      />
    </div>
  );
}