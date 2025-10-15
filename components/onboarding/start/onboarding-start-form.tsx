"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { onboardingStartAction } from "@/lib/actions/onboarding/startAction";
import {
  type OnboardingStartData,
  OnboardingStartSchema,
} from "@/lib/schemas/onboarding-schemas";

export const OnboardingStartForm = () => {
  const onboardingStart = async ({
    fullName,
    email,
    document,
    // phoneNumber,
    termsAndConditions,
  }: OnboardingStartData) => {
    const OnboardingStart = await onboardingStartAction({
      fullName: fullName,
      email: email,
      document: document,
    });

    if (!OnboardingStart.success)
      return toast.error("Erro ao criar conta.", {
        description: OnboardingStart.message,
      });

    return toast.success("Conta criada com sucesso!", {
      description: "Enviamos um código de verificação para o seu email.",
      duration: 8000,
    });
  };

  const { handleSubmit, control, formState } = useForm<OnboardingStartData>({
    resolver: zodResolver(OnboardingStartSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      document: "",
      // phoneNumber: "",
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Crie sua Conta</CardTitle>
        <CardDescription>
          Crie sua conta no GoBank de forma rápida e segura.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {" "}
        <form onSubmit={handleSubmit(onboardingStart)} id="create-account-form">
          <FieldGroup>
            <Controller
              name="fullName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="fullName">Nome Completo</FieldLabel>
                  <Input
                    {...field}
                    id="create-account-form-fullName"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="create-account-form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="document"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="document">CPF</FieldLabel>
                  <Input
                    {...field}
                    id="create-account-form-document"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    placeholder="XXX.XXX.XXX-XX"
                    maxLength={11}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tel">Telefone</FieldLabel>
                  <Input
                    {...field}
                    id="create-account-form-phoneNumber"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    plac-eholder="(XX) XXXXX-XXXX"
                    maxLength={11}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}
            <Controller
              name="termsAndConditions"
              control={control}
              render={({ field, fieldState }) => (
                <FieldGroup data-invalid={fieldState.invalid}>
                  <Field orientation={"horizontal"}>
                    <Checkbox
                      id="create-account-form-termsAndConditions"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    <FieldLabel>
                      Eu li e aceito os termos e condições
                    </FieldLabel>
                  </Field>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldGroup>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"responsive"}>
          <Button
            type="submit"
            form="create-account-form"
            disabled={formState.isSubmitting}
          >
            Criar Conta
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
