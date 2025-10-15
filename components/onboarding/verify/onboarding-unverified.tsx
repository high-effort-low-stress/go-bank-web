"use client";
import { MailIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { timeToTokenExpires } from "@/lib/dayjs";

export const OnboardingUnverified = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <MailIcon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-4 text-2xl font-bold tracking-tight">
          Verifique seu e-mail
        </CardTitle>
        <CardDescription className="mt-2 text-base text-muted-foreground">
          Enviamos um link de acesso para o seu endereço de e-mail.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          Clique no link enviado para concluir seu login de forma segura. O link
          expirará {timeToTokenExpires(60)}.
        </p>
      </CardContent>
      <CardFooter>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Não recebeu o e-mail? Verifique sua pasta de spam ou tente novamente.
        </p>
      </CardFooter>
    </Card>
  );
};
