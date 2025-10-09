import { Menu } from "lucide-react";
import { useState } from "react";
import { AccountDialog } from "@/components/AccountDialog";
import { Button } from "@/components/ui/button";

export function Header() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h2 className="tracking-tight">NeoBank</h2>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#security"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Security
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button onClick={() => setDialogOpen(true)}>Get Started</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <AccountDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
