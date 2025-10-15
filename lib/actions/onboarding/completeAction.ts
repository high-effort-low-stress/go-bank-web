"use server";

import { isPasswordValid } from "@/utils/validators";

const URL = process.env.EXTERNAL_API_URL;

type OnboardingCompleteResponse = {
  success: boolean;
  message: string;
};

export async function onboardingCompleteAction(
  password: string,
  token: string | null
): Promise<OnboardingCompleteResponse> {
  try {
    if (!token) {
      return { success: false, message: "Token de sessão não encontrado." };
    }

    if (!isPasswordValid(password)) {
      return {
        success: false,
        message: "A senha não atende aos critérios de segurança.",
      };
    }

    const response = await fetch(`${URL}/onboarding/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (response.status === 400)
      return { success: false, message: "Token expirado." };

    return {
      success: true,
      message: "Conta criada com sucesso!",
    };
  } catch (error) {
    console.error("Falha na API:", error);
    return {
      success: false,
      message: "Não foi possível criar a senha. Tente novamente mais tarde.",
    };
  }
}
