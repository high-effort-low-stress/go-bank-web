"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OnboardingVerified = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = new URLSearchParams(window.location.search).get("token");
      router.push(`/complete?token=${token}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Loader2Icon className=" animate-spin" />
        </div>
        <CardTitle className="mt-4 text-2xl font-bold tracking-tight">
          Autenticando...
        </CardTitle>
        <CardDescription className="mt-2 text-base text-muted-foreground">
          Aguarde um momento enquanto verificamos seu acesso seguro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          Você será redirecionado em breve.
        </p>
      </CardContent>
    </Card>
  );
};

export default OnboardingVerified;
