import type { ButtonHTMLAttributes } from "react";
import { cn } from "cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
};

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "border border-border bg-background hover:bg-muted",
    secondary: "bg-secondary text-secondary-foreground",
    ghost: "hover:bg-muted",
    destructive: "bg-destructive/10 text-destructive",
  };
  const sizes = { default: "h-9 px-3", sm: "h-8 px-3 text-sm", lg: "h-10 px-4", icon: "size-9" };
  return <button className={cn("inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
}
