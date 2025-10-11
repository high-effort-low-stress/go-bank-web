import { MenuIcon, PiggyBankIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  navItems?: {
    title: string;
    href: string;
    className?: string;
  }[];

  buttons: {
    title: string;
    href: string;
    className?: string;
    variant?:
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | null
      | undefined;
  }[];
}
export function Header({ navItems, buttons }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <PiggyBankIcon />
          <h2 className="tracking-tight">GoBank</h2>
          <nav className="hidden md:flex items-center gap-6">
            {" "}
            {navItems?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {buttons?.map((button) => (
            <Button
              key={button.href}
              asChild
              variant={button.variant || "default"}
              className={` hidden md:inline-flex ${button.className}`}
            >
              <Link href={button.href}>{button.title}</Link>
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon />
          </Button>
        </div>
      </div>
    </header>
  );
}
