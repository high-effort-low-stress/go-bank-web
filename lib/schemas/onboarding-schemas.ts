import { z } from "zod";
import { validatePasswordSteps } from "@/utils/password-validator";
import { isCpfValid } from "@/utils/validators";

export const OnboardingStartSchema = z.object({
  fullName: z
    .string()
    .nonempty({ error: "Nome Completo é obrigatório." })
    .min(9, "Informe seu nome completo.")
    .max(100, "Nome muito longo."),
  document: z
    .string()
    .nonempty({ error: "CPF é obrigatório." })
    .refine(isCpfValid, "CPF deve ser um CPF válido."),
  email: z
    .string()
    .nonempty({ error: "Email é obrigatório." })
    .email("Email deve ser um email válido."),
  terms: z.literal(true, { error: "Você deve aceitar os termos" }),
});

export type OnboardingStartData = z.infer<typeof OnboardingStartSchema>;

export const OnboardingCompleteSchema = z
  .object({
    password: z
      .string({ error: "A senha é obrigatória." })
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula.")
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula.")
      .regex(/\d/, "Deve conter pelo menos um número.")
      .regex(/[!@#$%^&*()-_=+]/, "Deve conter pelo menos um caractere especial")
      .refine(validatePasswordSteps, "Senha muito fraca.")
      .max(64, "A senha deve ter no máximo 64 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
  });

export type OnboardingCompleteData = z.infer<typeof OnboardingCompleteSchema>;
