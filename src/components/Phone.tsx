import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

/**
 * A phone frame around one CaseFlow screenshot. The screenshots are 610x1268
 * (Android, navigation bar cropped), so the screen keeps that aspect ratio.
 * Animate a wrapper around it, not the frame itself.
 */
export function Phone({
  src,
  alt,
  className,
  style,
  priority = false,
  children,
}: {
  src?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "relative rounded-[2.6rem] p-[9px] bg-gradient-to-b from-[#2a2d4a] via-[#16182e] to-[#0d0f22]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_100px_-30px_rgba(37,99,235,0.45),0_20px_40px_-20px_rgba(0,0,0,0.8)]",
        className,
      )}
      style={style}
    >
      <div className="relative overflow-hidden rounded-[2.05rem] bg-white" style={{ aspectRatio: "610 / 1268" }}>
        {src && (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        )}
        {children}
        <div className="pointer-events-none absolute left-1/2 top-[7px] h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-[#0b0c18] ring-1 ring-white/10" />
      </div>
    </div>
  );
}

export const shot = (name: string) => `/app/${name}.webp`;
