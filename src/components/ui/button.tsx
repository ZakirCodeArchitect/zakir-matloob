import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        orange:
          "bg-orange text-white hover:bg-orange-deep shadow-[0_10px_30px_rgba(255,77,28,0.28)]",
        black: "bg-ink text-white hover:bg-black",
        outline:
          "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
        ghost: "text-ink hover:bg-black/5",
        cream: "bg-cream text-ink hover:bg-white",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        icon: "size-11",
        square: "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "orange",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
