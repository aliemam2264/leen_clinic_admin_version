import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
  showArabic?: boolean;
};

export function Logo({ className, showArabic = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image src={"/images/logo.png"} alt="leen logo" width={100} height={50}/>
      {showArabic && (
        <div className="leading-tight">
          <p className="text-sm font-black text-wine">مجمع لين الشرق الطبي</p>
          <p className="text-[11px] font-semibold text-orange">جمالك الطبيعي يبدأ من هنا</p>
        </div>
      )}
    </div>
  );
}
