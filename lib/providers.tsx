"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>

      <Toaster position="top-right" richColors />
    </main>
  );
};

export default Providers;
