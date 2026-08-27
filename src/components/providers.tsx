"use client";

import "lenis/dist/lenis.css";
import type { ReactNode } from "react";
import { CustomCursor } from "@/components/custom-cursor";
import { Grain } from "@/components/grain";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <Grain />
      <CustomCursor />
      <SiteNav />
      <div className="flex min-h-full flex-1 flex-col">{children}</div>
      <SiteFooter />
    </SmoothScroll>
  );
}
