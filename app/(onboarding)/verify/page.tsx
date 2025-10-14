"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { timeToTokenExpires } from "@/lib/dayjs";
import "dayjs/locale/pt-br";
import { Loader2Icon, MailIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  if (token) {
    setTimeout(() => {
      router.push("/complete");
    }, 3000);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {token ? (
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
      ) : (
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
              Clique no link enviado para concluir seu login de forma segura. O
              link expirará {timeToTokenExpires(60)}.
            </p>
          </CardContent>
          <CardFooter>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Não recebeu o e-mail? Verifique sua pasta de spam ou tente
              novamente.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default VerifyPage;
