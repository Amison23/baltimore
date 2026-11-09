import type { ComponentPropsWithoutRef } from "react";
import { cn } from "cn";

type NavigationProps = ComponentPropsWithoutRef<"nav">;

function NavigationMenu({ className, ...props }: NavigationProps) {
  return <nav className={cn("relative flex items-center", className)} {...props} />;
}

function NavigationMenuList({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return <ul className={cn("flex list-none items-center", className)} {...props} />;
}

function NavigationMenuItem({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li className={cn("relative", className)} {...props} />;
}

function NavigationMenuLink({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return <a className={cn("inline-flex items-center", className)} {...props} />;
}

function NavigationMenuContent({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("absolute top-full", className)} {...props} />;
}

function NavigationMenuTrigger({ className, ...props }: ComponentPropsWithoutRef<"button">) {
  return <button type="button" className={cn("inline-flex items-center", className)} {...props} />;
}

function NavigationMenuIndicator({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={cn("absolute top-full", className)} {...props} />;
}

function NavigationMenuPositioner({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("absolute top-full", className)} {...props} />;
}

const navigationMenuTriggerStyle = () => "inline-flex items-center";

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
