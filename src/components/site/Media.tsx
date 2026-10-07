import { cn } from "@/lib/utils";

/** Image with the honesty tag "Illustration" while isRealPhoto is false. */
export function Media({
  src,
  alt,
  isRealPhoto,
  position = "center",
  className,
  imgClassName,
  eager = false,
  width = 1600,
  height = 1067,
}: {
  src: string;
  alt: string;
  isRealPhoto: boolean;
  position?: string | undefined;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ objectPosition: position }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
      {!isRealPhoto && (
        <span className="absolute bottom-3 left-3 rounded-full bg-navy/70 px-2.5 py-1 text-[0.68rem] font-medium tracking-wide text-navy-foreground backdrop-blur-sm">
          Illustration
        </span>
      )}
    </div>
  );
}
