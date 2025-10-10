"use client";
import { useState } from "react";
import { AccountDialog } from "@/components/AccountDialog";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SecuritySection } from "@/components/SecuritySection";

export default function landingPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        <Features />
        <SecuritySection />
      </main>
      <Footer />

      <AccountDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
