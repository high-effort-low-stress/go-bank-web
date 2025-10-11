import Link from "next/link";
import { Header } from "@/components/Header";
import { CreateUserAccountForm } from "@/components/user-account/create-user-account-form";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header
        navItems={[
          { title: "Criar Conta", href: "#create-user-account-form" },
          { title: "Sobre", href: "/about" },
        ]}
        buttons={[{ title: "Voltar", href: "/", variant: "link" }]}
      />
      <div
        id="create-user-account-form"
        className="container mx-auto px-4 py-20"
      >
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl tracking-tight">
              Abra sua conta digital
            </h1>
            <p className="text-muted-foreground max-w-md">
              Junte-se a mais de 2 milhões de pessoas que confiam no NovaBank
            </p>
          </div>
          <CreateUserAccountForm />
          <div className="text-center text-muted-foreground">
            <p>
              Já tem uma conta?{" "}
              <Link href="#" className="text-primary hover:underline">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
