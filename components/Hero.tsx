import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "./ui/animated-shiny-text";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>
            <AnimatedShinyText>Now available worldwide</AnimatedShinyText>
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl tracking-tight">
          Banking made simple, secure, and smart
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience the future of banking with instant payments, real-time
          notifications, and intelligent insights. All in one beautifully
          designed app.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2">
            Open an Account
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Play className="h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 text-center">
          <div>
            <div className="text-2xl">2M+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div>
            <div className="text-2xl">$5B+</div>
            <div className="text-muted-foreground">Transactions</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div>
            <div className="text-2xl">4.9★</div>
            <div className="text-muted-foreground">App Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
