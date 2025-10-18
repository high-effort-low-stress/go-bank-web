"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { onboardingCompleteAction } from "@/lib/actions/onboarding/completeAction";
import {
  type OnboardingCompleteData,
  OnboardingCompleteSchema,
} from "@/lib/schemas/onboarding-schemas";

export const OnboardingCompleteForm = () => {
  const [visible, setVisible] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  const handleOnboardingComplete = async ({
    password,
    confirmPassword,
  }: OnboardingCompleteData) => {
    const onboardingComplete = await onboardingCompleteAction(
      password,
      confirmPassword,
      token,
    );

    if (!onboardingComplete.success)
      return toast.error("Erro ao criar conta.", {
        description: onboardingComplete.message,
      });

    setTimeout(() => {
      router.push("/");
    }, 3000);

    toast.success("Conta criada com sucesso! Bem-vindo ao GoBank!"),
      {
        description: "Você será redirecionado em breve...",
        icon: <Loader2 className="animate-spin" />,
        duration: 3000,
      };
  };

  const { handleSubmit, control, formState } = useForm<OnboardingCompleteData>({
    resolver: zodResolver(OnboardingCompleteSchema),
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Crie sua Senha</CardTitle>
        <CardDescription>Complete sua conta no GoBank.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="onboarding-complete-form"
          onSubmit={handleSubmit(handleOnboardingComplete)}
        >
          <FieldGroup>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Senha </FieldLabel>{" "}
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Digite sua senha"
                      {...field}
                      id="onboarding-complete-form-password"
                      type={visible ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                      required
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupButton
                        onClick={togglePasswordVisibility}
                        variant={"ghost"}
                      >
                        {visible ? <EyeIcon /> : <EyeClosedIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirme a Senha
                  </FieldLabel>{" "}
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Confirme sua senha"
                      {...field}
                      id="onboarding-complete-form-confirm-password"
                      type={visible ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupButton
                        onClick={togglePasswordVisibility}
                        variant={"ghost"}
                      >
                        {visible ? <EyeIcon /> : <EyeClosedIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"responsive"}>
          <Button
            type="submit"
            form="onboarding-complete-form"
            disabled={formState.isSubmitting || !formState.isValid}
          >
            Criar Senha
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
