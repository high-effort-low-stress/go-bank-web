import z from "zod";
import { isCpfValid } from "@/utils/validators";

export const OnboardingStartSchema = z.object({
  fullName: z.string({ message: "Nome é obrigatório" }).min(3, {
    message: "Nome muito curto",
  }),
  email: z.email({
    message: "Por favor, insira um email válido.",
  }),
  document: z
    .string({ message: "CPF é obrigatório" })
    .refine(isCpfValid, "Por favor, insira um CPF válido."),

  // phoneNumber: z
  //   .string()
  //   .length(11, {
  //     message: "Por favor, insira um número de celular válido.",
  //   })
  //   .regex(phoneRegex, "Por favor, insira um número de celular válido."),

  termsAndConditions: z
    .literal(true, { error: "Você deve aceitar os termos" })
    .refine((value) => value === true, {
      message: "Você deve aceitar os termos e condições",
    }),
});
