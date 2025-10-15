"use server";

import { revalidatePath } from "next/cache";
import type { OnboardingCreateUserStart } from "@/types/register";

type OnboardingStart = {
  success: boolean;
  message: string;
  data?: any;
};

const URL = process.env.EXTERNAL_API_URL;

export const onboardingStartAction = async (
  user: OnboardingCreateUserStart
): Promise<OnboardingStart> => {
  if (!URL) {
    console.error("External API URL is not defined.");
    return { success: false, message: "Erro de configuração no servidor." };
  }

  try {
    const response = await fetch(`${URL}/onboarding/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 400)
      return {
        success: false,
        message: "Dados inválidos. Por favor, verifique os campos.",
      };

    if (response.status === 409)
      return { success: false, message: "O CPF ou E-mail já está cadastrado." };

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || "A API externa retornou um erro.";
      return { success: false, message: errorMessage };
    }

    const responseData = await response.json();
    revalidatePath("/");

    return {
      success: true,
      message: "Conta criada com sucesso!",
      data: responseData,
    };
  } catch (error) {
    console.error("Falha na chamada fetch:", error);
    return {
      success: false,
      message: "Não foi possível conectar ao servidor. Tente novamente.",
    };
  }
};
