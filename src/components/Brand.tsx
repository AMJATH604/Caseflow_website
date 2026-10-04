import clsx from "clsx";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { appLink, useContent } from "@/lib/content";

export function Logo({ className, light = true }: { className?: string; light?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <img src={light ? "/brand/mark-light.png" : "/brand/mark.png"} alt="" className="h-7 w-auto" />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">CaseFlow</span>
    </span>
  );
}

/** "Get the app": the Play Store once an admin sets it, else early access. */
export function GetAppButton({ className, label = "Get CaseFlow" }: { className?: string; label?: string }) {
  const { settings } = useContent();
  const link = appLink(settings);
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
        {label} <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  }
  return (
    <Link to={link.href} className={className}>
      {label} <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
