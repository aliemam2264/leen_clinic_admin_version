import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  image: string;
  title: string;
  service: string;
  className?: string;
};

export function BeforeAfterSlider({
  image,
  title,
  service,
  className,
}: BeforeAfterSliderProps) {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-[2rem] border border-wine/10 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[1.25] overflow-hidden bg-peach">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-4 top-4 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-wine shadow-sm">
          قبل / بعد
        </div>
      </div>

      <div className="p-6">
        <Badge className="bg-white">{service}</Badge>
        <h3 className="mt-3 text-xl font-black text-wineDark">{title}</h3>
      </div>
    </div>
  );
}