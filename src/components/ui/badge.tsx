import type { HTMLAttributes } from "react";
import { cn } from "cn";

const baseBadgeClasses = "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-3xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3";

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  outline: "border-border text-foreground hover:bg-muted hover:text-muted-foreground",
  ghost: "hover:bg-muted hover:text-muted-foreground",
  link: "text-primary underline-offset-4 hover:underline",
} as const;

type BadgeVariant = keyof typeof variantClasses;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <span className={cn(baseBadgeClasses, variantClasses[variant], className)} {...props} />;
}

export { Badge, variantClasses as badgeVariants };
