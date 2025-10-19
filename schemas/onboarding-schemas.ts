import { z } from "zod";
import { isCpfValid } from "@/utils/validators";

const REGEX_LOWERCASE = /[a-z]/;
const REGEX_UPPERCASE = /[A-Z]/;
const REGEX_NUMBER = /\d/;
const REGEX_SPECIAL_CHAR = /[!@#$%^&*()-_=+]/;

export const OnboardingStartUserSchema = z.object({
  fullName: z
    .string()
    .nonempty({ error: "Nome Completo é obrigatório." })
    .min(7, "Informe seu nome completo.")
    .max(100, "Nome muito longo."),

  document: z
    .string()
    .nonempty({ error: "CPF é obrigatório." })
    .refine(isCpfValid, "CPF inválido."),

  email: z
    .email("E-mail inválido.")
    .nonempty({ error: "Email é obrigatório." }),
});

export const OnboardingStartFormSchema = OnboardingStartUserSchema.extend({
  terms: z.boolean().refine((value) => value === true, {
    message: "Você deve aceitar os termos de uso.",
  }),
});

export const OnboardingCompleteSchema = z
  .object({
    password: z
      .string()
      .nonempty({ error: "Senha é obrigatória." })
      .refine((password) => REGEX_LOWERCASE.test(password), {
        message: "A senha deve conter pelo menos uma letra minúscula.",
      })
      .refine((password) => REGEX_UPPERCASE.test(password), {
        message: "A senha deve conter pelo menos uma letra maiúscula.",
      })
      .refine((password) => REGEX_NUMBER.test(password), {
        message: "A senha deve conter pelo menos um número.",
      })
      .refine((password) => REGEX_SPECIAL_CHAR.test(password), {
        message: "A senha deve conter pelo menos um caractere especial.",
      })
      .max(64, "A senha deve ter no máximo 64 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
  });

export type OnboardingStartForm = z.infer<typeof OnboardingStartFormSchema>;
export type OnboardingStarUser = z.infer<typeof OnboardingStartUserSchema>;
export type OnboardingComplete = z.infer<typeof OnboardingCompleteSchema>;
