import { Heart } from "lucide-react";
import { cn } from "../../lib/utils";

type AvatarProps = {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: "size-9",
  md: "size-12",
  lg: "size-16",
  xl: "size-24",
};

export function Avatar({ src, alt, size = "md", className }: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white bg-primary-soft text-primary shadow-lg",
        sizes[size],
        className,
      )}
      aria-label={src ? undefined : alt}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <Heart aria-hidden="true" className="h-1/2 w-1/2 fill-current" />
      )}
    </span>
  );
}
