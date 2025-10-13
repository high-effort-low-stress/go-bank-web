"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
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
import {
  isPasswordValid,
  onboardingCompleteAction,
} from "@/lib/actions/register/omboardingCompleteAction";

const OnboardingCompleteSchema = z
  .object({
    password: z
      .string()
      .min(1, "A senha é obrigatória")
      .refine(
        isPasswordValid,
        "A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.",
      ),

    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type OnboardingCompleteFormSchema = z.infer<typeof OnboardingCompleteSchema>;

export const OnboardingCompleteForm = () => {
  const [visible, setVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleOnboardingComplete = async ({
    password,
  }: OnboardingCompleteFormSchema) => {
    const omboardingComplete = await onboardingCompleteAction(password, token);

    if (!omboardingComplete.success)
      return toast.error("Erro ao criar conta.", {
        description: omboardingComplete.message,
      });

    if (omboardingComplete.success)
      return toast.success("Conta criada com sucesso!");
  };

  const { handleSubmit, control, formState } =
    useForm<OnboardingCompleteFormSchema>({
      resolver: zodResolver(OnboardingCompleteSchema),
      mode: "onTouched",
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"responsive"}>
          <Button
            type="submit"
            form="onboarding-complete-form"
            disabled={formState.isSubmitting}
          >
            Criar Senha
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
