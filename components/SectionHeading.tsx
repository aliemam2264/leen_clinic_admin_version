import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  badge: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({ badge, title, description, centered, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-3xl", centered && "mx-auto text-center", className)}>
      <Badge>{badge}</Badge>
      <h2 className="mt-4 text-3xl font-black leading-tight text-wineDark md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>}
    </div>
  );
}
