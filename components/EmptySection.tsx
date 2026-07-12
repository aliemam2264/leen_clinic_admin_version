import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptySectionProps = {
  title?: string;
  message?: string;
  className?: string;
};

export function EmptySection({
  title = "لا توجد عروض حاليًا",
  message = "لا يوجد عروض متاحة في الوقت الحالي.",
  className,
}: EmptySectionProps) {
  return (
    <div className={cn("rounded-[2rem] border border-dashed border-wine/20 bg-white/70 p-8 text-center shadow-sm", className)}>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-peach text-orange">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-xl font-black text-wineDark">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{message}</p>
    </div>
  );
}
