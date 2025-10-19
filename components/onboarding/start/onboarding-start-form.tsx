"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { onboardingStartAction } from "@/actions/onboarding/startAction";
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
import {
  type OnboardingStartForm,
  OnboardingStartFormSchema,
} from "@/schemas/onboarding-schemas";

export const OnboardingStartForm = () => {
  const onboardingStart = async ({
    fullName,
    email,
    document,
  }: OnboardingStartForm) => {
    const OnboardingStart = await onboardingStartAction({
      user: {
        fullName,
        email,
        document,
      },
    });

    if (!OnboardingStart.success)
      return toast.error("Erro ao criar conta.", {
        description: OnboardingStart.description,
      });

    return toast.success("Conta criada com sucesso!", {
      description: "Enviamos um código de verificação para o seu email.",
      duration: 8000,
    });
  };

  const { handleSubmit, control, formState } = useForm<OnboardingStartForm>({
    resolver: zodResolver(OnboardingStartFormSchema),
    mode: "all",
    defaultValues: {
      fullName: "",
      email: "",
      document: "",
      terms: false,
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
        <form
          onSubmit={handleSubmit(onboardingStart)}
          id="onboarding-start-form"
        >
          <FieldGroup>
            <Controller
              name="fullName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="fullName">Nome Completo</FieldLabel>
                  <Input
                    {...field}
                    id="onboarding-start-form-fullName-field"
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
                    id="onboarding-start-form-email-field"
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
                    id="onboarding-start-form-document-field"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    placeholder="XXX.XXX.XXX-XX"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="terms"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation={"horizontal"}
                  data-invalid={fieldState.invalid}
                  data-slot="checkbox"
                >
                  <Checkbox
                    id="onboarding-start-form-terms-checkbox"
                    name="terms"
                    aria-invalid={fieldState.invalid}
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    required
                  />
                  <FieldLabel>Eu li e aceito os termos e condições</FieldLabel>
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
            id="onboarding-start-form-button-submit"
            type="submit"
            form="onboarding-start-form"
            disabled={formState.isSubmitting || !formState.isValid}
          >
            Criar Conta
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
