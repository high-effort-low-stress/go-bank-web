import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { AnimatedShinyText } from "./ui/animated-shiny-text";
import { Button } from "./ui/button";
import { NumberTicker } from "./ui/number-ticker";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <AnimatedShinyText>
            GoBank: O Futuro do Banco Digital
          </AnimatedShinyText>
        </div>

        <h1 className="text-4xl md:text-6xl tracking-tight">
          Banco feito de forma simples, segura e inteligente
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experimente o futuro dos serviços bancários com pagamentos
          instantâneos, notificações em tempo real e insights inteligentes. Tudo
          em um aplicativo lindamente projetado.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/start">
            <Button size={"lg"}>
              Crie sua conta
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 text-center">
          <div>
            <div className="text-2xl">
              <NumberTicker
                value={1_000_000 + 2_234_432}
                startValue={1_000_000}
              />
              +
            </div>
            <div className="text-muted-foreground">Usuários ativos</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div>
            <div className="text-2xl">
              $
              <NumberTicker
                value={1_000_000_000 + 2_234_432}
                startValue={1_000_000_000}
              />
            </div>
            <div className="text-muted-foreground">Transações</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div>
            <div className="text-2xl">4.9★</div>
            <div className="text-muted-foreground">
              Avaliações do aplicativo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
