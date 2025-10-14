"use server";

import { isPasswordValid } from "@/utils/validators";

const URL = process.env.EXTERNAL_API_URL;

type OnboardingComplete = {
  success: boolean;
  message: string;
  data?: any;
};

export async function onboardingCompleteAction(
  password: string,
  token: string | null
): Promise<OnboardingComplete> {
  try {
    if (!isTokenValid(token as string)) {
      return {
        success: false,
        message: "Token inválido ou expirado.",
      };
    }

    if (!isPasswordValid(password)) {
      return {
        success: false,
        message:
          "A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.",
      };
    }

    const response = await fetch(`${URL}/onboarding/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (response.status === 410)
      return { success: false, message: "Token expirado." };

    if (!response.ok) {
      return {
        success: false,
        message: await response.text(),
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      message: "Conta criada com sucesso!",
      data: responseData,
    };
  } catch (error) {
    console.error("Falha na API:", error);
    return {
      success: false,
      message: "Não foi possível criar a senha. Tente novamente mais tarde.",
    };
  }
}

export const isTokenValid = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${URL}/onboarding/verify?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (response.status === 410) {
      return false;
    }

    if (!response.ok) {
      console.error("Token validation failed:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};
