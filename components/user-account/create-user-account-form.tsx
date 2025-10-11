"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
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
import { createUseerAccount } from "@/lib/actions/register/actions";
import { isCpfValid } from "@/utils/validators";

const phoneRegex =
  /^(?:(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?)?(?:9\d{4}[-.\s]?\d{4})$/;

const createUserAccountFormSchema = z.object({
  fullName: z
    .string()
    .min(1, {
      message: "Nome é obrigatório",
    })
    .min(3, {
      message: "Nome muito curto",
    }),
  email: z.email({
    message: "Por favor, insira um email válido.",
  }),
  document: z
    .string()
    .length(11, {
      message: "Por favor, insira um CPF válido.",
    })
    .refine(isCpfValid, "Por favor, insira um CPF válido."),

  phoneNumber: z
    .string()
    .length(11, {
      message: "Por favor, insira um número de celular válido.",
    })
    .regex(phoneRegex, "Por favor, insira um número de celular válido."),

  termsAndConditions: z
    .literal(true, { error: "Você deve aceitar os termos" })
    .refine((value) => value === true, {
      message: "Você deve aceitar os termos e condições",
    }),
});

type CreateUserAccountFormSchema = z.infer<typeof createUserAccountFormSchema>;

export const CreateUserAccountForm = () => {
  const { handleSubmit, control, formState } =
    useForm<CreateUserAccountFormSchema>({
      resolver: zodResolver(createUserAccountFormSchema),
      mode: "onTouched",
    });

  const handleCreateAccount = async ({
    fullName,
    email,
    document,
    phoneNumber,
    termsAndConditions,
  }: CreateUserAccountFormSchema) => {
    const createUserAccount = await createUseerAccount({
      fullName: fullName,
      email: email,
      document: document,
    });

    if (!createUserAccount.success)
      return toast.error("Erro ao criar conta.", {
        description: createUserAccount.message,
      });

    if (createUserAccount.success)
      return toast.success("Conta criada com sucesso!");
  };
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
          onSubmit={handleSubmit(handleCreateAccount)}
          id="create-account-form"
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
            <Controller
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
                    placeholder="(XX) XXXXX-XXXX"
                    maxLength={11}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
