import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SecuritySection } from "@/components/SecuritySection";

export default function landingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        navItems={[
          { title: "Recursos", href: "#features" },
          { title: "Segurança", href: "#security" },
          { title: "Sobre", href: "/about" },
        ]}
        buttons={[
          { title: "Já é um cliente?", href: "#login", variant: "link" },
          { title: "Quero ser um GoClient", href: "/start" },
        ]}
      />
      <main className="flex-1">
        <Hero />
        <Features />
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
}
